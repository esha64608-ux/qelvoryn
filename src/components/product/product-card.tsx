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
    <div className="group relative flex flex-col p-4 glass-card transition-all duration-500 hover:scale-[1.02] hover:border-white/20">
      <Link href={`/products/${product.handle}`} className="relative aspect-[4/5] rounded-xl overflow-hidden mb-6 block bg-neutral-900">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 25vw"
          className="object-cover object-center transition-all duration-700 group-hover:scale-110 group-hover:opacity-80"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-[#050505]/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
      </Link>
      <div className="flex flex-col flex-grow text-center items-center px-2">
        <h3 className="text-base font-medium text-neutral-100 mb-2 line-clamp-2 leading-snug font-outfit">
          <Link href={`/products/${product.handle}`} className="hover:text-white transition-colors">
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-neutral-400 mb-6">{formattedPrice}</p>
        <button
          onClick={handleAddToCart}
          className="w-full mt-auto bg-white/5 border border-white/10 text-neutral-200 py-3 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-white hover:text-[#050505] transition-all duration-500 rounded-lg premium-glow"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
