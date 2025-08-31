import { useEffect, useState } from "preact/hooks";

interface CheckoutSuccessModalProps {
  isOpen: boolean;
  onClose: () => void;
  customerName?: string;
  email?: string;
  orderNumber?: string;
  product?: string;
}

export default function CheckoutSuccessModal({
  isOpen,
  onClose,
  customerName,
  email,
  orderNumber,
  product,
}: CheckoutSuccessModalProps) {
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    if (isOpen) {
      setShowConfetti(true);
      // Auto-cerrar el modal después de 10 segundos
      const timer = setTimeout(() => {
        onClose();
      }, 10000);

      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl max-w-md w-full p-6 transform transition-all">
        {/* Botón de cerrar */}
        <div className="flex justify-end mb-4">
          <button
            type="button"
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 text-2xl"
            aria-label="Cerrar modal"
          >
            ×
          </button>
        </div>

        {/* Icono de éxito con animación */}
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-green-100 mb-6 animate-bounce">
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
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            ¡Pago Exitoso! 🎉
          </h2>

          {/* Mensaje principal */}
          <p className="text-gray-600 mb-6">
            Tu compra se ha procesado correctamente. Te hemos enviado un correo
            de confirmación.
          </p>

          {/* Detalles de la compra */}
          <div className="bg-gray-50 rounded-lg p-4 mb-6 text-left">
            <h3 className="font-semibold text-gray-900 mb-3 text-center">
              Detalles de tu compra:
            </h3>

            {customerName && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Cliente:</span>
                <span className="font-medium">{customerName}</span>
              </div>
            )}

            {email && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Email:</span>
                <span className="font-medium">{email}</span>
              </div>
            )}

            {product && (
              <div className="flex justify-between py-1">
                <span className="text-gray-600">Producto:</span>
                <span className="font-medium">{product}</span>
              </div>
            )}

            {orderNumber && (
              <div className="flex justify-between py-1 border-t pt-2 mt-2">
                <span className="text-gray-600">Orden #:</span>
                <span className="font-medium">{orderNumber}</span>
              </div>
            )}
          </div>

          {/* Información adicional */}
          <div className="text-sm text-gray-500 mb-6">
            <p className="mb-2">
              📧 Revisa tu correo electrónico para los detalles completos.
            </p>
            <p>
              🚀 Tu acceso se activará automáticamente en unos minutos.
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

            <button
              type="button"
              onClick={onClose}
              className="w-full bg-gray-200 hover:bg-gray-300 text-gray-800 font-medium py-3 px-4 rounded-lg transition duration-200"
            >
              Continuar Explorando
            </button>
          </div>

          {/* Countdown para auto-cerrar */}
          <p className="text-xs text-gray-400 mt-4">
            Este modal se cerrará automáticamente en 10 segundos
          </p>
        </div>
      </div>

      {/* Confetti/celebración */}
      {showConfetti && (
        <div className="fixed inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
            <div className="text-6xl animate-pulse">🎉</div>
          </div>
        </div>
      )}
    </div>
  );
}
