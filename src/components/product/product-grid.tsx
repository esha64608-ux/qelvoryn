import ProductCard from "./product-card";

export default function ProductGrid({ products }: { products: any[] }) {
  if (!products || products.length === 0) {
    return <p className="text-center text-neutral-500 my-24">No products found.</p>;
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-8 gap-y-16">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} />
      ))}
    </div>
  );
}
