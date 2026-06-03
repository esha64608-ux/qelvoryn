"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`sticky top-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-white/95 backdrop-blur-md shadow-sm" : "bg-white"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        
        {/* Left: Logo & Mobile Hamburger */}
        <div className="flex items-center gap-4">
          <button 
            aria-label="Open menu" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="lg:hidden hover:text-[var(--color-accent)] transition-colors"
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <Link
            href="/"
            className="text-2xl font-bold tracking-tighter"
          >
            QELVORYN
          </Link>
        </div>

        {/* Center: Links (Desktop) */}
        <div className="hidden lg:flex items-center gap-10 text-sm font-medium">
          <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Designer Toys</Link>
          <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Premium Wallets</Link>
          <Link href="/shop" className="hover:text-[var(--color-accent)] transition-colors">Modern Apparel</Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center gap-6">
          <button aria-label="Search" className="hidden sm:block hover:text-[var(--color-accent)] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <button aria-label="Account" className="hidden sm:block hover:text-[var(--color-accent)] transition-colors">
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          {/* Cart Icon */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative hover:text-[var(--color-accent)] transition-colors"
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalCount > 0 && (
              <span className="absolute -top-1.5 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center bg-[var(--color-accent)] text-white">
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`lg:hidden bg-[var(--color-offwhite)] overflow-hidden transition-all duration-300 ${mobileMenuOpen ? "max-h-64 border-b border-gray-200" : "max-h-0"}`}>
        <div className="flex flex-col px-6 py-4 gap-4 text-sm font-medium">
          <Link href="/shop" className="hover:text-[var(--color-accent)]">Designer Toys</Link>
          <Link href="/shop" className="hover:text-[var(--color-accent)]">Premium Wallets</Link>
          <Link href="/shop" className="hover:text-[var(--color-accent)]">Modern Apparel</Link>
          <div className="h-px bg-gray-200 my-2"></div>
          <Link href="/account" className="hover:text-[var(--color-accent)]">My Account</Link>
        </div>
      </div>
    </header>
  );
}
