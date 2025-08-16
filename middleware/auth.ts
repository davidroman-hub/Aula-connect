import { verifyJWT } from "../lib/JWT.ts";

export async function requireAdmin(req: Request) {
  const auth = req.headers.get("Authorization");

  // Better debugging for missing or malformed Authorization header
  if (!auth) {
    return new Response("Unauthorized - No token provided", { status: 401 });
  }

  if (!auth.startsWith("Bearer ")) {
    return new Response("Unauthorized - Invalid token format", { status: 401 });
  }

  const token = auth.substring(7).trim(); // Add trim() to remove any whitespace

  if (!token) {
    return new Response("Unauthorized - Empty token", { status: 401 });
  }

  try {
    const payload = await verifyJWT(token);

    if (!payload) {
      return new Response("Forbidden - Invalid token", { status: 403 });
    }

    if (payload.type !== "admin") {
      return new Response("Forbidden - Admin access required", { status: 403 });
    }

    return payload; // datos del usuario
  } catch (error) {
    const errorMessage =
      typeof error === "object" && error !== null && "message" in error
        ? (error as { message?: string }).message
        : String(error);
    return new Response(
      `Forbidden - Token verification failed: ${errorMessage}`,
      {
        status: 403,
      },
    );
  }
}
