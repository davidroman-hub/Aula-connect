import { Head } from "$fresh/runtime.ts";

export default function TestCheckoutSuccess() {
  return (
    <>
      <Head>
        <title>Test - Modal de Éxito</title>
      </Head>

      <div className="min-h-screen bg-gray-100 p-8">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-3xl font-bold mb-8">
            Test Modal de Checkout Exitoso
          </h1>

          <div className="bg-white rounded-lg shadow p-6 mb-8">
            <h2 className="text-xl font-bold mb-4">Instrucciones de Prueba:</h2>
            <ol className="list-decimal list-inside space-y-2 text-gray-700">
              <li>
                Haz clic en el botón "Simular Checkout Exitoso" para ver el
                modal
              </li>
              <li>
                El modal mostrará información de ejemplo de una compra exitosa
              </li>
              <li>
                Puedes cerrar el modal con el botón X o esperando 10 segundos
              </li>
              <li>
                Este modal aparecerá después de que los usuarios regresen de
                Shopify
              </li>
            </ol>
          </div>

          <div id="modal-container">
            {/* El modal se renderizará aquí */}
          </div>

          <div className="text-center">
            <button
              type="button"
              id="show-modal-btn"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-lg"
            >
              🎉 Simular Checkout Exitoso
            </button>
          </div>
        </div>
      </div>

      <script>
        {`
          // Simulación del modal de éxito
          document.getElementById('show-modal-btn').addEventListener('click', function() {
            // Crear el modal dinámicamente
            const modalHtml = \`
              <div class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4" id="success-modal">
                <div class="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
                  <!-- Botón de cerrar -->
                  <div class="flex justify-end mb-4">
                    <button type="button" onclick="closeModal()" class="text-gray-400 hover:text-gray-600 text-2xl" aria-label="Cerrar modal">
                      ×
                    </button>
                  </div>

                  <!-- Icono de éxito con animación -->
                  <div class="text-center">
                    <div class="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce">
                      <svg class="h-8 w-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7"></path>
                      </svg>
                    </div>

                    <!-- Título -->
                    <h2 class="text-2xl font-bold text-gray-900 mb-4">¡Pago Exitoso! 🎉</h2>

                    <!-- Mensaje principal -->
                    <p class="text-gray-600 mb-6">Tu compra se ha procesado correctamente. Te hemos enviado un correo de confirmación.</p>

                    <!-- Detalles de la compra -->
                    <div class="bg-gray-50 rounded-lg p-4 mb-6 text-left">
                      <h3 class="font-semibold text-gray-900 mb-3 text-center">Detalles de tu compra:</h3>
                      
                      <div class="flex justify-between py-1">
                        <span class="text-gray-600">Cliente:</span>
                        <span class="font-medium">Juan Pérez</span>
                      </div>
                      
                      <div class="flex justify-between py-1">
                        <span class="text-gray-600">Email:</span>
                        <span class="font-medium">juan@example.com</span>
                      </div>
                      
                      <div class="flex justify-between py-1">
                        <span class="text-gray-600">Producto:</span>
                        <span class="font-medium">Plan Premium</span>
                      </div>
                      
                      <div class="flex justify-between py-1 border-t pt-2 mt-2">
                        <span class="text-gray-600">Orden #:</span>
                        <span class="font-medium">AC-\${Date.now()}</span>
                      </div>
                    </div>

                    <!-- Información adicional -->
                    <div class="text-sm text-gray-500 mb-6">
                      <p class="mb-2">📧 Revisa tu correo electrónico para los detalles completos.</p>
                      <p>🚀 Tu acceso se activará automáticamente en unos minutos.</p>
                    </div>

                    <!-- Botones de acción -->
                    <div class="space-y-3">
                      <a href="/user-dash" class="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-4 rounded-lg transition duration-200 block">
                        Ir a Mi Dashboard
                      </a>
                      <button type="button" onclick="closeModal()" class="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200">
                        Continuar Explorando
                      </button>
                    </div>

                    <!-- Countdown para auto-cerrar -->
                    <p class="text-xs text-gray-400 mt-4">Este modal se cerrará automáticamente en <span id="countdown">10</span> segundos</p>
                  </div>
                </div>

                <!-- Celebración -->
                <div class="fixed inset-0 pointer-events-none">
                  <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                    <div class="text-6xl animate-pulse">🎉</div>
                  </div>
                </div>
              </div>
            \`;
            
            document.getElementById('modal-container').innerHTML = modalHtml;
            
            // Countdown timer
            let timeLeft = 10;
            const countdownEl = document.getElementById('countdown');
            const timer = setInterval(() => {
              timeLeft--;
              if (countdownEl) countdownEl.textContent = timeLeft;
              
              if (timeLeft <= 0) {
                clearInterval(timer);
                closeModal();
              }
            }, 1000);
            
            // Función global para cerrar modal
            window.closeModal = function() {
              const modal = document.getElementById('success-modal');
              if (modal) {
                modal.remove();
              }
              clearInterval(timer);
            };
          });
        `}
      </script>
    </>
  );
}
