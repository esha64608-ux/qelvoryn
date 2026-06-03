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
      body: JSON.stringify({
        query,
        variables,
      }),
      next: { revalidate: 60 },
    });

    const body = await result.json();

    if (body.errors) {
      throw body.errors[0];
    }

    return {
      status: result.status,
      body,
    };
  } catch (error) {
    console.error("Error fetching from Shopify Storefront API:", error);
    // Return a failed state so we can fallback to mock data
    return {
      status: 500,
      body: { data: null, error: (error as Error).message },
    };
  }
}

export async function getProducts() {
  const query = `
    {
      products(first: 4) {
        edges {
          node {
            id
            title
            handle
            description
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
            images(first: 1) {
              edges {
                node {
                  url
                  altText
                  width
                  height
                }
              }
            }
          }
        }
      }
    }
  `;

  const res = await shopifyFetch({ query });
  
  if (res.body?.data?.products?.edges) {
      return res.body.data.products.edges.map((edge: any) => edge.node);
  }

  // Fallback mock data in case API is unavailable or returns NOT_FOUND
  return [
    {
      id: "1",
      title: "The Minimalist Planner",
      handle: "minimalist-planner",
      description: "Organize your life with our premium digital planner.",
      priceRange: { minVariantPrice: { amount: "19.99", currencyCode: "USD" } },
      images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&q=80&w=800", altText: "Planner" } }] }
    },
    {
      id: "2",
      title: "Brand Strategy Template",
      handle: "brand-strategy",
      description: "A complete framework for modern brands.",
      priceRange: { minVariantPrice: { amount: "29.99", currencyCode: "USD" } },
      images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1586281380349-632531db7ed4?auto=format&fit=crop&q=80&w=800", altText: "Template" } }] }
    },
    {
      id: "3",
      title: "Social Media Kit",
      handle: "social-media-kit",
      description: "Boost your online presence elegantly.",
      priceRange: { minVariantPrice: { amount: "24.99", currencyCode: "USD" } },
      images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1611162616475-46b635cb6868?auto=format&fit=crop&q=80&w=800", altText: "Social Kit" } }] }
    },
    {
      id: "4",
      title: "Notion Life OS",
      handle: "notion-life-os",
      description: "The ultimate productivity system.",
      priceRange: { minVariantPrice: { amount: "39.99", currencyCode: "USD" } },
      images: { edges: [{ node: { url: "https://images.unsplash.com/photo-1600861194942-f883de0dfe96?auto=format&fit=crop&q=80&w=800", altText: "Notion" } }] }
    }
  ];
}
