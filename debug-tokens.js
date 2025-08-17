// Script de debug para testear el sistema de refresh tokens
// Ejecutar en la consola del navegador

console.log("=== TOKEN REFRESH DEBUG SCRIPT ===");

async function debugTokenSystem() {
  console.log("1. Verificando tokens en localStorage...");
  const jwtToken = localStorage.getItem("jwtToken");
  const refreshToken = localStorage.getItem("refreshToken");

  console.log("JWT Token:", jwtToken ? "EXISTS" : "NOT FOUND");
  console.log("Refresh Token:", refreshToken ? "EXISTS" : "NOT FOUND");

  if (jwtToken) {
    try {
      const tokenParts = jwtToken.split(".");
      const payload = JSON.parse(atob(tokenParts[1]));
      const currentTime = Date.now() / 1000;
      const timeUntilExpiry = payload.exp - currentTime;

      console.log("Token expira en:", Math.floor(timeUntilExpiry), "segundos");
      console.log(
        "Token expira en:",
        Math.floor(timeUntilExpiry / 60),
        "minutos",
      );

      if (timeUntilExpiry < 0) {
        console.log("⚠️ TOKEN YA EXPIRADO");
      } else if (timeUntilExpiry < 5 * 60) {
        console.log("⚠️ TOKEN EXPIRA PRONTO (menos de 5 minutos)");
      } else {
        console.log("✅ TOKEN VÁLIDO");
      }
    } catch (error) {
      console.error("Error decodificando token:", error);
    }
  }

  if (refreshToken) {
    console.log("2. Testeando refresh token...");
    try {
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
        console.log("✅ Refresh exitoso!");
        console.log(
          "Nuevo access token:",
          data.accessToken ? "RECIBIDO" : "NO RECIBIDO",
        );
        console.log(
          "Nuevo refresh token:",
          data.refreshToken ? "RECIBIDO" : "NO RECIBIDO",
        );

        // Opcional: actualizar tokens
        if (data.accessToken) {
          localStorage.setItem("jwtToken", data.accessToken);
          console.log("✅ Access token actualizado en localStorage");
        }
        if (data.refreshToken) {
          localStorage.setItem("refreshToken", data.refreshToken);
          console.log("✅ Refresh token actualizado en localStorage");
        }
      } else {
        console.error(
          "❌ Error en refresh:",
          response.status,
          response.statusText,
        );
        const errorText = await response.text();
        console.error("Error details:", errorText);
      }
    } catch (error) {
      console.error("❌ Error en request de refresh:", error);
    }
  }
}

// Ejecutar el debug
debugTokenSystem();

// Función para limpiar todos los tokens (útil para testing)
window.clearAllTokens = function () {
  localStorage.removeItem("jwtToken");
  localStorage.removeItem("refreshToken");
  localStorage.removeItem("auth");
  localStorage.removeItem("user");
  localStorage.removeItem("userInfo");
  document.cookie = "jwtToken=; path=/; max-age=0; SameSite=Strict";
  console.log("🧹 Todos los tokens limpiados");
};

console.log("💡 Tip: Ejecuta clearAllTokens() para limpiar todos los tokens");
console.log("💡 Tip: Ejecuta debugTokenSystem() para re-ejecutar el debug");
