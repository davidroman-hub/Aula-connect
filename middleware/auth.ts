import { verifyJWT } from "../lib/JWT.ts";

export async function requireAdmin(req: Request) {
  const auth = req.headers.get("Authorization");

  // Better debugging for missing or malformed Authorization header
  if (!auth) {
    console.log("No Authorization header found");
    return new Response("Unauthorized - No token provided", { status: 401 });
  }

  if (!auth.startsWith("Bearer ")) {
    console.log("Invalid Authorization format:", auth);
    return new Response("Unauthorized - Invalid token format", { status: 401 });
  }

  const token = auth.substring(7).trim(); // Add trim() to remove any whitespace

  if (!token) {
    console.log("Empty token after Bearer");
    return new Response("Unauthorized - Empty token", { status: 401 });
  }

  try {
    const payload = await verifyJWT(token);

    if (!payload) {
      console.log("JWT verification failed - invalid token");
      return new Response("Forbidden - Invalid token", { status: 403 });
    }

    if (payload.type !== "admin") {
      console.log("User is not admin. User type:", payload.type);
      return new Response("Forbidden - Admin access required", { status: 403 });
    }

    return payload; // datos del usuario
  } catch (error) {
    console.log("JWT verification error:", error);
    return new Response("Forbidden - Token verification failed", {
      status: 403,
    });
  }
}
