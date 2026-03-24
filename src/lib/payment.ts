export interface PaymentProvider {
  createOrder(amount: number, currency: string, receiptId: string): Promise<any>;
  verifyWebhook(payload: string, signature: string): boolean;
}

export class RazorpayProvider implements PaymentProvider {
  constructor(private keyId: string, private keySecret: string) {}

  async createOrder(amount: number, currency = "INR", receiptId: string) {
    // Requires razorpay sdk, implemented in cloud functions primarily
    const Razorpay = require("razorpay");
    const instance = new Razorpay({ key_id: this.keyId, key_secret: this.keySecret });
    return instance.orders.create({ amount: amount * 100, currency, receipt: receiptId });
  }

  verifyWebhook(payload: string, signature: string) {
    const crypto = require("crypto");
    const expectedSignature = crypto.createHmac("sha256", process.env.RAZORPAY_WEBHOOK_SECRET)
                                    .update(payload)
                                    .digest("hex");
    return expectedSignature === signature;
  }
}

export class StripeProvider implements PaymentProvider {
  constructor(private secretKey: string) {}

  async createOrder(amount: number, currency = "INR", receiptId: string) {
    const Stripe = require("stripe");
    const stripe = new Stripe(this.secretKey, { apiVersion: "2023-10-16" });
    return stripe.paymentIntents.create({
      amount: amount * 100,
      currency,
      metadata: { receiptId }
    });
  }

  verifyWebhook(payload: string, signature: string) {
    const Stripe = require("stripe");
    const stripe = new Stripe(this.secretKey, { apiVersion: "2023-10-16" });
    try {
      stripe.webhooks.constructEvent(payload, signature, process.env.STRIPE_WEBHOOK_SECRET);
      return true;
    } catch {
      return false;
    }
  }
}

// Factory function
export const getPaymentProvider = (): PaymentProvider => {
  const provider = process.env.PAYMENT_GATEWAY || "razorpay";
  if (provider === "stripe") {
    return new StripeProvider(process.env.STRIPE_SECRET_KEY!);
  }
  return new RazorpayProvider(process.env.RAZORPAY_KEY_ID!, process.env.RAZORPAY_KEY_SECRET!);
};
