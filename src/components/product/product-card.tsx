"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";
import styles from "./product-card.module.css";

export default function ProductCard({ product }: { product: any }) {
  const { addItem, openCart } = useCart();
  
  const price = product.priceRange.minVariantPrice;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));

  const imageUrl = product.images?.edges[0]?.node?.url;
  const hoverImageUrl = product.images?.edges[1]?.node?.url || imageUrl;
  
  // The first variant ID is used by default for the "Add to Cart" button
  const firstVariantId = product.variants?.edges[0]?.node?.id;

  const handleAddToCart = () => {
    if (firstVariantId) {
      addItem({
        variantId: firstVariantId,
        productId: product.id,
        title: product.title,
        variantTitle: product.variants?.edges[0]?.node?.title || product.title,
        price: price.amount,
        currencyCode: price.currencyCode,
        imageUrl: imageUrl,
      });
      openCart();
    }
  };

  return (
    <div className={styles.card}>
      <div className={styles.imageWrapper}>
        <Link href={`/products/${product.handle}`} className={styles.imageLink}>
          <span className="visually-hidden">View {product.title}</span>
        </Link>
        
        {/* Primary Image */}
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={styles.primaryImage}
        />
        
        {/* Hover Image */}
        {hoverImageUrl !== imageUrl && (
          <Image
            src={hoverImageUrl}
            alt={`${product.title} lifestyle`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className={styles.hoverImage}
          />
        )}

        {/* Quick Add Overlay Button */}
        <div className={styles.quickAddWrapper}>
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            className={styles.quickAddBtn}
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className={styles.details}>
        <h3 className={styles.title}>
          <Link href={`/products/${product.handle}`} className={styles.titleLink}>
            {product.title}
          </Link>
        </h3>
        <p className={styles.price}>{formattedPrice}</p>
      </div>
    </div>
  );
}
