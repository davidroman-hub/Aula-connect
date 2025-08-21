import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { createJWT, createRefreshToken } from "../../../lib/JWT.ts";
import { Users } from "../../../models/User.ts";

export const handler: Handlers = {
  async POST(req) {
    const { username, password } = await req.json();
    const user = await Users.findOne({ username });

    if (!user) {
      return new Response("Usuario no encontrado", { status: 404 });
    }

    const valid = () => {
      if (user.password === password) {
        return true;
      }
      return false;
    };

    if (!valid()) {
      return new Response("Contraseña incorrecta", { status: 401 });
    }

    const accessToken = await createJWT(
      user.username,
      user.type,
      user._id,
      user.adminOrg,
    );
    const refreshToken = await createRefreshToken(
      user.username,
      user.type,
      user._id,
      user.adminOrg,
    );

    return new Response(
      JSON.stringify({
        accessToken,
        refreshToken,
        // Mantener compatibilidad con código existente
        token: accessToken,
      }),
      {
        headers: { "Content-Type": "application/json" },
      },
    );
  },
};
