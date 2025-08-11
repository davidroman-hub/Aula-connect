import {
  create,
  getNumericDate,
  Header,
  Payload,
  verify,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";

const key = await crypto.subtle.generateKey(
  { name: "HMAC", hash: "SHA-256" },
  true,
  ["sign", "verify"],
);

// Crear un token
export async function createJWT(username: string, type: string) {
  const payload: Payload = {
    iss: "fresh-app",
    username,
    type,
    exp: getNumericDate(60 * 60), // Expira en 1 hora
  };
  return await create({ alg: "HS256", typ: "JWT" } as Header, payload, key);
}

// Verificar un token
export async function verifyJWT(token: string) {
  try {
    const payload = await verify(token, key);
    return payload;
  } catch {
    return null;
  }
}
