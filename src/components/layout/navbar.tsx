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
      className={`fixed top-0 left-0 right-0 z-30 transition-all duration-300 ${
        scrolled ? "bg-white border-b border-neutral-100 shadow-sm" : "bg-transparent"
      }`}
    >
      <nav className="container mx-auto px-6 md:px-12 h-16 flex items-center justify-between">
        {/* Logo */}
        <Link
          href="/"
          className={`text-xl font-bold tracking-tight transition-colors ${scrolled ? "text-black" : "text-white"}`}
        >
          QELVORYN
        </Link>

        {/* Links */}
        <div className={`hidden md:flex items-center gap-10 text-xs uppercase tracking-widest font-semibold transition-colors ${scrolled ? "text-neutral-600" : "text-white/80"}`}>
          <Link href="/shop" className="hover:text-black transition-colors">Shop</Link>
          <Link href="/about" className="hover:text-black transition-colors">About</Link>
          <Link href="/contact" className="hover:text-black transition-colors">Contact</Link>
        </div>

        {/* Cart Icon */}
        <button
          onClick={openCart}
          aria-label="Open cart"
          className={`relative transition-colors ${scrolled ? "text-black" : "text-white"}`}
        >
          <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
            <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
          </svg>
          {totalCount > 0 && (
            <span className="absolute -top-2 -right-2 bg-black text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center">
              {totalCount}
            </span>
          )}
        </button>
      </nav>
    </header>
  );
}
