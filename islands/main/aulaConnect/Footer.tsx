import { palette } from "../../../assets/colors.ts";
import { MainComponentsProps } from "../index.tsx";

const Footer = ({ t }: MainComponentsProps) => {
  return (
    <footer className="bg-gray-900 text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div>
            <div
              className={`flex items-center space-x-2 mb-4`}
            >
              <img
                src={"https://res.cloudinary.com/dm8dxwvix/image/upload/v1756059842/learningplat/aulaConnectNolleters_fvei4p.png"}
                alt="Aula Connect Logo"
                className={`bg-[${palette.backgroundSoft}] rounded-full h-15 w-15`}
              />
              <h3 className="text-xl font-bold text-white">Aula Connect</h3>
            </div>
            <p className="text-gray-400 mb-4">
              {t("main.footer.description")}
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-facebook-f"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-twitter"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a href="#" className="text-gray-400 hover:text-white transition">
                <i className="fab fa-youtube"></i>
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-lg font-bold mb-4">Legal</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  {t("main.footer.legal.terms")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  {t("main.footer.legal.privacy")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  {t("main.footer.legal.cookies")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  {t("main.footer.legal.contract")}
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="text-gray-400 hover:text-white transition"
                >
                  {t("main.footer.legal.terms")}
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="pt-8 border-t border-gray-800 text-center text-gray-400">
          <p>&copy; {t("main.footer.rights")}</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
