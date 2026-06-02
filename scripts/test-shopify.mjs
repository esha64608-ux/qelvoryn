const domain = process.env.NEXT_PUBLIC_SHOPIFY_STORE_DOMAIN;
const storefrontAccessToken = process.env.NEXT_PUBLIC_SHOPIFY_STOREFRONT_ACCESS_TOKEN;

async function testShopifyFetch() {
  const query = `
    {
      products(first: 5) {
        edges {
          node {
            id
            title
            handle
            priceRange {
              minVariantPrice {
                amount
                currencyCode
              }
            }
          }
        }
      }
    }
  `;

  const endpoint = `https://${domain}/api/2024-01/graphql.json`;

  try {
    const response = await fetch(endpoint, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'X-Shopify-Storefront-Access-Token': storefrontAccessToken,
      },
      body: JSON.stringify({ query }),
    });

    const { data, errors } = await response.json();

    if (errors) {
      console.error('GraphQL Errors:', JSON.stringify(errors, null, 2));
      return;
    }

    console.log('Successfully fetched products:');
    console.log(JSON.stringify(data.products.edges, null, 2));
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

testShopifyFetch();
