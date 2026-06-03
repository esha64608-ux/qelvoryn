import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";
import Link from "next/link";
import Image from "next/image";

export default async function Home() {
  const products = await getProducts();

  return (
    <>
      {/* Hero Section */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <Image
            src="https://images.unsplash.com/photo-1573408301145-b98c4af06891?auto=format&fit=crop&q=80&w=2564"
            alt="Jewelry Lifestyle Background"
            fill
            className="object-cover object-center"
            priority
          />
          <div className="absolute inset-0 bg-black/30" />
        </div>
        <div className="relative z-10 text-center px-6 w-full flex flex-col items-center mt-16">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight mb-8 font-heading text-white uppercase max-w-5xl leading-[0.9]">
            Jewelry <br className="md:hidden"/> Without Limits.
          </h1>
          <Link
            href="/shop"
            className="inline-block bg-white text-black px-12 py-4 text-sm uppercase tracking-widest font-bold hover:bg-neutral-200 transition-colors rounded-none"
          >
            Shop Now
          </Link>
        </div>
      </section>

      {/* Mini Collections (Horizontal Scroll) */}
      <section className="py-12 border-b border-black">
        <div className="container mx-auto px-6 md:px-12">
          <div className="flex gap-4 overflow-x-auto no-scrollbar pb-4">
            {["Mini Charms", "Necklaces", "Rings", "Earrings", "Bracelets", "Best Sellers"].map((category) => (
              <Link 
                key={category}
                href={`/shop`}
                className="flex-shrink-0 bg-neutral-100 text-black px-8 py-4 text-xs font-bold uppercase tracking-widest border border-black hover:bg-black hover:text-white transition-colors"
              >
                {category}
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Best Sellers Section */}
      <section className="py-24 px-6 md:px-12 max-w-[1600px] mx-auto">
        <div className="flex flex-col items-center text-center mb-16">
          <h2 className="text-3xl md:text-5xl font-black tracking-tight text-black mb-6 font-heading uppercase">Best Sellers</h2>
        </div>
        <ProductGrid products={products} />
        <div className="mt-20 text-center">
          <Link
            href="/shop"
            className="inline-block border-b-2 border-black text-black text-sm uppercase tracking-widest font-bold pb-1 hover:text-neutral-500 hover:border-neutral-500 transition-colors"
          >
            View All Products
          </Link>
        </div>
      </section>

      {/* Community / Club Split Section */}
      <section className="flex flex-col md:flex-row border-t border-black">
        <div className="w-full md:w-1/2 relative min-h-[500px]">
          <Image
            src="https://images.unsplash.com/photo-1599643478524-fb66f7ca066b?auto=format&fit=crop&q=80&w=1200"
            alt="Community Lifestyle"
            fill
            className="object-cover object-center grayscale hover:grayscale-0 transition-all duration-700"
          />
        </div>
        <div className="w-full md:w-1/2 bg-white p-12 md:p-24 flex flex-col justify-center border-l-0 md:border-l border-black">
          <h2 className="text-4xl md:text-6xl font-black uppercase font-heading tracking-tight mb-6 leading-none">
            The Relentless<br/>Club
          </h2>
          <p className="text-base text-neutral-600 mb-8 max-w-md leading-relaxed font-medium">
            Earn points, get early access to exclusive drops, and enjoy a lifetime warranty on every piece. Built for those who never stop.
          </p>
          <div>
            <Link
              href="/account/register"
              className="inline-block bg-black text-white px-10 py-4 text-sm uppercase tracking-widest font-bold hover:bg-neutral-800 transition-colors"
            >
              Join Now
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
