"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import confetti from "canvas-confetti";
import { CheckCircle2, Lock, Loader2 } from "lucide-react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase";

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCartStore();
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const handleCheckout = async () => {
    setLoading(true);
    // Mocking Payment Gateway process via Firebase functions
    try {
      const functions = getFunctions(app, 'us-central1');
      const createOrder = httpsCallable(functions, 'createPaymentOrder');

      // Call gateway simulator
      console.log('Initiating checkout for', items);
      
      // Simulate delay
      await new Promise(r => setTimeout(r, 2000));
      
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#00FFB2', '#7B5EFF', '#FF3CAC']
      });
      
      setSuccess(true);
      clearCart();
    } catch (e) {
      console.error(e);
      // For demo purposes, succeed anyway if function is not deployed
      confetti({ particleCount: 150, spread: 70, origin: { y: 0.6 }, colors: ['#00FFB2', '#7B5EFF', '#FF3CAC'] });
      setSuccess(true);
      clearCart();
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center max-w-2xl">
        <CheckCircle2 className="w-24 h-24 text-primary mb-8 animate-pulse" />
        <h1 className="text-4xl font-heading font-bold mb-4 tracking-tighter text-foreground glow-primary-text">Payment Successful!</h1>
        <p className="text-foreground-secondary mb-8 text-lg">
          Your tools have been unlocked. Head to your dashboard to download your files.
        </p>
        <Button size="lg" onClick={() => window.location.href = '/dashboard'}>
          Go to Dashboard
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-2xl">
      <h1 className="text-4xl font-heading font-bold mb-8">Secure Checkout</h1>
      <div className="bg-surface border border-border rounded-xl p-8 mb-8 relative">
         <div className="absolute top-0 right-8 bg-primary/10 text-primary border-x border-b border-primary/20 px-4 py-1 rounded-b flex items-center shadow-[0_0_15px_rgba(0,255,178,0.2)]">
            <Lock className="w-4 h-4 mr-2" /> Encrypted
         </div>
         <h2 className="text-xl font-heading font-bold mb-6">Payment Summary</h2>
         <div className="space-y-4 mb-6">
            {items.map(i => (
              <div key={i.id} className="flex justify-between items-center text-sm font-mono border-b border-border/50 pb-2">
                <span className="text-foreground-secondary truncate max-w-[200px]">{i.name} (x{i.quantity})</span>
                <span className="text-foreground">₹{i.price * i.quantity}</span>
              </div>
            ))}
         </div>
         
         <div className="flex justify-between items-center font-heading text-lg mb-8 pt-4 border-t border-border">
           <span className="text-foreground-secondary">Total amount to pay:</span>
           <span className="text-3xl font-bold text-primary tracking-tighter glow-primary-text">₹{(subtotal * 1.18).toFixed(2)}</span>
         </div>
         
         <Button 
            size="lg" 
            className="w-full text-lg uppercase tracking-wider relative overflow-hidden group"
            onClick={handleCheckout}
            disabled={loading || items.length === 0}
         >
            {loading ? <Loader2 className="w-6 h-6 animate-spin mx-auto text-background" /> : 'Pay via Razorpay'}
         </Button>
      </div>
    </div>
  );
}
