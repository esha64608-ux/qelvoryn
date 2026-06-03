const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

export async function shopifyFetch({
  query,
  variables = {},
}: {
  query: string;
  variables?: Record<string, any>;
}) {
  const endpoint = `https://${domain}/api/2024-01/graphql.json?bust=1`;

  try {
    const result = await fetch(endpoint, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Storefront-Access-Token": storefrontAccessToken!,
      },
      body: JSON.stringify({ query, variables }),
    });

    const body = await result.json();
    if (body.errors) throw body.errors[0];
    return { status: result.status, body };
  } catch (error) {
    console.error("Error fetching from Shopify Storefront API:", error);
    return { status: 500, body: { data: null } };
  }
}

// Removed Mock Data

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
            images(first: 2) {
              edges {
                node { url altText width height }
              }
            }
            variants(first: 3) {
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
  return [];
}

// ─── Get a single product by handle (for product detail page) ─────────────────
export async function getProductByHandle(handle: string) {
  const query = `
    query getProduct($handle: String!) {
      product(handle: $handle) {
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
  if (res.body?.data?.product) {
    return res.body.data.product;
  }
  return null;
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
  return [];
}

// ─── Create a Shopify Checkout ───────────────────────────────────────────────
export async function createCheckout(items: { variantId: string; quantity: number }[]) {
  const query = `
    mutation cartCreate($input: CartInput!) {
      cartCreate(input: $input) {
        cart {
          checkoutUrl
        }
        userErrors {
          field
          message
        }
      }
    }
  `;

  const variables = {
    input: {
      lines: items.map(item => ({
        merchandiseId: item.variantId,
        quantity: item.quantity
      }))
    }
  };

  const res = await shopifyFetch({ query, variables });
  if (res.body?.data?.cartCreate?.cart?.checkoutUrl) {
    return res.body.data.cartCreate.cart.checkoutUrl;
  }
  
  if (res.body?.data?.cartCreate?.userErrors?.length) {
    console.error("Shopify Cart Create Errors:", res.body.data.cartCreate.userErrors);
  }
  
  return null;
}
