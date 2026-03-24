"use client";

import { useState, useRef, useEffect } from "react";
import { getFunctions, httpsCallable } from "firebase/functions";
import { app } from "@/lib/firebase";
import { Button } from "@/components/ui/Button";
import { Terminal, Send, Loader2, Sparkles, ChevronRight } from "lucide-react";

interface Message {
  role: "user" | "ai";
  content: string;
  recommendations?: Array<{
    productId: string;
    name: string;
    reason: string;
  }>;
}

export default function AIPicksPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "ai",
      content: "I'm MSD_Hacks' AI Recommender. Tell me what's slowing down your workflow, and I'll find the perfect tool for you in our vault."
    }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput("");
    setMessages(prev => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const functions = getFunctions(app, 'us-central1');
      const aiRecommend = httpsCallable(functions, 'aiRecommend');
      
      const result = await aiRecommend({ problem: userMessage }) as any;
      
      if (result.data?.recommendations) {
        setMessages(prev => [...prev, {
          role: "ai",
          content: "Here's what I recommend to boost your productivity:",
          recommendations: result.data.recommendations
        }]);
      } else {
        setMessages(prev => [...prev, {
          role: "ai",
          content: "I couldn't find a perfect match, but you should browse our catalog—we have a lot of tools available!"
        }]);
      }
    } catch (error) {
      // Mock fallback for demo if cloud function isn't deployed
      setTimeout(() => {
        setMessages(prev => [...prev, {
          role: "ai",
          content: "Here's what I recommend to boost your productivity:",
          recommendations: [
            { productId: "1", name: "AI Web Scraper", reason: "Automates data extraction seamlessly." },
            { productId: "3", name: "ChatGPT AutoPrompt", reason: "Eliminates prompt engineering time." }
          ]
        }]);
        setLoading(false);
      }, 1500);
      console.warn("Cloud function failed, using fallback:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto px-4 py-12 max-w-4xl min-h-[calc(100vh-80px)] flex flex-col">
      <div className="mb-8 text-center">
        <h1 className="text-4xl font-heading font-bold mb-4 flex items-center justify-center space-x-3">
          <Terminal className="text-primary w-10 h-10" />
          <span>AI <span className="text-primary glow-primary-text">Recommender</span></span>
        </h1>
        <p className="text-foreground-secondary">Skip the search. Let the algorithm find your next tool.</p>
      </div>

      <div className="flex-1 bg-surface border border-border rounded-xl shadow-2xl flex flex-col overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary" />
        
        {/* Chat Message Area */}
        <div 
          ref={scrollRef}
          className="flex-1 p-6 overflow-y-auto space-y-6 scroll-smooth"
        >
          {messages.map((msg, idx) => (
            <div 
              key={idx} 
              className={`flex w-full ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div 
                className={`max-w-[80%] md:max-w-[70%] p-4 rounded-2xl ${
                  msg.role === 'user' 
                    ? 'bg-primary/20 text-foreground border border-primary/30 rounded-br-sm'
                    : 'bg-background border border-border rounded-bl-sm space-y-4'
                }`}
              >
                {msg.role === 'ai' && (
                  <div className="flex items-center space-x-2 border-b border-border pb-2 mb-2 font-mono text-xs text-foreground-muted">
                    <Sparkles className="w-4 h-4 text-secondary" />
                    <span>SYSTEM_AI_RESPONSE</span>
                  </div>
                )}
                
                <p className={msg.role === 'ai' ? 'font-mono text-sm leading-relaxed' : ''}>
                  {msg.role === 'user' ? msg.content : `> ${msg.content}`}
                </p>

                {msg.recommendations && (
                  <div className="space-y-3 mt-4">
                    {msg.recommendations.map((rec: any, i: number) => (
                      <div key={i} className="bg-surface border border-border p-3 rounded-lg hover:border-primary/50 transition-colors group cursor-pointer relative overflow-hidden" onClick={() => window.location.href = `/products/${rec.productId}`}>
                        <div className="absolute left-0 top-0 h-full w-1 bg-secondary group-hover:bg-primary transition-colors" />
                        <h4 className="font-bold text-foreground group-hover:text-primary transition-colors flex items-center mb-1 ml-2">
                           <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity mr-1" />
                           {rec.name}
                        </h4>
                        <p className="text-xs text-foreground-secondary font-sans leading-relaxed ml-2">{rec.reason}</p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div className="flex w-full justify-start">
              <div className="bg-background border border-border p-4 rounded-2xl rounded-bl-sm flex items-center space-x-3">
                <Loader2 className="w-5 h-5 animate-spin text-primary" />
                <span className="font-mono text-sm text-foreground-muted animate-pulse">Running semantic search...</span>
              </div>
            </div>
          )}
        </div>

        {/* Input Area */}
        <div className="p-4 bg-background border-t border-border">
          <form onSubmit={handleSubmit} className="relative flex items-center">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="e.g., I spend 2 hours tracking manual data from websites..."
              className="w-full bg-surface border border-border rounded-full pl-6 pr-16 py-4 text-sm focus:outline-none focus:border-primary focus:ring-1 focus:ring-primary transition-all font-mono"
              disabled={loading}
            />
            <Button 
              type="submit" 
              size="sm" 
              variant="primary"
              className="absolute right-2 rounded-full h-10 w-10 px-0 shadow-lg glow-primary-box"
              disabled={!input.trim() || loading}
            >
              <Send className="w-4 h-4 -ml-1 mt-0.5" />
            </Button>
          </form>
          <div className="text-center mt-3">
            <span className="text-[10px] uppercase tracking-widest text-foreground-muted font-mono">
              Powered by MSD_Hacks proprietary AI engine
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}
