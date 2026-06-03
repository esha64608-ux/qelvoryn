"use client";

import { useCart } from "./cart-provider";
import Image from "next/image";
import { createCheckout } from "@/lib/shopify";
import { useState } from "react";
import styles from "./cart-drawer.module.css";

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
      <div
        onClick={closeCart}
        className={`${styles.backdrop} ${isOpen ? styles.backdropOpen : ""}`}
      />

      <div className={`${styles.drawer} ${isOpen ? styles.drawerOpen : ""}`}>
        <div className={styles.header}>
          <h2 className={styles.title}>
            Cart {totalCount > 0 && <span className={styles.count}>({totalCount})</span>}
          </h2>
          <button onClick={closeCart} aria-label="Close cart" className={styles.closeBtn}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M18 6 6 18M6 6l12 12"/>
            </svg>
          </button>
        </div>

        <div className={styles.content}>
          {items.length === 0 ? (
            <div className={styles.emptyState}>
              <svg className={styles.emptyIcon} fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeWidth="1">
                <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
              </svg>
              <p className={styles.emptyText}>Your cart is empty.</p>
              <button onClick={closeCart} className={styles.continueBtn}>
                Continue Shopping
              </button>
            </div>
          ) : (
            <ul className={styles.itemList}>
              {items.map((item) => (
                <li key={item.variantId} className={styles.item}>
                  <div className={styles.imageWrapper}>
                    <Image src={item.imageUrl} alt={item.title} fill className={styles.itemImage} sizes="96px" />
                  </div>
                  <div className={styles.itemDetails}>
                    <p className={styles.itemTitle}>{item.title}</p>
                    {item.variantTitle !== "Default Title" && (
                      <p className={styles.itemVariant}>{item.variantTitle}</p>
                    )}
                    <p className={styles.itemPrice}>
                      {new Intl.NumberFormat("en-GB", { style: "currency", currency: item.currencyCode }).format(parseFloat(item.price))}
                    </p>
                    <div className={styles.controls}>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity - 1)} className={styles.qtyBtn}>−</button>
                      <span className={styles.qty}>{item.quantity}</span>
                      <button onClick={() => updateQuantity(item.variantId, item.quantity + 1)} className={styles.qtyBtn}>+</button>
                      <button onClick={() => removeItem(item.variantId)} className={styles.removeBtn}>
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

        {items.length > 0 && (
          <div className={styles.footer}>
            <div className={styles.subtotal}>
              <span className={styles.subtotalLabel}>Subtotal</span>
              <span className={styles.subtotalPrice}>{subtotal}</span>
            </div>
            <button
              onClick={handleCheckout}
              disabled={isCheckoutLoading}
              className={styles.checkoutBtn}
            >
              {isCheckoutLoading ? "Preparing..." : "Proceed to Checkout"}
            </button>
            <button onClick={closeCart} className={styles.continueFooterBtn}>
              Continue Shopping
            </button>
          </div>
        )}
      </div>
    </>
  );
}
