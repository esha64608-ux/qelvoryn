"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "@/components/cart/cart-provider";

export default function ProductCard({ product }: { product: any }) {
  const { addItem } = useCart();
  const price = product.priceRange.minVariantPrice;
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));

  const imageUrl =
    product.images?.edges[0]?.node?.url ||
    "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800";
    
  const hoverImageUrl = 
    product.images?.edges[1]?.node?.url || imageUrl;

  const firstVariant = product.variants?.edges[0]?.node;

  const handleAddToCart = () => {
    if (!firstVariant) return;
    addItem({
      variantId: firstVariant.id,
      productId: product.id,
      title: product.title,
      variantTitle: firstVariant.title,
      price: firstVariant.price?.amount ?? price.amount,
      currencyCode: firstVariant.price?.currencyCode ?? price.currencyCode,
      imageUrl,
    });
  };

  return (
    <div className="group flex flex-col">
      <div className="relative aspect-[4/5] bg-neutral-100 overflow-hidden mb-4 block">
        {/* Primary Image */}
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className={`object-cover object-center transition-opacity duration-500 ${hoverImageUrl !== imageUrl ? 'group-hover:opacity-0' : ''}`}
        />
        {/* Hover Image */}
        {hoverImageUrl !== imageUrl && (
          <Image
            src={hoverImageUrl}
            alt={`${product.title} lifestyle`}
            fill
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
            className="object-cover object-center absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          />
        )}
        
        {/* Quick View Overlay Button */}
        <div className="absolute inset-x-0 bottom-0 p-4 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-out">
          <button
            onClick={(e) => {
              e.preventDefault();
              handleAddToCart();
            }}
            className="w-full bg-black text-white py-3 text-xs uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors"
          >
            Quick Add
          </button>
        </div>
      </div>

      <div className="flex flex-col text-left px-1">
        <h3 className="text-sm font-bold text-black mb-1 line-clamp-1 font-heading uppercase tracking-wide">
          <Link href={`/products/${product.handle}`} className="hover:opacity-70 transition-opacity">
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-neutral-600 mb-3">{formattedPrice}</p>
        
        {/* Subtle Swatches (Mock/Visual only) */}
        <div className="flex items-center gap-2">
          <div className="w-3 h-3 rounded-full bg-[#D4AF37] border border-neutral-300" title="Gold"></div>
          <div className="w-3 h-3 rounded-full bg-[#E5E4E2] border border-neutral-300" title="Silver"></div>
        </div>
      </div>
    </div>
  );
}
