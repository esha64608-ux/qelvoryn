import { getProductByHandle, getAllProductHandles } from "@/lib/shopify";
import Image from "next/image";
import Link from "next/link";
import AddToCartButton from "@/components/product/add-to-cart-button";
import styles from "./page.module.css";

export async function generateStaticParams() {
  const handles = await getAllProductHandles();
  return handles;
}

export async function generateMetadata({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return { title: "Product Not Found" };
  return {
    title: `${product.title} | Qelvoryn`,
    description: product.description,
  };
}

export default async function ProductPage({ params }: { params: Promise<{ handle: string }> }) {
  const { handle } = await params;
  const product = await getProductByHandle(handle);
  if (!product) return <div className="text-center" style={{paddingTop: '8rem'}}>Product not found.</div>;

  const price = product.priceRange.minVariantPrice;
  const formattedPrice = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: price.currencyCode,
  }).format(parseFloat(price.amount));

  const images = product.images?.edges ?? [];
  const mainImage = images[0]?.node?.url ?? "https://images.unsplash.com/photo-1515562141207-7a88fb7ce338?auto=format&fit=crop&q=80&w=800";

  return (
    <div className={`${styles.page} animate-fade-in`}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb}>
          <Link href="/" className={styles.crumbLink}>Home</Link>
          <span>/</span>
          <Link href="/shop" className={styles.crumbLink}>Shop</Link>
          <span>/</span>
          <span className={styles.crumbCurrent}>{product.title}</span>
        </nav>

        <div className={styles.grid}>
          {/* Image Gallery */}
          <div className={styles.gallery}>
            <div className={styles.mainImageWrapper}>
              <Image
                src={mainImage}
                alt={product.title}
                fill
                priority
                sizes="(max-width: 1024px) 100vw, 50vw"
                style={{objectFit: 'cover'}}
              />
            </div>
            {images.length > 1 && (
              <div className={styles.thumbnails}>
                {images.slice(1, 5).map((img: any, i: number) => (
                  <div key={i} className={styles.thumbnailWrapper}>
                    <Image 
                      src={img.node.url} 
                      alt={img.node.altText ?? product.title} 
                      fill 
                      sizes="120px" 
                      style={{objectFit: 'cover'}} 
                    />
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Product Info */}
          <div className={styles.info}>
            <h1 className={styles.title}>{product.title}</h1>
            <p className={styles.price}>{formattedPrice}</p>

            <div className={styles.divider} />

            <p className={styles.description}>{product.description}</p>

            {/* Variants */}
            {product.variants?.edges?.length > 1 && (
              <div>
                <p className={styles.optionsTitle}>Options</p>
                <div className={styles.variants}>
                  {product.variants.edges.map((v: any) => (
                    <button key={v.node.id} className={styles.variantBtn}>
                      {v.node.title}
                    </button>
                  ))}
                </div>
              </div>
            )}

            <AddToCartButton product={product} />

            <div className={styles.shippingInfo}>
              <p className={styles.shippingItem}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5"><path d="M5 12h14M12 5l7 7-7 7"/></svg>
                Complimentary shipping on orders over $150
              </p>
              <p className={styles.shippingItem}>
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
