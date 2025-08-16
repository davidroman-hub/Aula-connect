import { Handlers } from "$fresh/server.ts";
import { verify } from "https://deno.land/x/djwt@v2.9.1/mod.ts";

export const handler: Handlers = {
  async POST(req, _ctx) {
    const { token } = await req.json();

    if (!token) {
      return new Response("Token required", { status: 400 });
    }

    try {
      const key = await crypto.subtle.importKey(
        "raw",
        new TextEncoder().encode("your-secret-key"),
        { name: "HMAC", hash: "SHA-256" },
        false,
        ["verify"],
      );

      const payload = await verify(token, key);

      if (!payload) {
        return new Response("Invalid token", { status: 401 });
      }

      // Establecer la cookie y redirigir
      return new Response("", {
        status: 302,
        headers: {
          Location: "/user-dash",
          "Set-Cookie":
            `jwtToken=${token}; path=/; max-age=86400; SameSite=Strict`,
        },
      });
    } catch {
      return new Response("Invalid token", { status: 401 });
    }
  },
};
