import { getProductByHandle, getAllProductHandles } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/product/add-to-cart-button";

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles;
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} | Qelvoryn Digital`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return <div className="pt-32 text-center">Product not found.</div>;

  const price = product.priceRange.minVariantPrice;
  const formattedPrice = new Intl.NumberFormat("en-GB", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));

  const images = product.images?.edges ?? [];
  const mainImage = images[0]?.node?.url ?? "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800";

  return (
    <div className="pt-24 min-h-screen bg-[#050505] text-neutral-200">
      <div className="max-w-[1400px] mx-auto px-6 md:px-12 py-16">
        {/* Breadcrumb */}
        <nav className="mb-10 text-xs text-neutral-500 uppercase tracking-widest flex items-center gap-2">
          <Link href="/" className="hover:text-white transition-colors">Home</Link>
          <span>/</span>
          <Link href="/shop" className="hover:text-white transition-colors">Shop</Link>
          <span>/</span>
          <span className="text-neutral-300">{product.title}</span>
        </nav>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
          {/* Image Gallery */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-neutral-900 rounded-2xl overflow-hidden border border-white/5">
              <Image
                src={mainImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-cover object-center"
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-3">
                {images.slice(1, 5).map((img: any, i: number) => (
                  <div key={i} className="relative aspect-square bg-neutral-900 rounded-xl overflow-hidden border border-white/5 hover:border-white/20 transition-colors cursor-pointer">
                    <Image src={img.node.url} alt={img.node.altText ?? product.title} fill sizes="120px" className="object-cover" />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className="lg:sticky lg:top-28 glass-card p-8 md:p-12">
            <h1 className="text-3xl md:text-5xl font-light tracking-tight mb-4 font-outfit text-white">{product.title}</h1>
            <p className="text-2xl font-medium mb-8 text-neutral-300">{formattedPrice}</p>

            <div className="w-full h-[1px] bg-white/10 mb-8" />

            <p className="text-neutral-400 leading-relaxed mb-10 text-lg">{product.description}</p>

            {/* Variants */}
            {product.variants?.edges?.length > 1 && (
              <div className="mb-8">
                <p className="text-xs uppercase tracking-widest font-semibold mb-3">Options</p>
                <div className="flex flex-wrap gap-2">
                  {product.variants.edges.map((v: any) => (
                    <button
                      key={v.node.id}
                      className="border border-white/20 px-6 py-2.5 text-sm hover:border-white hover:bg-white/5 transition-colors rounded-full"
                    >
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AddToCartButton product={product} />

            <div className="mt-8 space-y-3 text-sm text-neutral-400">
              <p className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Free shipping on orders over £50
              </p>
              <p className="flex items-center gap-2">
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                Delivered in 3-5 business days
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
