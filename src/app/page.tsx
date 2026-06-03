import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";
import Link from "next/link";
import Image from "next/image";
import styles from "./page.module.css";

export default async function Home() {
  const products = await getProducts(8);

  return (
    <div className="animate-fade-in">
      {/* 1. Hero Section */}
      <section className={styles.hero}>
        <div className={styles.heroBg}>
          <Image
            src="https://images.unsplash.com/photo-1611591437281-460bfbe1220a?auto=format&fit=crop&q=80&w=2564"
            alt="Luxury Beauty and Jewelry"
            fill
            className={styles.heroImage}
            priority
          />
          <div className={styles.heroOverlay} />
        </div>
        
        <div className={styles.heroContent}>
          <h1 className={styles.heroTitle}>
            Elegance Redefined.
          </h1>
          <p className={styles.heroSubtitle}>
            Discover our premium collection of fine jewelry, luxurious cosmetics, and elevated hair care.
          </p>
          <Link href="/shop" className="btn-primary">
            Explore Collection
          </Link>
        </div>
      </section>

      {/* 2. Trust & Social Proof Section */}
      <section className={styles.trustSection}>
        <div className="container">
          <div className={styles.trustGrid}>
            <div className={styles.trustItem}>
              <svg className={styles.trustIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h3 className={styles.trustTitle}>Complimentary Shipping</h3>
              <p className={styles.trustDesc}>Free worldwide delivery on orders over $150.</p>
            </div>
            <div className={styles.trustItem}>
              <svg className={styles.trustIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className={styles.trustTitle}>Secure Checkout</h3>
              <p className={styles.trustDesc}>Encrypted and safe payment processing.</p>
            </div>
            <div className={styles.trustItem}>
              <svg className={styles.trustIcon} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <h3 className={styles.trustTitle}>Satisfaction Guarantee</h3>
              <p className={styles.trustDesc}>30-day return policy for peace of mind.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Highlight */}
      <section className={styles.categoriesSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Shop by Category</h2>
          </div>
          
          <div className={styles.categoriesGrid}>
            {/* Category 1 */}
            <Link href="/shop" className={styles.categoryCard}>
              <Image
                src="https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=1200"
                alt="Fine Jewelry"
                fill
                className={styles.categoryImage}
              />
              <div className={styles.categoryOverlay} />
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Fine Jewelry</h3>
                <span className={styles.categoryLink}>
                  Shop Now <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/shop" className={styles.categoryCard}>
              <Image
                src="https://images.unsplash.com/photo-1596462502278-27bfdc403348?auto=format&fit=crop&q=80&w=1200"
                alt="Luxury Cosmetics"
                fill
                className={styles.categoryImage}
              />
              <div className={styles.categoryOverlay} />
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Luxury Cosmetics</h3>
                <span className={styles.categoryLink}>
                  Shop Now <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/shop" className={styles.categoryCard}>
              <Image
                src="https://images.unsplash.com/photo-1522337660859-02fbefca4702?auto=format&fit=crop&q=80&w=1200"
                alt="Hair Care"
                fill
                className={styles.categoryImage}
              />
              <div className={styles.categoryOverlay} />
              <div className={styles.categoryContent}>
                <h3 className={styles.categoryTitle}>Hair Care</h3>
                <span className={styles.categoryLink}>
                  Shop Now <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className={styles.featuredSection}>
        <div className="container">
          <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Featured Collection</h2>
            <p className={styles.featuredDesc}>
              Hand-selected pieces designed to elevate your everyday routine.
            </p>
          </div>
          
          <ProductGrid products={products} />
          
          <div className={styles.viewAll}>
            <Link href="/shop" className="btn-secondary">
              View All Products
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
