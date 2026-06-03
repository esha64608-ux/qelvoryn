import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts(8);

  return (
    <>
      {/* 1. Hero Section */}
      <section className="relative h-[85vh] min-h-[600px] flex items-center justify-center overflow-hidden animate-fade-in">
        <div className="absolute inset-0 z-0">
          {/* Edge-to-edge premium placeholder image */}
          <Image
            src="https://images.unsplash.com/photo-1490481651871-ab68de25d43d?auto=format&fit=crop&q=80&w=2564"
            alt="Luxury Lifestyle Background"
            fill
            className="object-cover object-center"
            priority
          />
          {/* Subtle gradient overlay to ensure text readability without darkening the whole image */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center mt-24">
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6 text-white text-balance max-w-4xl leading-tight drop-shadow-sm">
            Curated Essentials for the Modern Minimalist.
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-light tracking-wide">
            Discover our collection of premium wallets, designer toys, and elevated apparel.
          </p>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-10 py-4 text-sm font-semibold hover:bg-gray-100 transition-colors shadow-lg rounded-sm"
          >
            Shop the Collection
          </Link>
        </div>
      </section>

      {/* 2. Trust & Social Proof Section */}
      <section className="border-b border-gray-200 bg-white">
        <div className="container mx-auto px-6 py-10 md:py-14">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center divide-y md:divide-y-0 md:divide-x divide-gray-200">
            <div className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <svg className="w-8 h-8 mb-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M5 8h14M5 8a2 2 0 110-4h14a2 2 0 110 4M5 8v10a2 2 0 002 2h10a2 2 0 002-2V8m-9 4h4" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase mb-2">Fast Shipping</h3>
              <p className="text-sm text-gray-500">Free delivery on orders over $50.</p>
            </div>
            <div className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <svg className="w-8 h-8 mb-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase mb-2">Secure Checkout</h3>
              <p className="text-sm text-gray-500">Encrypted and safe payments.</p>
            </div>
            <div className="flex flex-col items-center pt-6 md:pt-0 px-4">
              <svg className="w-8 h-8 mb-4 text-[var(--color-accent)]" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                <path d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
              </svg>
              <h3 className="text-sm font-bold text-gray-900 tracking-wide uppercase mb-2">30-Day Returns</h3>
              <p className="text-sm text-gray-500">Shop with absolute confidence.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 3. Category Highlight */}
      <section className="py-24 bg-[var(--color-offwhite)]">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight text-gray-900">Shop by Category</h2>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-10">
            {/* Category 1 */}
            <Link href="/shop" className="group relative h-[450px] overflow-hidden rounded-sm block">
              <Image
                src="https://images.unsplash.com/photo-1596461404969-9ae70f2830c1?auto=format&fit=crop&q=80&w=1200"
                alt="Designer Toys"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">Designer Toys</h3>
                <span className="text-white/90 text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Shop Now <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Category 2 */}
            <Link href="/shop" className="group relative h-[450px] overflow-hidden rounded-sm block">
              <Image
                src="https://images.unsplash.com/photo-1627123424574-724758594e93?auto=format&fit=crop&q=80&w=1200"
                alt="Premium Wallets"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">Premium Wallets</h3>
                <span className="text-white/90 text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Shop Now <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>

            {/* Category 3 */}
            <Link href="/shop" className="group relative h-[450px] overflow-hidden rounded-sm block">
              <Image
                src="https://images.unsplash.com/photo-1521572163474-6864f9cf17ab?auto=format&fit=crop&q=80&w=1200"
                alt="Modern Apparel"
                fill
                className="object-cover transition-transform duration-700 ease-out group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/30 transition-colors duration-500" />
              <div className="absolute bottom-8 left-8">
                <h3 className="text-2xl font-bold text-white mb-2">Modern Apparel</h3>
                <span className="text-white/90 text-sm font-medium inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Shop Now <span aria-hidden="true">&rarr;</span>
                </span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 4. Featured Products Grid */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto bg-white">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl font-bold tracking-tight text-gray-900 mb-4">Featured Collection</h2>
          <p className="text-gray-500 max-w-2xl text-balance">
            Hand-selected essentials designed to elevate your everyday carry and lifestyle.
          </p>
        </div>
        
        <ProductGrid products={products} />
        
        <div className="mt-16 text-center">
          <Link
            href="/shop"
            className="inline-block bg-white text-black border border-gray-300 px-10 py-4 text-sm font-semibold hover:border-black hover:bg-gray-50 transition-colors rounded-sm shadow-sm"
          >
            View All Products
          </Link>
        </div>
      </section>
    </>
  );
}
