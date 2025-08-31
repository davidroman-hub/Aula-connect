import { Handlers } from "$fresh/server.ts";

interface SimulateCheckoutData {
  variantId: string;
  email: string;
  firstName: string;
  lastName: string;
  phone?: string;
}

export const handler: Handlers = {
  async POST(req) {
    try {
      const checkoutData: SimulateCheckoutData = await req.json();

      // Simular checkout para desarrollo cuando Shopify está protegido por contraseña
      console.log("🛒 Checkout simulado:", {
        timestamp: new Date().toISOString(),
        variantId: checkoutData.variantId,
        customer: {
          email: checkoutData.email,
          firstName: checkoutData.firstName,
          lastName: checkoutData.lastName,
          phone: checkoutData.phone,
        },
      });

      // Simular respuesta exitosa
      return new Response(
        JSON.stringify({
          success: true,
          simulated: true,
          message: "Checkout simulado - Tienda en modo desarrollo",
          details: {
            orderId: `SIM-${Date.now()}`,
            customer: `${checkoutData.firstName} ${checkoutData.lastName}`,
            email: checkoutData.email,
            variantId: checkoutData.variantId,
            status: "simulated",
            timestamp: new Date().toISOString(),
          },
        }),
        {
          headers: { "Content-Type": "application/json" },
        },
      );
    } catch (error) {
      console.error("Error en checkout simulado:", error);
      return new Response(
        JSON.stringify({
          success: false,
          error: "Error en simulación de checkout",
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json" },
        },
      );
    }
  },
};
