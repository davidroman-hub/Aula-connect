import { useEffect } from "preact/hooks";

export default function AuthRedirect() {
  useEffect(() => {
    const token = localStorage.getItem("jwtToken");
    if (token) {
      // Enviar el token al servidor para establecer la cookie
      fetch("/api/auth/set-cookie", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ token }),
      }).then((response) => {
        if (response.ok) {
          // El servidor ya redirigirá automáticamente
          return;
        } else {
          globalThis.location.href = "/login";
        }
      }).catch(() => {
        globalThis.location.href = "/login";
      });
    } else {
      globalThis.location.href = "/login";
    }
  }, []);

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
