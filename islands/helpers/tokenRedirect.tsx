import { useEffect } from "preact/hooks";

interface TokenRedirectProps {
  readonly targetUrl: string;
}

export default function TokenRedirect({ targetUrl }: TokenRedirectProps) {
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Hacer una solicitud con el token en el header
      fetch(targetUrl, {
        headers: {
          "Authorization": `Bearer ${token}`,
          "Cookie": `jwtToken=${token}`,
        },
        credentials: "include",
      }).then((response) => {
        if (response.ok) {
          // Redirigir a la página con las cookies establecidas
          globalThis.location.href = targetUrl;
        } else {
          // Si falla, redirigir al login
          globalThis.location.href = "/login";
        }
      }).catch(() => {
        globalThis.location.href = "/login";
      });
    } else {
      globalThis.location.href = "/login";
    }
  }, [targetUrl]);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
        </div>
        <p className="text-gray-600">Verificando autenticación...</p>
      </div>
    </div>
  );
}
