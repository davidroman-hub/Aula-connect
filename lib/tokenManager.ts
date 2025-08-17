import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

// Variables para prevenir bucles infinitos de refresh
let isRefreshing = false;
let refreshPromise: Promise<boolean> | null = null;
let lastRefreshTime = 0;
const REFRESH_COOLDOWN = 10000; // 10 segundos de cooldown entre refreshes

// Función para refrescar automáticamente el token
export async function refreshTokenIfNeeded(): Promise<boolean> {
  const now = Date.now();

  // Si se intentó refrescar hace menos de 10 segundos, no intentar de nuevo
  if (now - lastRefreshTime < REFRESH_COOLDOWN) {
    console.log("Refresh cooldown active, skipping refresh");
    return true;
  }

  // Si ya se está refrescando, esperar a que termine
  if (isRefreshing && refreshPromise) {
    console.log("Refresh already in progress, waiting...");
    return await refreshPromise;
  }

  try {
    const currentToken = localStorage.getItem("jwtToken");
    const refreshToken = localStorage.getItem("refreshToken");

    if (!currentToken || !refreshToken) {
      console.log("No tokens found in localStorage");
      return false;
    }

    // Verificar si el token actual está próximo a expirar
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
        console.log(
          `Token still valid for ${
            Math.floor(timeUntilExpiry / 60)
          } minutes, no refresh needed`,
        );
        return true;
      }

      console.log(
        `Token expires in ${
          Math.floor(timeUntilExpiry)
        } seconds, attempting refresh...`,
      );
    } catch (error) {
      console.log("Error decoding token, attempting refresh...", error);
    }

    // Marcar que se está refrescando y crear la promesa
    isRefreshing = true;
    lastRefreshTime = now;
    refreshPromise = performTokenRefresh(refreshToken);

    const result = await refreshPromise;

    // Limpiar el estado de refresh
    isRefreshing = false;
    refreshPromise = null;

    return result;
  } catch (error) {
    console.error("Error refreshing token:", error);
    isRefreshing = false;
    refreshPromise = null;
    return false;
  }
}

// Función separada para realizar el refresh real
async function performTokenRefresh(refreshToken: string): Promise<boolean> {
  try {
    // Hacer la request de refresh SIN usar el interceptor para evitar bucles
    const response = await fetch("/api/jwt/refresh", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        refreshToken: refreshToken,
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const { accessToken, refreshToken: newRefreshToken } = data;

      // Actualizar localStorage
      localStorage.setItem("jwtToken", accessToken);
      localStorage.setItem("refreshToken", newRefreshToken);

      // Actualizar cookie para compatibilidad con servidor
      document.cookie =
        `jwtToken=${accessToken}; path=/; max-age=86400; SameSite=Strict`;

      console.log("Token refreshed successfully");
      return true;
    } else {
      console.log("Failed to refresh token, status:", response.status);
      return false;
    }
  } catch (error) {
    console.error("Error in performTokenRefresh:", error);
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
    // NO refrescar tokens para requests de refresh para evitar bucles infinitos
    if (config.url?.includes("/api/jwt/refresh")) {
      console.log("Skipping token refresh for refresh endpoint");
      return config;
    }

    // Solo refrescar si no se está ya refrescando
    if (!isRefreshing) {
      await refreshTokenIfNeeded();
    }

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
