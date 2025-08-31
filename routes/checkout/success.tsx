import { Head } from "$fresh/runtime.ts";
import { Handlers, PageProps } from "$fresh/server.ts";

interface CheckoutSuccessData {
  customerName?: string;
  email?: string;
  orderNumber?: string;
  amount?: string;
  currency?: string;
}

export const handler: Handlers<CheckoutSuccessData> = {
  GET(req, ctx) {
    const url = new URL(req.url);

    // Extraer parámetros de la URL que Shopify puede enviar
    const customerName = url.searchParams.get("customer_name") || "";
    const email = url.searchParams.get("email") || "";
    const orderNumber = url.searchParams.get("order_number") || "";
    const amount = url.searchParams.get("amount") || "";
    const currency = url.searchParams.get("currency") || "MXN";

    return ctx.render({
      customerName,
      email,
      orderNumber,
      amount,
      currency,
    });
  },
};

export default function CheckoutSuccess(
  { data }: PageProps<CheckoutSuccessData>,
) {
  return (
    <>
      <Head>
        <title>¡Compra Exitosa! - AulaConnect</title>
        <meta
          name="description"
          content="Tu compra se ha procesado exitosamente"
        />
      </Head>

      <div className="min-h-screen bg-gray-50 flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-md w-full space-y-8">
          {/* Modal de éxito */}
          <div className="bg-white rounded-xl shadow-xl p-8 text-center">
            {/* Icono de éxito */}
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6">
              <svg
                className="h-8 w-8 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M5 13l4 4L19 7"
                >
                </path>
              </svg>
            </div>

            {/* Título */}
            <h1 className="text-2xl font-bold text-gray-900 mb-4">
              ¡Compra Exitosa!
            </h1>

            {/* Mensaje principal */}
            <p className="text-gray-600 mb-6">
              Tu pago se ha procesado correctamente. Recibirás un correo de
              confirmación en breve.
            </p>

            {/* Detalles de la compra */}
            <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
              <h3 className="font-semibold text-gray-900 mb-3">
                Detalles de tu compra:
              </h3>

              {data.customerName && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Cliente:</span>
                  <span className="font-medium" data-customer-name>
                    {data.customerName}
                  </span>
                </div>
              )}

              {data.email && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Email:</span>
                  <span className="font-medium" data-email>{data.email}</span>
                </div>
              )}

              {data.orderNumber && (
                <div className="flex justify-between py-1">
                  <span className="text-gray-600">Orden #:</span>
                  <span className="font-medium">{data.orderNumber}</span>
                </div>
              )}

              {data.amount && (
                <div className="flex justify-between py-1 border-t pt-2 mt-2">
                  <span className="text-gray-600">Total:</span>
                  <span className="font-bold text-lg">
                    ${data.amount} {data.currency}
                  </span>
                </div>
              )}
            </div>

            {/* Información adicional */}
            <div className="text-sm text-gray-500 mb-6">
              <p className="mb-2">
                📧 Revisa tu correo electrónico para obtener los detalles
                completos de tu compra.
              </p>
              <p>
                🔐 Tu acceso al curso se activará automáticamente en los
                próximos minutos.
              </p>
            </div>

            {/* Botones de acción */}
            <div className="space-y-3">
              <a
                href="/user-dash"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 block"
              >
                Ir a Mi Dashboard
              </a>

              <a
                href="/"
                className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200 block"
              >
                Volver al Inicio
              </a>
            </div>
          </div>

          {/* Información de soporte */}
          <div className="text-center">
            <p className="text-sm text-gray-500">
              ¿Necesitas ayuda?{" "}
              <a href="/contact" className="text-blue-600 hover:text-blue-500">
                Contáctanos
              </a>
            </p>
          </div>
        </div>
      </div>

      {/* Script para mostrar animación o notificación */}
      <script>
        {`
          // Cargar información del checkout desde localStorage como fallback
          window.addEventListener('DOMContentLoaded', function() {
            const checkoutInfo = localStorage.getItem('checkout_info');
            if (checkoutInfo && !document.querySelector('[data-customer-name]')?.textContent) {
              try {
                const info = JSON.parse(checkoutInfo);
                console.log('Información de checkout cargada:', info);
                
                // Si no hay parámetros de URL, usar localStorage
                const customerNameEl = document.querySelector('[data-customer-name]');
                const emailEl = document.querySelector('[data-email]');
                
                if (customerNameEl && info.customerName) {
                  customerNameEl.textContent = info.customerName;
                }
                if (emailEl && info.email) {
                  emailEl.textContent = info.email;
                }
                
                // Limpiar localStorage después de usar
                localStorage.removeItem('checkout_info');
              } catch (e) {
                console.error('Error al cargar información del checkout:', e);
              }
            }
          });
          
          // Mostrar una notificación de bienvenida después de 1 segundo
          setTimeout(() => {
            console.log('¡Bienvenido a AulaConnect!');
            
            // Opcional: mostrar confetti
            if (typeof confetti === 'function') {
              confetti({
                particleCount: 100,
                spread: 70,
                origin: { y: 0.6 }
              });
            }
          }, 1000);
          
          // Limpiar parámetros de la URL para evitar recargas accidentales
          if (window.history && window.history.replaceState) {
            setTimeout(() => {
              window.history.replaceState({}, document.title, window.location.pathname);
            }, 2000);
          }
        `}
      </script>
    </>
  );
}
