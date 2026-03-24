import Order from '../models/Order.js';
import User from '../models/User.js';
import Product from '../models/Product.js';
import Razorpay from 'razorpay';
import crypto from 'crypto';

// Initialize Razorpay
const razorpay = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET
});

// @desc    Create order
// @route   POST /api/orders
// @access  Private
export const createOrder = async (req, res) => {
  try {
    const { items, paymentMethod } = req.body;
    
    if (!items || items.length === 0) {
      return res.status(400).json({ error: 'No items in order' });
    }
    
    // Calculate totals
    let subtotal = 0;
    const orderItems = [];
    
    for (const item of items) {
      const product = await Product.findById(item.productId);
      if (!product) {
        return res.status(404).json({ error: `Product ${item.productId} not found` });
      }
      
      const price = product.discountPrice || product.price;
      subtotal += price * item.quantity;
      
      orderItems.push({
        productId: product._id,
        name: product.name,
        price,
        quantity: item.quantity
      });
    }
    
    const tax = subtotal * 0.18; // 18% GST
    const total = subtotal + tax;
    
    // Create order
    const order = await Order.create({
      userId: req.user.id,
      items: orderItems,
      subtotal,
      tax,
      total,
      paymentMethod,
      paymentStatus: 'pending'
    });
    
    // Create Razorpay order
    if (paymentMethod === 'razorpay') {
      const razorpayOrder = await razorpay.orders.create({
        amount: Math.round(total * 100), // Convert to paise
        currency: 'INR',
        receipt: order.receiptId
      });
      
      order.orderId = razorpayOrder.id;
      await order.save();
      
      return res.status(201).json({
        success: true,
        order,
        razorpayOrderId: razorpayOrder.id,
        razorpayKeyId: process.env.RAZORPAY_KEY_ID
      });
    }
    
    res.status(201).json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Verify payment
// @route   POST /api/orders/verify
// @access  Private
export const verifyPayment = async (req, res) => {
  try {
    const { orderId, paymentId, signature } = req.body;
    
    // Verify signature
    const body = orderId + '|' + paymentId;
    const expectedSignature = crypto
      .createHmac('sha256', process.env.RAZORPAY_KEY_SECRET)
      .update(body)
      .digest('hex');
    
    if (expectedSignature !== signature) {
      return res.status(400).json({ error: 'Invalid signature' });
    }
    
    // Update order
    const order = await Order.findOne({ orderId });
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    order.paymentStatus = 'completed';
    order.paymentId = paymentId;
    order.status = 'completed';
    await order.save();
    
    // Add products to user's purchases
    const user = await User.findById(order.userId);
    for (const item of order.items) {
      user.purchases.push({
        productId: item.productId,
        purchasedAt: new Date()
      });
    }
    await user.save();
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get user orders
// @route   GET /api/orders/my-orders
// @access  Private
export const getMyOrders = async (req, res) => {
  try {
    const orders = await Order.find({ userId: req.user.id })
      .populate('items.productId', 'name thumbnailURL')
      .sort({ createdAt: -1 });
    
    res.json({ success: true, orders });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// @desc    Get single order
// @route   GET /api/orders/:id
// @access  Private
export const getOrder = async (req, res) => {
  try {
    const order = await Order.findById(req.params.id)
      .populate('items.productId', 'name thumbnailURL downloadURL');
    
    if (!order) {
      return res.status(404).json({ error: 'Order not found' });
    }
    
    // Check ownership
    if (order.userId.toString() !== req.user.id && !req.user.isAdmin) {
      return res.status(403).json({ error: 'Not authorized' });
    }
    
    res.json({ success: true, order });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
