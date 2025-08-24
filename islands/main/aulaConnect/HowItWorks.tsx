import { palette } from "../../../assets/colors.ts";

const HowItWorks = () => {
  return (
    <section
      style={{ backgroundColor: palette.primary }}
      id="how-it-works"
      className="py-20"
    >
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Cómo funciona Aula Connect
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Empieza a enseñar en línea en solo 3 sencillos pasos.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between mb-16">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <span className={`text-[${palette.hover}] font-bold text-xl`}>
                1
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">
              Crea tu perfil de profesor
            </h3>
            <p className="text-gray-600 mb-6">
              Regístrate en minutos y completa tu perfil profesional. Añade tu
              experiencia, especialidades y métodos de enseñanza.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i
                  className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}
                >
                </i>
                <span>Verificación de credenciales opcional</span>
              </li>
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Sube tu foto y video de presentación</span>
              </li>

              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Define tu disponibilidad horaria</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 bg-gray-100 rounded-xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1756067229/learningplat/register_vh96sf.png"
              alt="Profesor creando perfil"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row-reverse items-center justify-between mb-16">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pl-10">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <span className={`text-[${palette.hover}] font-bold text-xl`}>
                2
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Configura tus cursos</h3>
            <p className="text-gray-600 mb-6">
              Diseña el plan de estudios, carga tus materiales y establece los
              objetivos de aprendizaje para cada curso.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Estructura por módulos y lecciones</span>
              </li>
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Sube videos, PDFs, presentaciones y más</span>
              </li>
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Establece requisitos y certificados</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 bg-gray-100 rounded-xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1756067225/learningplat/configLesson_j9qkad.png"
              alt="Configuración de cursos"
              className="w-full h-auto"
            />
          </div>
        </div>

        <div className="flex flex-col md:flex-row items-center justify-between">
          <div className="md:w-1/2 mb-10 md:mb-0 md:pr-10">
            <div className="bg-indigo-100 w-12 h-12 rounded-full flex items-center justify-center mb-6">
              <span className={`text-[${palette.hover}] font-bold text-xl`}>
                3
              </span>
            </div>
            <h3 className="text-2xl font-bold mb-4">Comienza a enseñar</h3>
            <p className="text-gray-600 mb-6">
              Conecta con tus estudiantes en tiempo real o graba clases para que
              las vean cuando puedan. Interactúa mediante chat, pizarras
              digitales y más.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Sesiones en vivo con hasta 50 estudiantes</span>
              </li>
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Grabación automática de clases</span>
              </li>
              <li className="flex items-start">
                <i className={`fas fa-check text-[${palette.hover}] mt-1 mr-2`}>
                </i>
                <span>Herramientas interactivas integradas</span>
              </li>
            </ul>
          </div>
          <div className="md:w-1/2 bg-gray-100 rounded-xl overflow-hidden">
            <img
              src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1756067238/learningplat/teaching_h4cwfr.png"
              alt="Profesor dando clase online"
              className="w-full h-auto"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
