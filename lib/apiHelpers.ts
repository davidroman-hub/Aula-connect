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
      "Content-Type": "application/json",
      ...config.headers,
    };

    // Preparar opciones para fetch
    const fetchOptions: RequestInit = {
      method: config.method,
      headers: authHeaders,
    };

    // Agregar body si hay data
    if (
      config.data &&
      (config.method === "POST" || config.method === "PUT" ||
        config.method === "PATCH")
    ) {
      fetchOptions.body = JSON.stringify(config.data);
    }

    // Hacer la request usando fetch (sin interceptores)
    const response = await fetch(config.url, fetchOptions);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    // Intentar parsear como JSON, si falla devolver texto
    try {
      const data = await response.json();
      return { data, status: response.status };
    } catch {
      const data = await response.text();
      return { data, status: response.status };
    }
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
