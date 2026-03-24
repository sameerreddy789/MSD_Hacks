"use client";

import Image from "next/image";
import Link from "next/link";
import Tilt from "react-parallax-tilt";
import { ShoppingCart, Star, Zap } from "lucide-react";
import { Button } from "@/components/ui/Button";

interface Product {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: number;
  discountPrice?: number;
  thumbnailURL: string;
  category: string;
  rating: number;
  reviewCount: number;
  featured?: boolean;
}

export function ProductCard({ product }: { product: Product }) {
  const isDiscounted = !!product.discountPrice && product.discountPrice < product.price;

  return (
    <Tilt
      tiltMaxAngleX={5}
      tiltMaxAngleY={5}
      scale={1.02}
      transitionSpeed={2500}
      className="group relative"
    >
      <div className="absolute -inset-[1px] bg-gradient-to-br from-primary via-border to-secondary rounded-2xl opacity-20 group-hover:opacity-100 blur-sm transition-opacity duration-500" />
      
      <div className="relative h-full flex flex-col bg-surface border border-border rounded-2xl overflow-hidden group-hover:glow-primary-box transition-shadow duration-300">
        
        {/* Thumbnail Area */}
        <div className="relative w-full aspect-video bg-background">
          <Image 
            src={product.thumbnailURL || "https://images.unsplash.com/photo-1618401471353-b98afee0b2eb?q=80&w=800&auto=format&fit=crop"} 
            alt={product.name}
            fill
            className="object-cover opacity-80 group-hover:opacity-100 transition-opacity"
          />
          {product.featured && (
            <div className="absolute top-2 right-2 bg-primary text-background text-xs font-bold px-2 py-1 rounded font-mono flex items-center shadow-lg">
              <Zap className="w-3 h-3 mr-1" /> FEATURED
            </div>
          )}
          <div className="absolute top-2 left-2 bg-background/80 backdrop-blur-md px-2 py-1 rounded text-xs border border-border font-mono text-foreground-secondary">
            {product.category}
          </div>
        </div>

        {/* Content Area */}
        <div className="p-5 flex-1 flex flex-col">
          <Link href={`/products/${product.slug}`} className="hover:text-primary transition-colors cursor-pointer">
             <h3 className="text-xl font-heading font-bold mb-1 truncate">{product.name}</h3>
          </Link>
          <p className="text-sm text-foreground-secondary line-clamp-2 mb-4 flex-1">
            {product.description}
          </p>

          <div className="flex items-center space-x-2 text-sm text-yellow-400 mb-4 font-mono">
            <Star className="w-4 h-4 fill-current" />
            <span>{product.rating.toFixed(1)} <span className="text-foreground-muted">({product.reviewCount})</span></span>
          </div>

          <div className="flex items-end justify-between mb-4">
             <div className="font-heading font-bold flex flex-col">
               {isDiscounted && (
                 <span className="text-xs text-foreground-muted line-through">₹{product.price}</span>
               )}
               <span className="text-2xl text-primary drop-shadow-md">
                 ₹{isDiscounted ? product.discountPrice : product.price}
               </span>
             </div>
          </div>

          <div className="grid grid-cols-2 gap-2 mt-auto">
             <Button variant="outline" size="sm" className="w-full text-xs hover:bg-white/5 line-clamp-1">
               Try Free
             </Button>
             <Button variant="primary" size="sm" className="w-full text-xs">
               <ShoppingCart className="w-4 h-4 mr-2 hidden sm:block" /> Add
             </Button>
          </div>
        </div>
      </div>
    </Tilt>
  );
}
