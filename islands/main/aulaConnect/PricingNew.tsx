import { palette } from "../../../assets/colors.ts";
import { MainComponentsProps } from "../index.tsx";
import { useProducts } from "../../../lib/useProducts.ts";
import { Product } from "../../../types/product.ts";
import { useState } from "preact/hooks";
import CheckoutModal from "../../checkout/CheckoutModalSimple.tsx";

interface FormData {
  email: string;
  firstName: string;
  lastName: string;
  phone: string;
}

const Pricing = ({ t }: MainComponentsProps) => {
  const { products, loading, error } = useProducts();
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleProductClick = (product: Product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  const handleSimulatedCheckout = async (
    product: Product,
    formData: FormData,
  ) => {
    const simulateResponse = await fetch("/api/checkout-simulate", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        variantId: product.variantId,
        email: formData.email,
        firstName: formData.firstName,
        lastName: formData.lastName,
        phone: formData.phone,
      }),
    });

    const simulateResult = await simulateResponse.json();

    if (simulateResult.success) {
      alert(
        "✅ Checkout simulado exitoso!\n\n" +
          "ID de orden: " + simulateResult.details.orderId + "\n" +
          "Cliente: " + simulateResult.details.customer + "\n" +
          "Email: " + simulateResult.details.email,
      );
    }
  };

  const handleDevelopmentStoreError = async (
    product: Product,
    formData: FormData,
    errorMessage: string,
  ) => {
    const developmentErrors = [
      "password",
      "protected",
      "can't accept payments",
      "payments right now",
      "development store",
      "unavailable",
    ];

    const isDevelopmentError = developmentErrors.some((error) =>
      errorMessage.toLowerCase().includes(error.toLowerCase())
    );

    if (isDevelopmentError) {
      const useSimulation = confirm(
        "🛠️ Tienda en Modo de Desarrollo\n\n" +
          "Esta tienda no puede procesar pagos reales.\n" +
          "¿Proceder con checkout simulado?\n\n" +
          "Producto: " + product.title + "\n" +
          "Cliente: " + formData.firstName + " " + formData.lastName,
      );

      if (useSimulation) {
        await handleSimulatedCheckout(product, formData);
      }
      return true;
    }
    return false;
  };

  const handleCheckout = async (product: Product, formData: FormData) => {
    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          variantId: product.variantId,
          email: formData.email,
          firstName: formData.firstName,
          lastName: formData.lastName,
          phone: formData.phone,
        }),
      });

      const result = await response.json();

      if (result.success) {
        if (result.simulated) {
          alert("✅ Checkout simulado completado!");
          return;
        }

        // Detectar si la URL indica problemas de desarrollo
        if (
          result.checkoutUrl.includes("password") ||
          result.checkoutUrl.includes("unavailable")
        ) {
          await handleDevelopmentStoreError(
            product,
            formData,
            "store protected",
          );
          return;
        }

        globalThis.location.href = result.checkoutUrl;
      } else {
        const handled = await handleDevelopmentStoreError(
          product,
          formData,
          result.error,
        );
        if (!handled) {
          alert("❌ Error: " + result.error);
        }
      }
    } catch (error) {
      console.error("Checkout error:", error);
      const useSimulation = confirm(
        "⚠️ Error de conexión\n¿Usar checkout simulado?",
      );
      if (useSimulation) {
        await handleSimulatedCheckout(product, formData);
      }
    }
  };

  if (loading) {
    return (
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
            </div>
            <h2 className="text-2xl font-bold mb-4">Cargando productos...</h2>
            <p className="text-gray-600">
              Obteniendo los últimos productos de nuestra tienda
            </p>
          </div>
        </div>
      </section>
    );
  }

  if (error) {
    return (
      <section id="pricing" className="py-20">
        <div className="container mx-auto px-4 text-center">
          <div className="max-w-md mx-auto">
            <div className="text-red-500 text-4xl mb-4">⚠️</div>
            <h2 className="text-2xl font-bold mb-4 text-red-600">
              Error al cargar productos
            </h2>
            <p className="text-gray-600 mb-6">{error}</p>
            <button
              type="button"
              onClick={() => globalThis.location.reload()}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              Reintentar
            </button>
          </div>
        </div>
      </section>
    );
  }

  const switchOptions = (option: string) => {
    switch (option) {
      case "basic":
        return (
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.basic.pnt1")}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.basic.pnt2")}</span>
            </li>
          </ul>
        );
      case "basic-suscription":
        return (
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.profesional.pnt1")}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.profesional.pnt2")}</span>
            </li>
          </ul>
        );
      case "premium":
        return (
          <ul className="space-y-4 text-left">
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.premium.pnt1")}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.premium.pnt2")}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.premium.pnt3")}</span>
            </li>
            <li className="flex items-start">
              <i className="fas fa-check text-green-500 mt-1 mr-2"></i>
              <span>{t("main.billing.plans.premium.pnt4")}</span>
            </li>
          </ul>
        );
      default:
        return null;
    }
  };

  return (
    <section id="pricing" className="py-20">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {t("main.billing.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("main.billing.desc")}
          </p>
        </div>

        {products && products.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {products.map((product) => (
              <div
                key={product.id}
                className={product.handle !== "basic"
                  ? "bg-white rounded-xl shadow-md overflow-hidden border border-gray-200"
                  : `bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[${palette.hover}] relative`}
              >
                <div
                  className={`absolute top-0 right-0 bg-[${palette.hover}] text-white px-4 py-1 text-sm font-bold rounded-bl-lg`}
                >
                  POPULAR
                </div>
                <div className="p-8 text-center">
                  <h3 className="text-2xl font-bold mb-2">
                    {product.title}
                  </h3>
                  <p className="text-gray-600 mb-6">
                    {product.description}
                  </p>
                  <div className="text-4xl font-bold mb-6">
                    {Math.trunc(parseInt(product.price))}
                    <span className="text-lg text-gray-500">MX/mes</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => handleProductClick(product)}
                    className="block w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition mb-8"
                  >
                    {t("main.billing.plans.basic.join")}
                  </button>
                  {switchOptions(product.handle)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            Powered by Shopify <i className="fab fa-shopify"></i>
          </p>
          <p className="text-gray-600 mb-4">
            {t("main.billing.plans.needs")}
          </p>
          <a
            href="/contact"
            className={`inline-block border-2 border-[${palette.primary}] text-[${palette.primary}] hover:bg-[${palette.hover}] hover:text-white px-6 py-3 rounded-lg font-bold transition`}
          >
            {t("main.billing.plans.contact")}
          </a>
        </div>
      </div>

      {/* Modal de Checkout */}
      <CheckoutModal
        product={selectedProduct}
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onCheckout={handleCheckout}
      />
    </section>
  );
};

export default Pricing;
