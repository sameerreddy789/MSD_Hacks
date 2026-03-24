"use client";

import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import Link from "next/link";
import Image from "next/image";
import { Trash2, ArrowRight, ShoppingCart, Sparkles } from "lucide-react";

export default function CartPage() {
  const { items, removeItem, itemCount, subtotal, clearCart } = useCartStore();

  if (itemCount === 0) {
    return (
      <div className="container mx-auto px-4 py-32 flex flex-col items-center text-center max-w-2xl">
        <ShoppingCart className="w-24 h-24 text-foreground-muted mb-8" />
        <h1 className="text-4xl font-heading font-bold mb-4 tracking-tighter">Your vault is empty</h1>
        <p className="text-foreground-secondary mb-8 text-lg">
          Looks like you haven't added any tools to your cart yet. Browse our collection to superpower your productivity.
        </p>
        <Button size="lg" onClick={() => window.location.href = '/products'}>
          <Sparkles className="w-5 h-5 mr-2" /> Explore Tools
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12 max-w-6xl">
       <h1 className="text-4xl font-heading font-bold mb-10 pb-4 border-b border-border flex items-center">
         <ShoppingCart className="mr-4 text-primary" /> Your Cart
         <span className="ml-4 text-xl text-foreground-secondary font-mono">({itemCount} items)</span>
       </h1>

       <div className="flex flex-col lg:flex-row gap-12">
          
          {/* Cart Items List */}
          <div className="flex-1 space-y-6">
             {items.map((item) => (
                <div key={item.id} className="bg-surface border border-border rounded-xl p-4 flex flex-col sm:flex-row items-center gap-6 group hover:border-primary/50 transition-colors">
                   <div className="relative w-32 h-24 bg-background border border-border rounded-lg overflow-hidden shrink-0">
                      <Image 
                        src={item.thumbnailURL || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop"} 
                        alt={item.name}
                        fill
                        className="object-cover"
                      />
                   </div>
                   
                   <div className="flex-1 text-center sm:text-left">
                      <Link href={`/products/${item.id}`} className="hover:text-primary transition-colors">
                        <h3 className="text-xl font-heading font-bold mb-1">{item.name}</h3>
                      </Link>
                      <p className="text-sm font-mono text-foreground-muted mb-4 uppercase">Qty: {item.quantity}</p>
                   </div>
                   
                   <div className="flex flex-col items-center justify-between h-full space-y-4 sm:items-end">
                      <span className="text-2xl font-bold font-heading text-primary bg-primary/10 px-3 py-1 rounded glow-primary-text">
                        ₹{item.price * item.quantity}
                      </span>
                      <button 
                         onClick={() => removeItem(item.id)}
                         className="text-foreground-secondary hover:text-red-500 transition-colors flex items-center text-sm font-mono"
                      >
                         <Trash2 className="w-4 h-4 mr-1" /> Remove
                      </button>
                   </div>
                </div>
             ))}

             <div className="flex justify-end pt-4">
                <button onClick={clearCart} className="text-foreground-secondary hover:text-red-500 font-mono text-sm underline underline-offset-4">
                   Clear all items
                </button>
             </div>
          </div>

          {/* Order Summary */}
          <div className="lg:w-1/3">
             <div className="bg-background border border-border rounded-2xl p-6 sticky top-28 shadow-xl">
                <h3 className="text-xl font-heading font-bold border-b border-border pb-4 mb-6">Order Summary</h3>
                
                <div className="space-y-4 font-mono text-sm mb-6 border-b border-border pb-6">
                   <div className="flex justify-between">
                     <span className="text-foreground-secondary">Subtotal</span>
                     <span>₹{subtotal}</span>
                   </div>
                   <div className="flex justify-between">
                     <span className="text-foreground-secondary">Taxes</span>
                     <span>₹{(subtotal * 0.18).toFixed(2)}</span>
                   </div>
                   <div className="flex justify-between text-primary font-bold">
                     <span>Discount</span>
                     <span>- ₹0</span>
                   </div>
                </div>

                <div className="flex justify-between items-end mb-8 font-heading">
                   <span className="text-lg">Total</span>
                   <span className="text-3xl font-bold text-foreground">₹{(subtotal * 1.18).toFixed(2)}</span>
                </div>

                <Button size="lg" className="w-full text-lg uppercase tracking-wider group" onClick={() => window.location.href = '/checkout'}>
                   Checkout <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
                </Button>
                
                <div className="mt-4 text-center">
                   <p className="text-xs text-foreground-muted font-mono uppercase">Secure Checkout powered by Razorpay</p>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
