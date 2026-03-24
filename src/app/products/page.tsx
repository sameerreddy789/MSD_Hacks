"use client";

import { useState, useEffect } from "react";
import { collection, query, where, orderBy, getDocs, limit, startAfter, QueryDocumentSnapshot } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { ProductCard } from "@/components/products/ProductCard";
import { Button } from "@/components/ui/Button";
import { Search, Filter, Loader2, Sparkles } from "lucide-react";

export default function ProductsPage() {
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [lastVisible, setLastVisible] = useState<QueryDocumentSnapshot | null>(null);
  const [activeCategory, setActiveCategory] = useState("All");

  const categories = ["All", "Browser Extensions", "Productivity Widgets", "AI Automation", "Templates & Presets"];

  const fetchProducts = async (isLoadMore = false) => {
    try {
      if (!isLoadMore) setLoading(true);

      const productsRef = collection(db, "products");
      let q;

      if (activeCategory === "All") {
        q = query(productsRef, where("isActive", "==", true), orderBy("featured", "desc"), orderBy("createdAt", "desc"), limit(10));
      } else {
        q = query(productsRef, where("isActive", "==", true), where("category", "==", activeCategory), orderBy("createdAt", "desc"), limit(10));
      }

      if (isLoadMore && lastVisible) {
        q = query(q, startAfter(lastVisible));
      }

      const snapshot = await getDocs(q);
      const newDocs = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

      if (isLoadMore) {
        setProducts(prev => [...prev, ...newDocs]);
      } else {
        // Fallback for demo
        if (newDocs.length === 0) {
           setProducts([
            { id: "1", name: "AI Web Scraper", slug: "ai-web-scraper", description: "Extract tables and content automatically", price: 199, thumbnailURL: "", category: "Browser Extensions", rating: 4.8, reviewCount: 124, featured: true },
            { id: "2", name: "Ultimate Notion Setup", slug: "ultimate-notion", description: "The last template you'll ever need", price: 299, discountPrice: 149, thumbnailURL: "", category: "Templates & Presets", rating: 5.0, reviewCount: 89, featured: false },
            { id: "3", name: "ChatGPT AutoPrompt", slug: "chatgpt-autoprompt", description: "Enhance prompts with hidden shortcuts", price: 99, thumbnailURL: "", category: "AI Automation", rating: 4.5, reviewCount: 42, featured: false },
           ]);
        } else {
           setProducts(newDocs);
        }
      }

      const lastDoc = snapshot.docs[snapshot.docs.length - 1];
      setLastVisible(lastDoc || null);
    } catch (error) {
      console.error("Error fetching products:", error);
    } finally {
      if (!isLoadMore) setLoading(false);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, [activeCategory]);

  return (
    <div className="container mx-auto px-4 py-8 max-w-7xl">
      <div className="flex flex-col md:flex-row justify-between items-center mb-12">
        <h1 className="text-4xl md:text-5xl font-heading font-bold tracking-tighter mb-4 md:mb-0">
          Unlock the <span className="text-primary glitch-hover inline-block">Vault</span>
        </h1>

        <Button variant="outline" className="hidden md:flex" onClick={() => window.location.href = '/ai-picks'}>
          <Sparkles className="w-4 h-4 mr-2" /> AI Curated Picks
        </Button>
      </div>

      <div className="flex flex-col md:flex-row items-center justify-between space-y-4 md:space-y-0 mb-8 border-b border-border pb-6">
        
        {/* Category Tabs */}
        <div className="flex space-x-2 overflow-x-auto w-full md:w-auto pb-2 scrollbar-none snap-x">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`whitespace-nowrap px-4 py-2 rounded-full font-mono text-sm transition-all duration-300 snap-center
                ${activeCategory === cat 
                  ? "bg-primary text-background font-bold shadow-[0_0_15px_rgba(0,255,178,0.4)]" 
                  : "bg-surface border border-border text-foreground-secondary hover:border-primary/50"
                }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* Filter / Search Stub */}
        <div className="flex items-center space-x-2 flex-shrink-0">
          <Button variant="ghost" size="sm" className="hidden sm:flex border border-border">
            <Filter className="w-4 h-4 mr-2" /> Filters
          </Button>
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-foreground-muted" />
            <input 
              type="text" 
              placeholder="Search tools..." 
              className="bg-surface border border-border rounded-full pl-9 pr-4 py-2 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary w-full md:w-64 transition-all"
            />
          </div>
        </div>
      </div>

      {loading ? (
        <div className="w-full flex items-center justify-center py-32">
          <Loader2 className="w-8 h-8 text-primary animate-spin" />
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 mb-12">
          {products.map(product => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      )}

      {products.length > 0 && lastVisible && (
        <div className="flex justify-center border-t border-border pt-8 mt-8">
          <Button variant="outline" onClick={() => fetchProducts(true)}>
            Load More Tools
          </Button>
        </div>
      )}
    </div>
  );
}
