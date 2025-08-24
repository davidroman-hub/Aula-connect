import { palette } from "../../../assets/colors.ts";

const AllYouNeed = () => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            Todo lo que necesitas para enseñar en línea
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Herramientas poderosas diseñadas específicamente para educadores.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i
                className={`fas fa-user-friends text-[${palette.hover}] text-2xl`}
              >
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">Aulas virtuales</h3>
            <p className="text-gray-600">
              Soporte para múltiples participantes simultáneos.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i className={`fas fa-file-alt text-[${palette.hover}] text-2xl`}>
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">Gestión de materiales</h3>
            <p className="text-gray-600">
              Sube y organiza tus materiales de clase. Comparte documentos,
              presentaciones y recursos con tus estudiantes.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i className={`fas fa-tasks text-[${palette.hover}] text-2xl`}>
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">Tareas y evaluaciones</h3>
            <p className="text-gray-600">
              Crea y califica tareas fácilmente. Sistema de retroalimentación
              integrado para cada estudiante.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i
                className={`fas fa-chart-line text-[${palette.hover}] text-2xl`}
              >
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">Reportes y análisis</h3>
            <p className="text-gray-600">
              Seguimiento del progreso de tus estudiantes. Estadísticas
              detalladas para mejorar tu enseñanza.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i className={`fas fa-comments text-[${palette.hover}] text-2xl`}>
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">Foros de discusión</h3>
            <p className="text-gray-600">
              Espacios colaborativos para preguntas y debates. Mantén la
              comunicación fuera del horario de clase.
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i
                className={`fas fa-calendar-alt text-[${palette.hover}] text-2xl`}
              >
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">Calendario integrado</h3>
            <p className="text-gray-600">
              Programa tus clases y envía recordatorios automáticos.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllYouNeed;
