import { palette } from "../../../assets/colors.ts";
import { MainComponentsProps } from "../index.tsx";

const HeroAula = ({ t }: MainComponentsProps) => {
  return (
    <section
      style={{
        background: palette.linearGradient,
      }}
      className="hero-gradient text-white py-20"
    >
      <div className="container mx-auto px-4 flex flex-col md:flex-row items-center">
        <div className="md:w-1/2 mb-10 md:mb-0">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            {t("main.title")}
          </h1>
          <p className="text-xl mb-8 opacity-90">
            {t("main.subtitle")}
          </p>
          <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
            <a
              href="#"
              className="bg-white text-[#F77DA9] px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300"
            >
              {t("main.btn1")}
            </a>
            <a
              href="#"
              className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-[#F77DA9] transition duration-300"
            >
              {t("main.btn2")}
            </a>
          </div>
        </div>
        <div className="md:w-1/2 relative">
          <div className="bg-white rounded-xl shadow-2xl overflow-hidden">
            <div className="video-container">
              <iframe
                src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&controls=0"
                frameBorder="0"
                allowFullScreen
                title="Demo Video"
              >
              </iframe>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroAula;
