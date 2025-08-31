import { Handlers } from "$fresh/server.ts";

interface CheckoutData {
  variantId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const checkoutData: CheckoutData = await req.json();

      const shopifyDomain = Deno.env.get("SHOPIFY_DOMAIN");
      const storefrontToken = Deno.env.get("SHOPIFY_STOREFRONT_TOKEN");

      if (!shopifyDomain || !storefrontToken) {
        return new Response(
          JSON.stringify({ error: "Missing Shopify configuration" }),
          {
            status: 500,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      // Crear cart en Shopify (nueva API)
      const cartCreateMutation = `
        mutation cartCreate($input: CartInput!) {
          cartCreate(input: $input) {
            cart {
              id
              checkoutUrl
              totalQuantity
              cost {
                totalAmount {
                  amount
                  currencyCode
                }
              }
              lines(first: 10) {
                edges {
                  node {
                    id
                    quantity
                    merchandise {
                      ... on ProductVariant {
                        id
                        title
                        product {
                          title
                        }
                      }
                    }
                  }
                }
              }
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
          lines: [
            {
              merchandiseId: checkoutData.variantId,
              quantity: 1,
            },
          ],
          buyerIdentity: {
            email: checkoutData.email,
          },
        },
      };

      const response = await fetch(
        `https://${shopifyDomain}/api/2024-07/graphql.json`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "X-Shopify-Storefront-Access-Token": storefrontToken,
          },
          body: JSON.stringify({
            query: cartCreateMutation,
            variables: variables,
          }),
        },
      );

      if (!response.ok) {
        throw new Error(`Shopify API error: ${response.status}`);
      }

      const data = await response.json();

      if (data.errors) {
        console.error("GraphQL errors:", data.errors);
        return new Response(
          JSON.stringify({
            error: "Error creating cart",
            details: data.errors,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      const cart = data.data.cartCreate.cart;
      const userErrors = data.data.cartCreate.userErrors;

      if (userErrors && userErrors.length > 0) {
        return new Response(
          JSON.stringify({
            error: "Cart validation errors",
            details: userErrors,
          }),
          {
            status: 400,
            headers: { "Content-Type": "application/json" },
          },
        );
      }

      return new Response(
        JSON.stringify({
          success: true,
          checkoutUrl: cart.checkoutUrl,
          cartId: cart.id,
          total: cart.cost.totalAmount,
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error creating cart:", error);
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
