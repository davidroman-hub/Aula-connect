import { useState } from "preact/hooks";

interface StudentDashboardProps {
  token: string;
  //courses: Course[];
  studentId: string;
  studentData: {
    username?: string;
    enrolledCourses?: string[];
  };
}

interface Course {
  id?: string;
  _id?: string;
  name: string;
}

const StudentDashboard = () => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  console.log("User Info:", userInfo);
  const [activeView, setActiveView] = useState("modules");

  const renderModules = () => {
    // Función para obtener el gradiente según dificultad
    const getDifficultyGradient = (difficulty: string) => {
      if (difficulty === "Principiante") {
        return "bg-gradient-to-r from-green-400 to-green-600";
      } else if (difficulty === "Intermedio") {
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      } else {
        return "bg-gradient-to-r from-red-400 to-pink-600";
      }
    };

    // Módulos de ejemplo para mostrar la funcionalidad
    const sampleModules = [
      {
        _id: "mod1",
        name: "Introducción a HTML",
        course: "Desarrollo Web",
        difficulty: "Principiante",
        description: "Aprende los fundamentos de HTML para crear páginas web",
        duration: "2 horas",
        videos: 5,
        documents: 3,
        quizzes: 2,
      },
      {
        _id: "mod2",
        name: "CSS Avanzado",
        course: "Desarrollo Web",
        difficulty: "Intermedio",
        description: "Domina CSS Grid, Flexbox y animaciones",
        duration: "3 horas",
        videos: 8,
        documents: 4,
        quizzes: 3,
      },
      {
        _id: "mod3",
        name: "JavaScript ES6+",
        course: "JavaScript Avanzado",
        difficulty: "Avanzado",
        description: "Características modernas de JavaScript",
        duration: "4 horas",
        videos: 12,
        documents: 6,
        quizzes: 4,
      },
      {
        _id: "mod4",
        name: "React Hooks",
        course: "React & TypeScript",
        difficulty: "Intermedio",
        description: "Aprende a usar React Hooks efectivamente",
        duration: "3.5 horas",
        videos: 10,
        documents: 5,
        quizzes: 3,
      },
    ];

    return (
      <div className="space-y-6">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800">
            Módulos Disponibles
          </h2>
          <div className="flex space-x-4">
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Todos los cursos</option>
              {
                /* {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))} */
              }
            </select>
            <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
              <option value="">Toda dificultad</option>
              <option value="Principiante">Principiante</option>
              <option value="Intermedio">Intermedio</option>
              <option value="Avanzado">Avanzado</option>
            </select>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {sampleModules.map((module) => (
            <div
              key={module._id}
              className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
            >
              {/* Header con gradiente según dificultad */}
              <div
                className={`h-32 p-4 flex items-center justify-center text-white ${
                  getDifficultyGradient(module.difficulty)
                }`}
              >
                <div className="text-center">
                  <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                  <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                    {module.difficulty}
                  </span>
                </div>
              </div>

              {/* Contenido */}
              <div className="p-6">
                <div className="mb-4">
                  <p className="text-sm text-blue-600 font-medium mb-2">
                    {module.course}
                  </p>
                  <p className="text-gray-600 text-sm">{module.description}</p>
                </div>

                {/* Estadísticas */}
                <div className="flex justify-between text-sm text-gray-500 mb-4">
                  <div className="flex items-center">
                    <span className="fas fa-clock mr-1"></span>
                    {module.duration}
                  </div>
                  <div className="flex space-x-3">
                    <span>
                      <span className="fas fa-video mr-1"></span>
                      {module.videos}
                    </span>
                    <span>
                      <span className="fas fa-file-alt mr-1"></span>
                      {module.documents}
                    </span>
                    <span>
                      <span className="fas fa-question-circle mr-1"></span>
                      {module.quizzes}
                    </span>
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex space-x-2">
                  <button
                    type="button"
                    className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                    onClick={() => {}}
                  >
                    <span className="fas fa-eye mr-2"></span>
                    <span>Vista previa</span>
                  </button>
                  <button
                    type="button"
                    className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                  >
                    <span className="fas fa-plus mr-2"></span>
                    <span>Inscribirse</span>
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  const renderContent = () => {
    switch (activeView) {
      case "modules":
        return renderModules();
      case "progress":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mi Progreso
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">
                Sección de progreso en desarrollo...
              </p>
            </div>
          </div>
        );
      case "certificates":
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              Mis Certificados
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">
                Sección de certificados en desarrollo...
              </p>
            </div>
          </div>
        );
      default:
        return renderModules();
    }
  };

  return (
    <div
      style={{ position: "absolute", marginTop: "60px" }}
      className="  bg-gray-50"
    >
      {/* Header del dashboard */}
      <div className="bg-white shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                Panel del Estudiante
              </h1>
              <p className="text-sm text-gray-600">
                Bienvenido, {"Estudiante"}
              </p>
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-graduation-cap mr-2"></i>
                <span>{0} cursos</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto flex">
        {/* Sidebar de navegación */}
        <div className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <ul className="space-y-2">
              <li>
                <button
                  type="button"
                  onClick={() => setActiveView("modules")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeView === "modules"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="fas fa-puzzle-piece mr-3" aria-hidden="true">
                  </span>
                  <span>Explorar Módulos</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveView("progress")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeView === "progress"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="fas fa-chart-line mr-3" aria-hidden="true">
                  </span>
                  <span>Mi Progreso</span>
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setActiveView("certificates")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                    activeView === "certificates"
                      ? "bg-blue-100 text-blue-700 border border-blue-200"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  <span className="fas fa-certificate mr-3" aria-hidden="true">
                  </span>
                  <span>Mis Certificados</span>
                </button>
              </li>
            </ul>
          </nav>

          {/* Información adicional en el sidebar */}
          <div className="p-4 border-t border-gray-200 mt-8">
            <div className="bg-blue-50 rounded-lg p-4">
              <h3 className="text-sm font-semibold text-blue-800 mb-2">
                💡 Consejo del día
              </h3>
              <p className="text-xs text-blue-700">
                Dedica al menos 30 minutos diarios al aprendizaje para obtener
                mejores resultados.
              </p>
            </div>
          </div>
        </div>

        {/* Contenido principal */}
        <div className="flex-1">
          {userInfo.type === "student" || userInfo.type === "admin"
            ? renderContent()
            : null}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
