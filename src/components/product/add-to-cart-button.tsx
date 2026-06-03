"use client";

import { useCart } from "@/components/cart/cart-provider";
import styles from "./add-to-cart-button.module.css";

export default function AddToCartButton({ product }: { product: any }) {
  const { addItem } = useCart();
  const firstVariant = product.variants?.edges[0]?.node;
  const imageUrl = product.images?.edges[0]?.node?.url ?? "";

  const handleAdd = () => {
    if (!firstVariant) return;
    addItem({
      variantId: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price?.amount ?? product.priceRange.minVariantPrice.amount,
      currencyCode: firstVariant.price?.currencyCode ?? product.priceRange.minVariantPrice.currencyCode,
      imageUrl,
    });
  };

  return (
    <button onClick={handleAdd} className={styles.btn}>
      Add to Cart
    </button>
  );
}
