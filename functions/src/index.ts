import * as admin from 'firebase-admin';
import { onCall, HttpsError, onRequest } from 'firebase-functions/v2/https';
import * as logger from 'firebase-functions/logger';
import { beforeUserCreated } from 'firebase-functions/v2/identity';
import OpenAI from 'openai';

admin.initializeApp();
const db = admin.firestore();
const storage = admin.storage();

const OPENAI_API_KEY = process.env.OPENAI_API_KEY;

// 1. aiRecommend
export const aiRecommend = onCall(async (request) => {
  const problemStr = request.data.problem;
  if (!problemStr) {
    throw new HttpsError('invalid-argument', 'The function must be called with a "problem" argument.');
  }

  // Fetch active products
  const productsSnapshot = await db.collection('products').where('isActive', '==', true).get();
  const products = productsSnapshot.docs.map(doc => {
    const data = doc.data() as any;
    return { id: doc.id, ...data };
  });

  if (!OPENAI_API_KEY) {
    logger.warn('OPENAI_API_KEY not configured. Returning fallback.');
    return { recommendations: products.slice(0, 3).map(p => ({ productId: p.id, name: p.name, reason: "Highly rated fallback" })) };
  }

  const openai = new OpenAI({ apiKey: OPENAI_API_KEY });
  const prompt = `
  User problem: "${problemStr}"
  Available products: ${JSON.stringify(products.map(p => ({id: p.id, name: p.name, desc: p.description})))}
  
  Select the 3 best products to solve this problem.
  Return JSON format: { "recommendations": [{ "productId": "...", "name": "...", "reason": "..." }] }
  `;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o-mini",
      messages: [{ role: "user", content: prompt }],
      response_format: { type: "json_object" }
    });
    const parsed = JSON.parse(response.choices[0].message.content || '{"recommendations":[]}');
    return parsed;
  } catch (error) {
    logger.error('OpenAI Error', error);
    throw new HttpsError('internal', 'Failed to generate recommendations');
  }
});

// 2. createPaymentOrder
export const createPaymentOrder = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated.');
  }
  const { productId } = request.data;
  const productDoc = await db.collection('products').doc(productId).get();
  
  if (!productDoc.exists) {
    throw new HttpsError('not-found', 'Product not found.');
  }
  
  const product = productDoc.data();
  const price = product?.discountPrice || product?.price || 0;

  const orderRef = db.collection('orders').doc();
  await orderRef.set({
    userId: request.auth.uid,
    totalAmount: price,
    status: 'pending',
    gateway: process.env.PAYMENT_GATEWAY || 'razorpay',
    createdAt: admin.firestore.FieldValue.serverTimestamp(),
    items: [{ productId, name: product?.name, priceAtPurchase: price }]
  });

  // Mock returning payment session (Integration with Razorpay/Stripe would go here)
  return { orderId: orderRef.id, amount: price, status: 'pending_payment' };
});

// 3. verifyPayment Webhook
export const verifyPayment = onRequest(async (req, res) => {
  // Mock webhook parsing for gateway
  const { orderId, success } = req.body;
  
  if (!orderId) {
    res.status(400).send('Missing orderId');
    return;
  }

  const orderDoc = await db.collection('orders').doc(orderId).get();
  if (!orderDoc.exists) {
    res.status(404).send('Order not found');
    return;
  }

  const order = orderDoc.data();
  
  if (success) {
    await db.collection('orders').doc(orderId).update({ status: 'completed' });
    
    // Add to user purchases
    for (const item of order?.items) {
      await db.collection(`userPurchases/${order?.userId}/products`).doc(item.productId).set({
        orderId,
        purchasedAt: admin.firestore.FieldValue.serverTimestamp()
      });
    }
    logger.info(`Payment verified for order ${orderId}`);
    res.status(200).send({ success: true });
  } else {
    await db.collection('orders').doc(orderId).update({ status: 'failed' });
    res.status(400).send({ success: false });
  }
});

// 4. Auth trigger
export const onUserCreated = beforeUserCreated(async (event) => {
  const user = event.data;
  if (!user) return;
  const isStudent = user.email?.endsWith('.edu') || user.email?.endsWith('.ac.in');
  
  // Notice: this creates a doc instantly, but Firestore rules and 
  // frontend will also need to handle profile syncing if needed.
  if (user.uid) {
    await db.collection('users').doc(user.uid).set({
      email: user.email || null,
      displayName: user.displayName || null,
      photoURL: user.photoURL || null,
      isAdmin: false,
      studentEmailVerified: isStudent || false,
      referralCode: `REF-${Math.random().toString(36).substring(2, 8).toUpperCase()}`,
      createdAt: admin.firestore.FieldValue.serverTimestamp()
    });
  }
});

// 5. generateDownloadLink
export const generateDownloadLink = onCall(async (request) => {
  if (!request.auth) {
    throw new HttpsError('unauthenticated', 'User must be authenticated to download.');
  }

  const { productId } = request.data;
  
  // Verify purchase
  const purchaseDoc = await db.collection(`userPurchases/${request.auth.uid}/products`).doc(productId).get();
  if (!purchaseDoc.exists) {
    throw new HttpsError('permission-denied', 'You have not purchased this product.');
  }

  const bucket = storage.bucket(process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET);
  const file = bucket.file(`products/${productId}/download.zip`);
  
  // Signed URL for 1 hour
  const [url] = await file.getSignedUrl({
    version: 'v4',
    action: 'read',
    expires: Date.now() + 60 * 60 * 1000, 
  });

  return { downloadUrl: url };
});
