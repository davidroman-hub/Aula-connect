import { palette } from "../../../assets/colors.ts";
import { MainComponentsProps } from "../index.tsx";

const Pricing = ({ t }: MainComponentsProps) => {
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

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                {t("main.billing.plans.basic.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("main.billing.plans.basic.sub")}
              </p>
              <div className="text-4xl font-bold mb-6">
                $9.99<span className="text-lg text-gray-500">/mes</span>
              </div>
              <a
                href="#"
                className="block bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition mb-8"
              >
                {t("main.billing.plans.basic.join")}
              </a>
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
            </div>
          </div>

          <div
            className={`bg-white rounded-xl shadow-lg overflow-hidden border-2 border-[${palette.hover}] relative`}
          >
            <div
              className={`absolute top-0 right-0 bg-[${palette.hover}] text-white px-4 py-1 text-sm font-bold rounded-bl-lg`}
            >
              POPULAR
            </div>
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                {t("main.billing.plans.profesional.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("main.billing.plans.profesional.sub")}
              </p>
              <div className="text-4xl font-bold mb-6">
                $19.99<span className="text-lg text-gray-500">/mes</span>
              </div>
              <a
                href="#"
                className={`block bg-[${palette.primary}] hover:bg-[${palette.hover}] text-white py-3 rounded-lg font-medium transition mb-8`}
              >
                {t("main.billing.plans.profesional.join")}
              </a>
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
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-md overflow-hidden border border-gray-200">
            <div className="p-8 text-center">
              <h3 className="text-2xl font-bold mb-2">
                {t("main.billing.plans.premium.title")}
              </h3>
              <p className="text-gray-600 mb-6">
                {t("main.billing.plans.premium.sub")}
              </p>
              <div className="text-4xl font-bold mb-6">
                $39.99<span className="text-lg text-gray-500">/mes</span>
              </div>
              <a
                href="#"
                className="block bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition mb-8"
              >
                {t("main.billing.plans.premium.price")}
              </a>
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
            </div>
          </div>
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-600 mb-4">
            {t("main.billing.plans.needs")}
          </p>
          <a
            href="#"
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
