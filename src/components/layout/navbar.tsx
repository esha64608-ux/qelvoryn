"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import styles from "./navbar.module.css";

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
    <header className={`${styles.header} ${scrolled ? styles.headerScrolled : ""}`}>
      <nav className={styles.nav}>
        {/* Left: Logo & Mobile Hamburger */}
        <div className={styles.left}>
          <button 
            aria-label="Open menu" 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={`${styles.iconBtn} ${styles.mobileMenuBtn}`}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <line x1="3" y1="12" x2="21" y2="12"></line>
              <line x1="3" y1="6" x2="21" y2="6"></line>
              <line x1="3" y1="18" x2="21" y2="18"></line>
            </svg>
          </button>
          
          <Link href="/" className={styles.logo}>
            QELVORYN
          </Link>
        </div>

        {/* Center: Links (Desktop) */}
        <div className={styles.desktopLinks}>
          <Link href="/shop" className={styles.navLink}>Jewelry</Link>
          <Link href="/shop" className={styles.navLink}>Cosmetics</Link>
          <Link href="/shop" className={styles.navLink}>Hair Care</Link>
        </div>

        {/* Right: Icons */}
        <div className={styles.right}>
          <button aria-label="Search" className={`${styles.iconBtn} ${styles.hideOnMobile}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <circle cx="11" cy="11" r="8"></circle>
              <line x1="21" y1="21" x2="16.65" y2="16.65"></line>
            </svg>
          </button>
          
          <button aria-label="Account" className={`${styles.iconBtn} ${styles.hideOnMobile}`}>
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
              <circle cx="12" cy="7" r="4"></circle>
            </svg>
          </button>
          
          {/* Cart Icon */}
          <button
            onClick={openCart}
            aria-label="Open cart"
            className={styles.iconBtn}
          >
            <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
              <path d="M6 2 3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4zM3 6h18M16 10a4 4 0 0 1-8 0"/>
            </svg>
            {totalCount > 0 && (
              <span className={styles.badge}>{totalCount}</span>
            )}
          </button>
        </div>
      </nav>

      {/* Mobile Menu Dropdown */}
      <div className={`${styles.mobileMenu} ${mobileMenuOpen ? styles.mobileMenuOpen : ""}`}>
        <div className={styles.mobileMenuContent}>
          <Link href="/shop" className={styles.navLink}>Jewelry</Link>
          <Link href="/shop" className={styles.navLink}>Cosmetics</Link>
          <Link href="/shop" className={styles.navLink}>Hair Care</Link>
          <Link href="/account" className={styles.navLink}>My Account</Link>
        </div>
      </div>
    </header>
  );
}
