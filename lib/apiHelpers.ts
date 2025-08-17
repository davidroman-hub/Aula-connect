import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { refreshTokenIfNeeded } from "./tokenManager.ts";

// Función helper para hacer requests autenticadas con refresh automático
export async function authenticatedRequest(config: {
  method: "GET" | "POST" | "PUT" | "DELETE" | "PATCH";
  url: string;
  // deno-lint-ignore no-explicit-any
  data?: any;
  headers?: Record<string, string>;
}) {
  try {
    // Asegurar que el token esté válido
    await refreshTokenIfNeeded();

    // Obtener el token actualizado
    const token = localStorage.getItem("jwtToken");

    if (!token) {
      throw new Error("No authentication token available");
    }

    // Configurar headers con el token
    const authHeaders = {
      Authorization: `Bearer ${token}`,
      ...config.headers,
    };

    // Hacer la request usando axiod
    const response = await axiod({
      method: config.method,
      url: config.url,
      data: config.data,
      headers: authHeaders,
    });

    return response;
  } catch (error) {
    console.error("Error in authenticated request:", error);
    throw error;
  }
}

// Helper específico para GET requests
export function authenticatedGet(
  url: string,
  headers?: Record<string, string>,
) {
  return authenticatedRequest({ method: "GET", url, headers });
}

// Helper específico para POST requests
// deno-lint-ignore no-explicit-any
export function authenticatedPost(
  url: string,
  data?: any,
  headers?: Record<string, string>,
) {
  return authenticatedRequest({ method: "POST", url, data, headers });
}

// Helper específico para PUT requests
// deno-lint-ignore no-explicit-any
export function authenticatedPut(
  url: string,
  data?: any,
  headers?: Record<string, string>,
) {
  return authenticatedRequest({ method: "PUT", url, data, headers });
}

// Helper específico para DELETE requests
export function authenticatedDelete(
  url: string,
  headers?: Record<string, string>,
) {
  return authenticatedRequest({ method: "DELETE", url, headers });
}

// Helper específico para PATCH requests
// deno-lint-ignore no-explicit-any
export function authenticatedPatch(
  url: string,
  data?: any,
  headers?: Record<string, string>,
) {
  return authenticatedRequest({ method: "PATCH", url, data, headers });
}
