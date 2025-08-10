import { Handlers, STATUS_CODE } from "$fresh/server.ts";
import { createJWT } from "../../../lib/JWT.ts";
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

    const token = await createJWT(user.username);

    return new Response(JSON.stringify({ token }), {
      headers: { "Content-Type": "application/json" },
    });
  },
};
