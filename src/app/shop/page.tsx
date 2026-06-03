import { getProducts } from "@/lib/shopify";
import ProductGrid from "@/components/product/product-grid";
import styles from "./page.module.css";

export const metadata = {
  title: "Shop All Products | Qelvoryn",
  description: "Browse our full collection of premium jewelry, cosmetics, and hair care.",
};

export default async function ShopPage() {
  const products = await getProducts(20);

  return (
    <div className={`${styles.page} animate-fade-in`}>
      <div className="container">
        <div className={styles.header}>
          <h1 className={styles.title}>All Products</h1>
          <div className={styles.divider}></div>
        </div>
        <ProductGrid products={products} />
      </div>
    </div>
  );
}
