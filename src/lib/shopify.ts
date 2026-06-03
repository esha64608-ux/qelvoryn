const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      },
      body: JSON.stringify({ query, variables }),
      cache: "no-store",
    });

    const body = await result.json();
    if (body.errors) throw body.errors[0];
    return { status: result.status, body };
  } catch (error) {
    console.error("Error fetching from Shopify Storefront API:", error);
    return { status: 500, body: { data: null } };
  }
}

// ─── Shared mock data ─────────────────────────────────────────────────────────
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Double-layer Love Necklace",
    handle: "double-layer-love-necklace",
    description: "A beautiful titanium steel pendant with rhinestones. Perfect for gifting.",
    priceRange: { minVariantPrice: { amount: "12.00", currencyCode: "GBP" } },
    images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1599643478518-a784e5dc4c8f?auto=format&fit=crop&q=80&w=800", altText: "Necklace" } }] },
    variants: { edges: [{ node: { id: "v1", title: "Default", price: { amount: "12.00", currencyCode: "GBP" } } }] },
  },
  {
    id: "2",
    title: "Satin Ribbon Round Hat Bow",
    handle: "satin-ribbon-round-hat-bow",
    description: "Imitation silk satin ribbon for hats and hair care accessories.",
    priceRange: { minVariantPrice: { amount: "9.79", currencyCode: "GBP" } },
    images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1521369909029-2afed882baee?auto=format&fit=crop&q=80&w=800", altText: "Hat Bow" } }] },
    variants: { edges: [{ node: { id: "v2", title: "Default", price: { amount: "9.79", currencyCode: "GBP" } } }] },
  },
  {
    id: "3",
    title: "Premium Gift Box Set",
    handle: "premium-gift-box-set",
    description: "An elegant gift box set for any occasion.",
    priceRange: { minVariantPrice: { amount: "24.99", currencyCode: "GBP" } },
    images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1549465220-1a8b9238cd48?auto=format&fit=crop&q=80&w=800", altText: "Gift Box" } }] },
    variants: { edges: [{ node: { id: "v3", title: "Default", price: { amount: "24.99", currencyCode: "GBP" } } }] },
  },
  {
    id: "4",
    title: "Minimalist Chain Bracelet",
    handle: "minimalist-chain-bracelet",
    description: "A delicate chain bracelet in polished steel.",
    priceRange: { minVariantPrice: { amount: "14.99", currencyCode: "GBP" } },
    images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1611085583191-a3b181a88401?auto=format&fit=crop&q=80&w=800", altText: "Bracelet" } }] },
    variants: { edges: [{ node: { id: "v4", title: "Default", price: { amount: "14.99", currencyCode: "GBP" } } }] },
  },
];

// ─── Get all products (for homepage + shop page) ──────────────────────────────
export async function getProducts(first = 8) {
  const query = `
    {
      products(first: ${first}) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice { amount currencyCode }
            }
            images(first: 1) {
              edges {
                node { url altText width height }
              }
            }
            variants(first: 1) {
              edges {
                node { id title price { amount currencyCode } }
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch({ query });
  if (res.body?.data?.products?.edges) {
    return res.body.data.products.edges.map((e: any) => e.node);
  }
  return MOCK_PRODUCTS;
}

// ─── Get a single product by handle (for product detail page) ─────────────────
export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      productByHandle(handle: $handle) {
        id
        title
        handle
        description
        priceRange {
          minVariantPrice { amount currencyCode }
        }
        images(first: 6) {
          edges {
            node { url altText width height }
          }
        }
        variants(first: 10) {
          edges {
            node { id title price { amount currencyCode } availableForSale }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch({ query, variables: { handle } });
  if (res.body?.data?.productByHandle) {
    return res.body.data.productByHandle;
  }
  return MOCK_PRODUCTS.find((p) => p.handle === handle) ?? MOCK_PRODUCTS[0];
}

// ─── Get all product handles (for generateStaticParams) ──────────────────────
export async function getAllProductHandles() {
  const query = `
    {
      products(first: 100) {
        edges {
          node { handle }
        }
      }
    }
  `;

  const res = await shopifyFetch({ query });
  if (res.body?.data?.products?.edges) {
    return res.body.data.products.edges.map((e: any) => ({ handle: e.node.handle }));
  }
  return MOCK_PRODUCTS.map((p) => ({ handle: p.handle }));
}
