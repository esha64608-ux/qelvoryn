"use client";

import { useCart } from "./cart-provider";
import Image from "next/image";
import Link from "next/link";

export default function CartDrawer() {
  const { items, isOpen, closeCart, removeItem, updateQuantity, subtotal, totalCount } = useCart();

  return (
    <>
      {/* Backdrop */}
      <div
        onClick={closeCart}
        className={`fixed inset-0 bg-black/40 z-40 transition-opacity duration-300 ${isOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"}`}
      />

      {/* Drawer */}
      <div
        className={`fixed top-0 right-0 h-full w-full max-w-md bg-white z-50 flex flex-col shadow-2xl transition-transform duration-300 ease-in-out ${isOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        {/* Header */}
        <div className="flex items-center justify-between px-8 py-6 border-b border-neutral-100">
          <h2 className="text-sm uppercase tracking-widest font-semibold">
            Cart {totalCount > 0 && <span className="text-neutral-400">({totalCount})</span>}
          </h2>
          <button
            onClick={closeCart}
            aria-label="Close cart"
            className="text-neutral-400 hover:text-black transition-colors"
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
                  <div className="relative w-20 h-24 bg-neutral-100 flex-shrink-0 overflow-hidden">
                    <Image src={item.imageUrl} alt={item.title} fill className="object-cover" sizes="80px" />
                  </div>
                  <div className="flex-grow min-w-0">
                    <p className="font-medium text-sm truncate">{item.title}</p>
                    {item.variantTitle !== "Default Title" && (
                      <p className="text-neutral-400 text-xs mt-0.5">{item.variantTitle}</p>
                    )}
                    <p className="text-sm mt-1">
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: item.currencyCode }).format(parseFloat(item.price))}
                    </p>
                    <div className="flex items-center gap-3 mt-3">
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className="w-6 h-6 border border-neutral-200 flex items-center justify-center text-sm hover:border-black transition-colors">−</button>
                      <span className="text-sm w-4 text-center">{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className="w-6 h-6 border border-neutral-200 flex items-center justify-center text-sm hover:border-black transition-colors">+</button>
                      <button onClick={() => removeItem(item.variantId)} className="ml-auto text-neutral-300 hover:text-black transition-colors">
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
          <div className="px-8 py-6 border-t border-neutral-100">
            <div className="flex justify-between items-center mb-6">
              <span className="text-sm text-neutral-500 uppercase tracking-widest">Subtotal</span>
              <span className="font-medium">{subtotal}</span>
            </div>
            <Link
              href="/checkout"
              onClick={closeCart}
              className="block w-full bg-black text-white text-center py-4 text-xs uppercase tracking-widest font-semibold hover:bg-neutral-800 transition-colors"
            >
              Proceed to Checkout
            </Link>
            <button
              onClick={closeCart}
              className="block w-full text-center mt-3 text-xs text-neutral-400 hover:text-black uppercase tracking-widest transition-colors"
            >
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
