"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

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
        quantity: 1,
      });
      openCart();
    }
  };

  return (
    <div className="group flex flex-col relative bg-transparent overflow-hidden">
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden mb-5 block rounded-sm">
        <Link href={`/products/${product.handle}`} className="absolute inset-0 z-10">
          <span className="sr-only">View {product.title}</span>
        </Link>
        
        {/* Primary Image */}
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center transition-transform duration-700 ease-out group-hover:scale-105"
        />
        
        {/* Hover Image */}
        {hoverImageUrl !== imageUrl && (
          <Image
            src={hoverImageUrl}
            alt={`${product.title} lifestyle`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-all duration-700 ease-out group-hover:scale-105"
          />
        )}

        {/* Quick Add Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 opacity-0 group-hover:opacity-100 transition-all duration-300 ease-out z-20">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              handleAddToCart();
            }}
            className="w-full bg-white/90 backdrop-blur-sm text-black border border-transparent py-3 px-4 text-xs tracking-widest font-semibold uppercase shadow-lg hover:bg-[var(--color-accent)] hover:text-white hover:border-[var(--color-accent)] cursor-pointer rounded-sm transition-colors duration-200"
          >
            Add to Cart
          </button>
        </div>
      </div>

      <div className="flex flex-col text-left px-1 pb-2">
        <h3 className="text-sm font-medium text-black mb-1 line-clamp-1 tracking-wide">
          <Link href={`/products/${product.handle}`} className="hover:text-neutral-500 transition-colors">
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-neutral-500">{formattedPrice}</p>
      </div>
    </div>
  );
}
