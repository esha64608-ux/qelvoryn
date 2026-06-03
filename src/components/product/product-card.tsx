import Image from "next/image";
import Link from "next/link";

export default function ProductCard({ product }: { product: any }) {
  const price = product.priceRange.minVariantPrice;
  
  // Format the price
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));

  const imageUrl = product.images?.edges[0]?.node?.url || "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="group relative flex flex-col">
      <Link href={`/products/${product.handle}`} className="relative aspect-[4/5] bg-neutral-100 overflow-hidden mb-6 block">
        <Image
          src={imageUrl}
          alt={product.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/5 transition-colors duration-500" />
      </Link>
      <div className="flex flex-col flex-grow text-center items-center px-4">
        <h3 className="text-lg font-medium text-black mb-2">
          <Link href={`/products/${product.handle}`} className="hover:underline underline-offset-4 decoration-1">
            {product.title}
          </Link>
        </h3>
        <p className="text-sm text-neutral-500 mb-4">{formattedPrice}</p>
        <button className="w-full mt-auto bg-transparent border border-black text-black py-3 px-6 text-xs uppercase tracking-widest font-semibold hover:bg-black hover:text-white transition-colors duration-300">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
