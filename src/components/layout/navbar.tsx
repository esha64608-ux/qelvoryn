"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const { openCart, totalCount } = useCart();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 10);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-30 transition-colors duration-300 ${
        scrolled ? "bg-white border-b border-black text-black" : "bg-transparent text-white"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 h-20 grid grid-cols-3 items-center">
        {/* Left: Menu Icon & Links (Desktop) */}
        <div className="flex items-center gap-6">
          <button aria-label="Open menu" className="hover:opacity-70 transition-opacity">
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          <div className="hidden lg:flex items-center gap-8 text-xs uppercase tracking-widest font-semibold">
            <Link href="/shop" className="hover:opacity-60 transition-opacity">Shop</Link>
            <Link href="/about" className="hover:opacity-60 transition-opacity">About</Link>
          </div>
        </div>

        {/* Center: Logo */}
        <div className="flex justify-center">
          <Link
            href="/"
            className="text-2xl md:text-3xl font-bold tracking-tight font-heading"
          >
            QELVORYN
          </Link>
        </div>

        {/* Right: Icons */}
        <div className="flex items-center justify-end gap-6">
          <div className="hidden md:flex items-center gap-6">
            <button className="text-xs uppercase tracking-widest font-semibold hover:opacity-60 transition-opacity">USD</button>
            <button aria-label="Account" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
            </button>
            <button aria-label="Search" className="hover:opacity-70 transition-opacity">
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                <circle cx="11" cy="11" r="8"></circle>
                <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
              </svg>
            </button>
          </div>
          
          {/* Cart Icon */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className="relative hover:opacity-70 transition-opacity"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalCount > 0 && (
              <span className={`absolute -top-2 -right-2 text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center ${scrolled ? "bg-black text-white" : "bg-white text-black"}`}>
                {totalCount}
              </span>
            )}
          </button>
        </div>
      </nav>
    </header>
  );
}
