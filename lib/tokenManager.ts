import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

// Función para refrescar automáticamente el token
export async function refreshTokenIfNeeded(): Promise<boolean> {
  try {
    const currentToken = localStorage.getItem("jwtToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!currentToken || !refreshToken) {
      console.log("No tokens found in localStorage");
      return false;
    }

    // Verificar si el token actual está próximo a expirar
    // Decodificar sin verificar (solo para obtener la fecha de expiración)
    try {
      const tokenParts = currentToken.split(".");
      if (tokenParts.length !== 3) {
        throw new Error("Invalid token format");
      }

      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = payload.exp - currentTime;

      // Si el token expira en menos de 5 minutos, refrescarlo
      if (timeUntilExpiry > 5 * 60) {
        console.log("Token still valid, no refresh needed");
        return true;
      }

      console.log("Token expires soon, attempting refresh...");
    } catch (error) {
      console.log("Error decoding token, attempting refresh...", error);
    }

    // Intentar refrescar el token
    const response = await axiod.post("/api/jwt/refresh", {
      refreshToken: refreshToken,
    });

    if (response.status === 200) {
      const { accessToken, refreshToken: newRefreshToken } = response.data;

      // Actualizar localStorage
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      // Actualizar cookie para compatibilidad con servidor
      document.cookie =
        `jwtToken=${accessToken}; path=/; max-age=86400; SameSite=Strict`;

      console.log("Token refreshed successfully");
      return true;
    } else {
      console.log("Failed to refresh token");
      return false;
    }
  } catch (error) {
    console.error("Error refreshing token:", error);
    return false;
  }
}

// Función para limpiar tokens cuando expiran
export function clearTokens() {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  localStorage.removeItem("userInfo");

  // Limpiar cookie
  document.cookie = "jwtToken=; path=/; max-age=0; SameSite=Strict";

  console.log("Tokens cleared");
}

// Función para configurar un interceptor que refresque tokens automáticamente
export function setupTokenRefreshInterceptor() {
  // Configurar interceptor para requests
  axiod.interceptors.request.use(async (config) => {
    await refreshTokenIfNeeded();

    // Agregar token actualizado al header
    const token = localStorage.getItem("jwtToken");
    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
  });

  // Nota: Los interceptores de response con axiod tienen limitaciones
  // Es mejor manejar los errores 401 directamente en cada request
  console.log("Token refresh interceptor configured");
}

// Función para verificar tokens al cargar la página
export async function verifyTokensOnPageLoad(): Promise<boolean> {
  const success = await refreshTokenIfNeeded();

  if (!success) {
    clearTokens();
    return false;
  }

  return true;
}
