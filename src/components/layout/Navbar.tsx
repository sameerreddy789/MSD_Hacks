"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, Menu, X, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/Button";

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Products", href: "/products" },
    { name: "AI Picks", href: "/ai-picks" },
  ];

  return (
    <header className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled ? 'bg-background/80 backdrop-blur-md border-b border-border shadow-lg' : 'bg-transparent'}`}>
      <div className="container mx-auto px-4 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 group">
            <div className="font-heading text-2xl font-bold tracking-tighter relative glitch-hover">
              <span className="text-foreground">MSD</span>
              <span className="text-secondary font-mono text-xl ml-1">_Hacks</span>
              <div className="absolute -bottom-1 left-0 w-full h-[2px] bg-primary scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left glow-primary-box" />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <Link 
                key={link.name} 
                href={link.href}
                className={`text-sm font-medium transition-colors hover:text-primary ${pathname === link.href ? 'text-primary glow-primary-text' : 'text-foreground-secondary'}`}
              >
                {link.name}
              </Link>
            ))}
          </nav>

          {/* Right Actions */}
          <div className="hidden md:flex items-center space-x-6">
            <Link href="/cart" className="relative group">
              <ShoppingCart className="w-5 h-5 text-foreground-secondary group-hover:text-primary transition-colors" />
              <span className="absolute -top-2 -right-2 bg-secondary text-white text-[10px] font-bold h-4 w-4 rounded-full flex items-center justify-center">
                0
              </span>
            </Link>
            <Button variant="outline" size="sm" className="hidden lg:flex" onClick={() => window.location.href = '/login'}>
              Login
            </Button>
            <Button size="sm" className="hidden lg:flex" onClick={() => window.location.href = '/ai-picks'}>
              <Sparkles className="w-4 h-4 mr-2" /> Hack Now
            </Button>
          </div>

          {/* Mobile Menu Toggle */}
          <button 
            className="md:hidden text-foreground p-2"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? <X /> : <Menu />}
          </button>
        </div>
      </div>

      {/* Mobile Nav */}
      {mobileMenuOpen && (
        <div className="md:hidden absolute top-20 left-0 w-full bg-background border-b border-border p-4 flex flex-col space-y-4 shadow-xl">
          {navLinks.map((link) => (
            <Link 
              key={link.name} 
              href={link.href}
              className="text-lg font-medium p-2 text-foreground hover:text-primary hover:bg-surface rounded"
              onClick={() => setMobileMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
          <div className="h-px bg-border w-full my-2" />
          <Link href="/cart" className="flex items-center space-x-2 p-2">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </Link>
          <Button variant="outline" className="w-full justify-center">Login</Button>
          <Button className="w-full justify-center">Hack Now</Button>
        </div>
      )}
    </header>
  );
}
