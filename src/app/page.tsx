"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/Button";
import { Terminal, Copy, ArrowRight, Zap, Coffee, Code2 } from "lucide-react";
import CountUp from "react-countup";

export default function Home() {
  const [mounted, setMounted] = useState(false);
  const [currentWord, setCurrentWord] = useState(0);
  const words = ["Students.", "Hackers.", "Builders."];

  useEffect(() => {
    setMounted(true);
    const interval = setInterval(() => {
      setCurrentWord((prev) => (prev + 1) % words.length);
    }, 2000);
    return () => clearInterval(interval);
  }, [words.length]);

  return (
    <div className="flex flex-col items-center">
      {/* Hero Section */}
      <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center px-4 overflow-hidden">
        {/* Animated grid background */}
        <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" 
             style={{ 
               backgroundImage: "radial-gradient(var(--color-border) 1px, transparent 1px)", 
               backgroundSize: "40px 40px" 
             }} 
        />
        
        <div className="z-10 text-center max-w-4xl mx-auto flex flex-col items-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center space-x-2 bg-surface border border-border rounded-full px-4 py-1.5 mb-8"
          >
            <span className="flex h-2 w-2 rounded-full bg-primary animate-pulse" />
            <span className="text-sm font-mono text-foreground-secondary">v2.0 is live</span>
          </motion.div>

          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-5xl md:text-7xl font-bold tracking-tighter mb-6 font-heading"
          >
            Your Productivity <br className="hidden md:block" />
            <span className="glitch-hover inline-block mt-2 relative">
              <span className="text-secondary tracking-tight">Deserves Better Tools</span>
            </span>
          </motion.h1>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="text-xl md:text-2xl text-foreground-secondary mb-10 h-8 flex items-center justify-center space-x-2 font-mono"
          >
            <span>Built for</span>
            {mounted && (
              <span className="text-primary font-bold min-w-[120px] text-left inline-block">
                {words[currentWord]}
              </span>
            )}
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-4"
          >
            <Button size="lg" onClick={() => window.location.href = '/products'}>
              Explore Tools
            </Button>
            <Button size="lg" variant="outline" className="group" onClick={() => window.location.href = '#how-it-works'}>
              See How It Works <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </motion.div>
        </div>
      </section>

      {/* Stats Ticker */}
      <section className="w-full border-y border-border bg-surface/50 py-12">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center justify-center space-y-8 md:space-y-0 md:space-x-16 lg:space-x-32">
          {mounted && (
             <>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold font-mono text-primary glow-primary-text">
                    <CountUp end={10000} separator="," suffix="+" duration={2.5} />
                  </span>
                  <span className="text-foreground-secondary mt-2">Active Students</span>
                </div>
                <div className="flex flex-col items-center">
                  <span className="text-4xl font-bold font-mono text-secondary">
                    <CountUp end={5} suffix=" hrs/week" duration={2} />
                  </span>
                  <span className="text-foreground-secondary mt-2">Average Time Saved</span>
                </div>
                <div className="flex flex-col items-center justify-center max-w-xs text-center">
                  <p className="text-lg italic text-foreground-muted">"Hack your productivity. Not your wallet."</p>
                </div>
             </>
          )}
        </div>
      </section>

      {/* Categories */}
      <section className="w-full py-24 container mx-auto px-4">
        <div className="flex flex-col items-center mb-16">
          <h2 className="text-3xl md:text-4xl font-heading font-bold mb-4">Level up your workflow</h2>
          <div className="px-4 py-2 bg-primary/10 text-primary border border-primary/20 rounded-full font-mono text-sm">
            Everything under ₹299
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { title: "Browser Extensions", icon: <Zap className="w-8 h-8 text-[#00FFB2]" />, desc: "Automate tedious web tasks instantly." },
            { title: "Productivity Widgets", icon: <Coffee className="w-8 h-8 text-[#7B5EFF]" />, desc: "Dashboard tools to keep you focused." },
            { title: "AI Automation", icon: <Terminal className="w-8 h-8 text-[#FF3CAC]" />, desc: "Scripts that do your homework. Almost." },
            { title: "Templates & Presets", icon: <Code2 className="w-8 h-8 text-[#00e6a0]" />, desc: "Ready-to-use configs for power users." },
          ].map((cat, i) => (
            <motion.div 
              key={cat.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="group p-6 rounded-2xl bg-surface border border-border hover:border-primary/50 transition-colors cursor-pointer"
            >
              <div className="mb-4 p-3 rounded-xl bg-background border border-border w-fit group-hover:glow-primary-box transition-all">
                {cat.icon}
              </div>
              <h3 className="text-xl font-bold font-heading mb-2">{cat.title}</h3>
              <p className="text-foreground-secondary text-sm">{cat.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* AI Teaser */}
      <section className="w-full bg-surface/30 border-t border-border py-24 relative overflow-hidden">
        <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
          <div className="flex-1 md:pr-12 mb-12 md:mb-0">
            <h2 className="text-4xl font-heading font-bold mb-6">Not sure what you need?</h2>
            <p className="text-xl text-foreground-secondary mb-8">
              Tell our AI what's slowing you down, and we'll recommend the exact tool you need to fix it.
            </p>
            <Button variant="secondary" onClick={() => window.location.href = '/ai-picks'}>
              <Terminal className="w-4 h-4 mr-2" /> Ask AI Recommender
            </Button>
          </div>
          <div className="flex-1 w-full max-w-md">
            <div className="bg-background rounded-xl border border-border p-4 shadow-2xl relative">
               <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-primary via-secondary to-tertiary rounded-t-xl" />
               <div className="flex items-center space-x-2 mb-4 border-b border-border pb-4">
                 <div className="w-3 h-3 rounded-full bg-red-500" />
                 <div className="w-3 h-3 rounded-full bg-yellow-500" />
                 <div className="w-3 h-3 rounded-full bg-green-500" />
                 <span className="text-xs font-mono text-foreground-muted ml-2">ai-terminal</span>
               </div>
               <div className="font-mono text-sm space-y-2">
                 <p className="text-primary">&gt; User: I spend 2 hours formatting citations.</p>
                 <motion.p 
                   initial={{ opacity: 0 }}
                   whileInView={{ opacity: 1 }}
                   viewport={{ once: true }}
                   transition={{ delay: 1 }}
                   className="text-foreground-secondary"
                 >
                   &gt; AI: Recommending <span className="text-secondary text-base">Citation-Bot (₹99)</span> to format your bibliographies in 1 click.
                 </motion.p>
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* Final CTA */}
      <section className="w-full py-32 flex flex-col items-center text-center container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-heading font-bold mb-8">Ready to hack your life?</h2>
        <Button size="lg" className="w-full sm:w-auto" onClick={() => window.location.href = '/products'}>
          Browse All Tools
        </Button>
      </section>
    </div>
  );
}
