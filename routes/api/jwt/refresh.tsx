import { Handlers } from "$fresh/server.ts";
import {
  createJWT,
  createRefreshToken,
  verifyRefreshToken,
} from "../../../lib/JWT.ts";

export const handler: Handlers = {
  async POST(req) {
    try {
      const { refreshToken } = await req.json();

      if (!refreshToken) {
        return new Response("Refresh token is required", { status: 400 });
      }

      // Verificar el refresh token
      const payload = await verifyRefreshToken(refreshToken);

      if (!payload?.username || !payload?.type) {
        return new Response("Invalid or expired refresh token", {
          status: 401,
        });
      }

      // Crear nuevos tokens
      const newAccessToken = await createJWT(
        payload.username as string,
        payload.type as string,
        payload.id as { $oid: string },
      );
      const newRefreshToken = await createRefreshToken(
        payload.username as string,
        payload.type as string,
        payload.id as { $oid: string },
      );

      return new Response(
        JSON.stringify({
          accessToken: newAccessToken,
          refreshToken: newRefreshToken,
          // Mantener compatibilidad
          token: newAccessToken,
        }),
        {
          headers: { "Content-Type": "application/json" },
          status: 200,
        },
      );
    } catch (error) {
      console.error("Error refreshing token:", error);
      return new Response("Internal server error", { status: 500 });
    }
  },
};
