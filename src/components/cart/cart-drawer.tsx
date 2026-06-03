"use client";

import { useCart } from "./cart-provider";
import Image from "next/image";
import Link from "next/link";
import { createCheckout } from "@/lib/shopify";
import { useState } from "react";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalCount } = useCart();
  const [isCheckoutLoading, setIsCheckoutLoading] = useState(false);

  const handleCheckout = async () => {
    setIsCheckoutLoading(true);
    try {
      const checkoutItems = items.map((item) => ({
        variantId: item.variantId,
        quantity: item.quantity,
      }));
      const checkoutUrl = await createCheckout(checkoutItems);
      if (checkoutUrl) {
        try {
          // Force the checkout URL to use the .myshopify.com domain
          // This prevents a 404 error if Shopify tries to route checkout to the headless custom domain
          const urlObj = new URL(checkoutUrl);
          const shopifyDomain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
          if (shopifyDomain && urlObj.hostname !== shopifyDomain) {
            urlObj.hostname = shopifyDomain;
          }
          window.location.href = urlObj.toString();
        } catch (e) {
          window.location.href = checkoutUrl;
        }
      } else {
        alert("Failed to create checkout session. Please try again.");
      }
    } catch (error) {
      console.error(error);
      alert("Failed to create checkout session.");
    } finally {
      setIsCheckoutLoading(false);
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-[#050505]/80 backdrop-blur-3xl z-50 flex flex-col shadow-[0_0_80px_rgba(0,0,0,0.8)] border-l border-white/5 transition-transform duration-500 ease-[cubic-bezier(0.25,1,0.5,1)] ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">
          <h2 className="text-sm uppercase tracking-widest font-semibold font-outfit text-white">
            Cart {totalCount > 0 && <span className="text-neutral-500">({totalCount})</span>}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-neutral-400 hover:text-white transition-colors"
          >
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        {/* Items */}
        <div className="flex-grow overflow-y-auto px-8 py-6">
          {items.length === 0 ? (
            <div className="flex flex-col items-center justify-center h-full text-center">
              <svg className="w-12 h-12 text-neutral-200 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className="text-neutral-400 text-sm mb-6">Your cart is empty.</p>
              <button onClick={closeCart} className="text-xs uppercase tracking-widest border-b border-black pb-0.5 hover:text-neutral-500 hover:border-neutral-500 transition-colors">
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className="space-y-6">
              {items.map((item) => (
                <li key={item.variantId} className="flex gap-4">
                  <div className="relative w-24 h-24 rounded-lg bg-neutral-900 flex-shrink-0 overflow-hidden border border-white/5">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="96px" />
                  </div>
                  <div className="flex-grow min-w-0 flex flex-col justify-center">
                    <p className="font-medium text-sm truncate text-neutral-200">{item.title}</p>
                    {item.variantTitle !== "Default Title" && (
                      <p className="text-neutral-500 text-xs mt-1">{item.variantTitle}</p>
                    )}
                    <p className="text-sm mt-2 text-white">
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: item.currencyCode }).format(parseFloat(item.price))}
                    </p>
                    <div className="flex items-center gap-4 mt-4">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-sm text-neutral-300 hover:border-white/40 hover:text-white transition-colors">−</button>
                      <span className="text-sm w-4 text-center text-neutral-200">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-7 h-7 rounded border border-white/10 flex items-center justify-center text-sm text-neutral-300 hover:border-white/40 hover:text-white transition-colors">+</button>
                      <button onClick={() => removeItem(item.variantId)} className="ml-auto text-neutral-500 hover:text-white transition-colors">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                          <path d="M18 6 6 18M6 6l12 12"/>
                        </svg>
                      </button>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Footer */}
        {items.length > 0 && (
          <div className="px-8 py-8 border-t border-white/10 bg-[#050505]/50">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-neutral-400 uppercase tracking-widest">Subtotal</span>
              <span className="font-medium text-lg text-white">{subtotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
              className="block w-full bg-white text-[#050505] text-center py-4 rounded-xl text-xs uppercase tracking-widest font-bold hover:bg-neutral-200 transition-all duration-300 disabled:opacity-70 disabled:cursor-not-allowed premium-glow"
            >
              {isCheckoutLoading ? "Preparing Checkout..." : "Proceed to Checkout"}
            </button>
            <button
              onClick={closeCart}
              className="block w-full text-center mt-4 text-xs text-neutral-500 hover:text-white uppercase tracking-widest transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
