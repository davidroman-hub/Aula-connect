import { useEffect, useState } from "preact/hooks";
import { Product } from "../../types/product.ts";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
  billingAddress: {
    address1: string;
    city: string;
    country: string;
    zip: string;
  };
}

interface CheckoutModalProps {
  readonly product: Product | null;
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly onCheckout: (product: Product, formData: FormData) => void;
}

export default function CheckoutModal(
  { product, isOpen, onClose, onCheckout }: CheckoutModalProps,
) {
  const [formData, setFormData] = useState({
    email: "",
    firstName: "",
    lastName: "",
    phone: "",
    cardNumber: "",
    expiryDate: "",
    cvv: "",
    billingAddress: {
      address1: "",
      city: "",
      country: "MX",
      zip: "",
    },
  });

  const [isProcessing, setIsProcessing] = useState(false);

  // Cerrar modal con ESC
  useEffect(() => {
    const handleEsc = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEsc);
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.removeEventListener("keydown", handleEsc);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (!product) return;

    setIsProcessing(true);
    try {
      onCheckout(product, formData);
      onClose();
    } catch (error) {
      console.error("Error en checkout:", error);
    } finally {
      setIsProcessing(false);
    }
  };

  const handleInputChange = (field: string, value: string) => {
    if (field.startsWith("billingAddress.")) {
      const addressField = field.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        billingAddress: {
          ...prev.billingAddress,
          [addressField]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }
  };

  if (!isOpen || !product) return null;

  return (
    <div className="fixed inset-0 z-50 overflow-y-auto">
      {/* Backdrop */}
      <button
        className="fixed inset-0 bg-black bg-opacity-50 transition-opacity"
        onClick={onClose}
        aria-label="Cerrar modal"
      >
      </button>

      {/* Modal */}
      <div className="flex min-h-full items-center justify-center p-4">
        <div className="relative w-full max-w-2xl bg-white rounded-xl shadow-2xl">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b">
            <h3 className="text-xl font-semibold text-gray-900">
              Checkout - {product.title}
            </h3>
            <button
              type="button"
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>

          {/* Content */}
          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Product Summary */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Resumen del pedido
                </h4>
                <div className="bg-gray-50 rounded-lg p-4">
                  {product.image && (
                    <img
                      src={product.image}
                      alt={product.title}
                      className="w-full h-32 object-cover rounded-md mb-3"
                    />
                  )}
                  <h5 className="font-medium text-gray-900">{product.title}</h5>
                  <p className="text-sm text-gray-600 mt-1">
                    {product.description}
                  </p>
                  <div className="flex justify-between items-center mt-4 pt-3 border-t">
                    <span className="text-lg font-semibold">Total:</span>
                    <span className="text-xl font-bold text-blue-600">
                      ${parseFloat(product.price).toFixed(2)} MXN
                    </span>
                  </div>
                </div>
              </div>

              {/* Checkout Form */}
              <div className="space-y-4">
                <h4 className="text-lg font-medium text-gray-900">
                  Información de pago
                </h4>
                <form onSubmit={handleSubmit} className="space-y-4">
                  {/* Información personal */}
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Nombre
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.firstName}
                        onChange={(e) =>
                          handleInputChange(
                            "firstName",
                            (e.target as HTMLInputElement).value,
                          )}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Apellido
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.lastName}
                        onChange={(e) =>
                          handleInputChange(
                            "lastName",
                            (e.target as HTMLInputElement).value,
                          )}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) =>
                        handleInputChange(
                          "email",
                          (e.target as HTMLInputElement).value,
                        )}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Teléfono
                    </label>
                    <input
                      type="tel"
                      value={formData.phone}
                      onChange={(e) =>
                        handleInputChange(
                          "phone",
                          (e.target as HTMLInputElement).value,
                        )}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                  </div>

                  {/* Información de tarjeta */}
                  <div className="pt-4 border-t">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">
                      Información de tarjeta
                    </h5>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Número de tarjeta
                      </label>
                      <input
                        type="text"
                        required
                        placeholder="1234 5678 9012 3456"
                        value={formData.cardNumber}
                        onChange={(e) =>
                          handleInputChange(
                            "cardNumber",
                            (e.target as HTMLInputElement).value,
                          )}
                        className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4 mt-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Fecha de vencimiento
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="MM/YY"
                          value={formData.expiryDate}
                          onChange={(e) =>
                            handleInputChange(
                              "expiryDate",
                              (e.target as HTMLInputElement).value,
                            )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          CVV
                        </label>
                        <input
                          type="text"
                          required
                          placeholder="123"
                          value={formData.cvv}
                          onChange={(e) =>
                            handleInputChange(
                              "cvv",
                              (e.target as HTMLInputElement).value,
                            )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Dirección de facturación */}
                  <div className="pt-4 border-t">
                    <h5 className="text-sm font-medium text-gray-700 mb-3">
                      Dirección de facturación
                    </h5>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                          Dirección
                        </label>
                        <input
                          type="text"
                          required
                          value={formData.billingAddress.address1}
                          onChange={(e) =>
                            handleInputChange(
                              "billingAddress.address1",
                              (e.target as HTMLInputElement).value,
                            )}
                          className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Ciudad
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.billingAddress.city}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress.city",
                                (e.target as HTMLInputElement).value,
                              )}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-medium text-gray-700 mb-1">
                            Código postal
                          </label>
                          <input
                            type="text"
                            required
                            value={formData.billingAddress.zip}
                            onChange={(e) =>
                              handleInputChange(
                                "billingAddress.zip",
                                (e.target as HTMLInputElement).value,
                              )}
                            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                          />
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Botones */}
                  <div className="flex gap-3 pt-6">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 px-4 py-2 text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors"
                    >
                      Cancelar
                    </button>
                    <button
                      type="submit"
                      disabled={isProcessing}
                      className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-md transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isProcessing
                        ? (
                          <div className="flex items-center justify-center">
                            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white mr-2">
                            </div>
                            Procesando...
                          </div>
                        )
                        : (
                          `Pagar $${parseFloat(product.price).toFixed(2)}`
                        )}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
