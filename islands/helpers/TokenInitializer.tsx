import { useEffect } from "preact/hooks";
import {
  setupTokenRefreshInterceptor,
  verifyTokensOnPageLoad,
} from "../../lib/tokenManager.ts";

export default function TokenInitializer() {
  useEffect(() => {
    // Configurar interceptores una sola vez al cargar la app
    setupTokenRefreshInterceptor();

    // Verificar tokens al cargar la página
    const initTokens = async () => {
      const isValid = await verifyTokensOnPageLoad();
      if (!isValid) {
        console.log("Tokens invalid or expired on page load");
      }
    };

    initTokens();
  }, []);

  return null; // Este componente no renderiza nada
}
