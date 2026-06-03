import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden bg-black text-white">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover object-center opacity-60"
            priority
          />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-8">
            Elevate Your <br /> Digital Presence.
          </h1>
          <p className="text-lg md:text-xl font-light text-neutral-300 mb-12 max-w-2xl">
            Premium templates, UI kits, and resources for modern creators and forward-thinking brands.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-colors duration-300"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-white">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-3xl font-light tracking-tight text-black mb-4">Featured Collection</h2>
          <div className="w-12 h-[1px] bg-black"></div>
        </div>
        <ProductGrid products={products} />
        <div className="mt-20 text-center">
          <Link
            href="/shop"
            className="inline-block border-b border-black text-black text-sm uppercase tracking-widest font-semibold pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors duration-300"
          >
            View All Products
          </Link>
        </div>
      </section>
    </>
  );
}
