import { useEffect } from "preact/hooks";
import { verifyTokensOnPageLoad } from "../../lib/tokenManager.ts";

export default function TokenInitializer() {
  useEffect(() => {
    // Por ahora, no configurar interceptores para evitar bucles infinitos
    // setupTokenRefreshInterceptor();

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
