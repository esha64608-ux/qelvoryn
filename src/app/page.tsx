import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-[90vh] flex items-center justify-center overflow-hidden bg-[#050505]">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2564&auto=format&fit=crop"
            alt="Hero Background"
            fill
            className="object-cover object-center opacity-30 scale-105 animate-[pulse_10s_ease-in-out_infinite]"
            priority
          />
          <div className="absolute inset-0 bg-gradient-to-t from-[#050505] via-transparent to-[#050505]/40" />
        </div>
        <div className="relative z-10 text-center px-6 max-w-4xl mx-auto flex flex-col items-center glass-card p-12 md:p-16 mx-4">
          <h1 className="text-5xl md:text-7xl font-light tracking-tight mb-6 font-outfit text-white">
            Elevate Your <br /> <span className="font-medium text-transparent bg-clip-text bg-gradient-to-r from-neutral-200 to-neutral-600">Digital Presence.</span>
          </h1>
          <p className="text-lg md:text-xl font-light text-neutral-400 mb-10 max-w-2xl">
            Premium templates, UI kits, and resources for modern creators and forward-thinking brands.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-[#050505] px-10 py-4 text-sm uppercase tracking-widest font-semibold hover:bg-neutral-200 transition-all duration-300 premium-glow rounded-full"
          >
            Explore Collection
          </Link>
        </div>
      </section>

      {/* Featured Collection Section */}
      <section className="py-32 px-6 md:px-12 max-w-[1600px] mx-auto bg-[#050505]">
        <div className="flex flex-col items-center text-center mb-20">
          <h2 className="text-4xl font-light tracking-tight text-white mb-6 font-outfit">Featured Collection</h2>
          <div className="w-16 h-[1px] bg-neutral-800"></div>
        </div>
        <ProductGrid products={products} />
        <div className="mt-24 text-center">
          <Link
            href="/shop"
            className="inline-block border-b border-neutral-600 text-neutral-400 text-sm uppercase tracking-widest font-semibold pb-2 hover:text-white hover:border-white transition-all duration-300"
          >
            View All Products
          </Link>
        </div>
      </section>
    </>
  );
}
