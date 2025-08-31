import { palette } from "../../../assets/colors.ts";
import { MainComponentsProps } from "../index.tsx";
import { useProducts } from "../../../lib/useProducts.ts";

const Pricing = ({ t }: MainComponentsProps) => {
  const { products, loading, error } = useProducts();

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
            <p className="text-gray-600 mb-6">
              {error}
            </p>
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

        {/* Sección de planes de pricing estáticos */}

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
                  <a
                    href="/checkout?plan=basic"
                    className="block bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition mb-8"
                  >
                    {t("main.billing.plans.basic.join")}
                  </a>
                  {switchOptions(product.handle)}
                </div>
              </div>
            ))}
          </div>
        )}

        <div className="mt-16 text-center">
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
    </section>
  );
};

export default Pricing;
