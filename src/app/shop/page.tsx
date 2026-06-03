import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";

export const metadata = {
  title: "Shop All Products | Qelvoryn Digital",
  description: "Browse our full collection of premium products.",
};

export default async function ShopPage() {
  const products = await getProducts(20);

  return (
    <div className="pt-32 pb-24 px-6 md:px-12 max-w-[1600px] mx-auto">
      <div className="mb-16 text-center">
        <h1 className="text-4xl font-light tracking-tight mb-4">All Products</h1>
        <div className="w-12 h-[1px] bg-black mx-auto"></div>
      </div>
      <ProductGrid products={products} />
    </div>
  );
}
