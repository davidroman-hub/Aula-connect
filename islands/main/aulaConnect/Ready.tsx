import { palette } from "../../../assets/colors.ts";

const Ready = () => {
  return (
    <section
      style={{
        background: palette.linearGradient,
      }}
      className="py-20 hero-gradient text-white"
    >
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-6">
          ¿Listo para transformar tu manera de enseñar?
        </h2>
        <p className="text-xl mb-8 max-w-2xl mx-auto">
          Únete a miles de profesores que ya están usando Aula Connect para
          llegar a más estudiantes.
        </p>
        <div className="flex flex-col sm:flex-row justify-center space-y-4 sm:space-y-0 sm:space-x-4">
          <a
            href="#"
            className={`bg-white text-[${palette.hover}] hover:bg-gray-100 px-8 py-4 rounded-lg font-bold text-lg transition`}
          >
            Regístrate gratis
          </a>
          <a
            href="#"
            className={`border-2 border-[${palette.hover}] hover:bg-[${palette.hover}] hover:bg-opacity-10 px-8 py-4 rounded-lg font-bold text-lg transition`}
          >
            Habla con un asesor
          </a>
        </div>
      </div>
    </section>
  );
};

export default Ready;
