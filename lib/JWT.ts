import {
  create,
  getNumericDate,
  Header,
  Payload,
  verify,
} from "https://deno.land/x/djwt@v3.0.2/mod.ts";

// Use a fixed secret key instead of generating a new one each time
const SECRET_KEY = "your-super-secret-jwt-key-change-this-in-production";

const key = await crypto.subtle.importKey(
  "raw",
  new TextEncoder().encode(SECRET_KEY),
  { name: "HMAC", hash: "SHA-256" },
  false,
  ["sign", "verify"],
);

// Crear un access token (corta duración)
export async function createJWT(
  username: string,
  type: string,
  id: { $oid: string },
  adminOrg: any,
) {
  const payload: Payload = {
    iss: "fresh-app",
    username,
    type,
    id,
    adminOrg,
    exp: getNumericDate(15 * 60), // Expira en 15 minutos
  };
  return await create({ alg: "HS256", typ: "JWT" } as Header, payload, key);
}

// Crear un refresh token (larga duración)
export async function createRefreshToken(
  username: string,
  type: string,
  id: { $oid: string },
  adminOrg: any,
) {
  const payload: Payload = {
    iss: "fresh-app",
    username,
    type,
    id,
    tokenType: "refresh",
    adminOrg,
    exp: getNumericDate(7 * 24 * 60 * 60), // Expira en 7 días
  };
  return await create({ alg: "HS256", typ: "JWT" } as Header, payload, key);
}

// Verificar un token
export async function verifyJWT(token: string) {
  console.log("Verifying JWT token...");
  try {
    const payload = await verify(token, key);
    console.log("JWT verification successful. Payload:", payload);

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      console.log("JWT token has expired");
      return null;
    }

    return payload;
  } catch (error) {
    console.log("JWT verification failed. Error:", error);
    return null;
  }
}

// Verificar un refresh token específicamente
export async function verifyRefreshToken(token: string) {
  console.log("Verifying refresh token...");
  try {
    const payload = await verify(token, key);
    console.log("Refresh token verification successful. Payload:", payload);

    // Check if token is expired
    if (payload.exp && payload.exp < Date.now() / 1000) {
      console.log("Refresh token has expired");
      return null;
    }

    // Verificar que sea un refresh token
    if (payload.tokenType !== "refresh") {
      console.log("Token is not a refresh token");
      return null;
    }

    return payload;
  } catch (error) {
    console.log("Refresh token verification failed. Error:", error);
    return null;
  }
}
