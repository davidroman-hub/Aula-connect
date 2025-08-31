import { Handlers } from "$fresh/server.ts";
import { Product } from "../../types/product.ts";

export const handler: Handlers<Product[]> = {
  async GET(_req) {
    try {
      const shopifyDomain = Deno.env.get("SHOPIFY_DOMAIN");
      const storefrontToken = Deno.env.get("SHOPIFY_STOREFRONT_TOKEN");

      if (!shopifyDomain || !storefrontToken) {
        console.error("Missing Shopify environment variables");
        return new Response(
          JSON.stringify({ error: "Missing Shopify configuration" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const query = `
        {
          products(first: 20) {
            edges {
              node {
                id
                title
                description
                handle
                images(first: 1) {
                  edges {
                    node {
                      src
                      altText
                    }
                  }
                }
                variants(first: 1) {
                  edges {
                    node {
                      id
                      price {
                        amount
                        currencyCode
                      }
                      availableForSale
                    }
                  }
                }
              }
            }
          }
        }
      `;

      const res = await fetch(
        `https://${shopifyDomain}/api/2024-07/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontToken,
          },
          body: JSON.stringify({ query }),
        },
      );

      if (!res.ok) {
        console.error(`Shopify API error: ${res.status} ${res.statusText}`);
        return new Response(
          JSON.stringify({ error: "Shopify API error" }),
          {
            status: res.status,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const data = await res.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        return new Response(
          JSON.stringify({ error: "GraphQL errors", details: data.errors }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const products: Product[] = data.data?.products?.edges?.map((edge: {
        node: {
          id: string;
          title: string;
          description: string;
          handle: string;
          images?: {
            edges?: Array<{
              node: {
                src: string;
                altText?: string;
              };
            }>;
          };
          variants?: {
            edges?: Array<{
              node: {
                id: string;
                price: {
                  amount: string;
                  currencyCode: string;
                };
                availableForSale: boolean;
              };
            }>;
          };
        };
      }) => {
        const node = edge.node;
        const variant = node.variants?.edges?.[0]?.node;

        return {
          id: node.id,
          variantId: variant?.id || "",
          title: node.title || "Sin título",
          description: node.description || "Sin descripción",
          handle: node.handle,
          image: node.images?.edges?.[0]?.node?.src || "",
          price: variant?.price?.amount || "0",
        };
      }) || [];

      return new Response(JSON.stringify(products), {
        headers: { "Content-Type": "application/json" },
      });
    } catch (error) {
      console.error("Error fetching products from Shopify:", error);
      return new Response(
        JSON.stringify({ error: "Internal server error" }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
