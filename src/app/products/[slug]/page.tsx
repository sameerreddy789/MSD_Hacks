"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { collection, query, where, getDocs, doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { useCartStore } from "@/store/useCartStore";
import { Button } from "@/components/ui/Button";
import { ShoppingCart, Star, Zap, Check, ArrowLeft, Loader2 } from "lucide-react";

export default function ProductDetailPage() {
  const { slug } = useParams();
  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const addItem = useCartStore((state) => state.addItem);
  const [added, setAdded] = useState(false);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const q = query(collection(db, "products"), where("slug", "==", slug));
        const snapshot = await getDocs(q);
        if (!snapshot.empty) {
          const doc = snapshot.docs[0];
          setProduct({ id: doc.id, ...doc.data() });
        } else {
           // Fallback demo product
           setProduct({
             id: "1", name: "AI Web Scraper", slug: "ai-web-scraper", description: "Extract tables and content automatically from any website directly into your Google Sheets or Notion.", price: 199, thumbnailURL: "", category: "Browser Extensions", rating: 4.8, reviewCount: 124, featured: true, compatibility: "Chrome, Edge, Brave", version: "2.1.0"
           });
        }
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    if (slug) fetchProduct();
  }, [slug]);

  const handleAddToCart = () => {
    if (product) {
      addItem({
        id: product.id,
        name: product.name,
        price: product.discountPrice || product.price,
        thumbnailURL: product.thumbnailURL
      });
      setAdded(true);
      setTimeout(() => setAdded(false), 2000);
    }
  };

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center"><Loader2 className="w-8 h-8 text-primary animate-spin" /></div>;
  }

  if (!product) return <div className="container py-20 text-center text-4xl font-heading font-bold">Product not found.</div>;

  const isDiscounted = !!product.discountPrice && product.discountPrice < product.price;

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
       <button onClick={() => window.history.back()} className="flex items-center text-foreground-secondary hover:text-primary transition-colors mb-8 font-mono text-sm">
         <ArrowLeft className="w-4 h-4 mr-2" /> Back to vault
       </button>

       <div className="flex flex-col lg:flex-row gap-12">
          {/* Left: Image & Visuals */}
          <div className="lg:w-1/2">
             <div className="relative aspect-video lg:aspect-square bg-background border border-border rounded-2xl overflow-hidden glow-primary-box group">
                <Image 
                  src={product.thumbnailURL || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop"} 
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-700"
                />
             </div>
             <div className="grid grid-cols-2 gap-4 mt-4">
                <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors">
                   <Zap className="w-6 h-6 text-primary mb-2 group-hover:scale-110 transition-transform" />
                   <span className="text-sm font-bold text-foreground">Instant Delivery</span>
                   <span className="text-xs text-foreground-muted">Download immediately after purchase</span>
                </div>
                <div className="bg-surface border border-border rounded-xl p-4 flex flex-col items-center justify-center text-center group hover:border-primary/50 transition-colors">
                   <Star className="w-6 h-6 text-yellow-400 mb-2 group-hover:scale-110 transition-transform" />
                   <span className="text-sm font-bold text-foreground">Top Rated</span>
                   <span className="text-xs text-foreground-muted">{product.rating} / 5.0 from {product.reviewCount} users</span>
                </div>
             </div>
          </div>

          {/* Right: Info & Actions */}
          <div className="lg:w-1/2 flex flex-col">
             <div className="flex items-center space-x-3 mb-4">
                <span className="px-3 py-1 bg-surface border border-border rounded-full text-xs font-mono text-foreground-secondary">
                  {product.category}
                </span>
                {product.featured && (
                  <span className="px-3 py-1 bg-primary text-background font-bold border border-primary rounded-full text-xs font-mono shadow-[0_0_10px_rgba(0,255,178,0.5)]">
                    FEATURED
                  </span>
                )}
             </div>

             <h1 className="text-4xl md:text-5xl font-heading font-bold mb-4 tracking-tight">{product.name}</h1>
             
             <p className="text-lg text-foreground-secondary mb-8 leading-relaxed">
               {product.description}
             </p>

             <div className="bg-surface/50 border border-border rounded-xl p-6 mb-8 relative overflow-hidden">
                <div className="absolute left-0 top-0 w-1 h-full bg-primary" />
                <div className="flex items-end space-x-4 mb-2">
                   <span className="text-4xl font-heading font-bold text-primary drop-shadow-md">
                     ₹{isDiscounted ? product.discountPrice : product.price}
                   </span>
                   {isDiscounted && (
                     <span className="text-xl text-foreground-muted line-through mb-1">₹{product.price}</span>
                   )}
                </div>
                <p className="text-sm text-foreground-muted mb-6">One-time payment. Lifetime access. Free updates.</p>

                <div className="flex space-x-4">
                   <Button size="lg" className="flex-1 text-lg group" onClick={handleAddToCart} disabled={added}>
                     {added ? (
                        <span className="flex items-center"><Check className="w-5 h-5 mr-2" /> Added</span>
                     ) : (
                        <span className="flex items-center"><ShoppingCart className="w-5 h-5 mr-2 group-hover:-translate-y-1 group-hover:scale-110 transition-all" /> Add to Vault</span>
                     )}
                   </Button>
                   <Button size="lg" variant="outline" className="flex-1 text-lg hover:bg-white/5">
                     Try Demo
                   </Button>
                </div>
             </div>

             <div className="space-y-4 font-sans text-sm border-t border-border pt-8">
                <div className="flex justify-between border-b border-border/50 pb-2">
                   <span className="text-foreground-secondary">Compatibility</span>
                   <span className="font-mono text-foreground">{product.compatibility || "Universal"}</span>
                </div>
                <div className="flex justify-between border-b border-border/50 pb-2">
                   <span className="text-foreground-secondary">Version</span>
                   <span className="font-mono text-foreground">{product.version || "1.0.0"}</span>
                </div>
             </div>
          </div>
       </div>
    </div>
  );
}
