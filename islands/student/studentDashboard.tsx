import { useState } from "preact/hooks";
import RenderCourses from "./dashboardParts/renderCourses.tsx";

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

  const [activeView, setActiveView] = useState("courses");

  const renderContent = () => {
    switch (activeView) {
      case "courses":
        return <RenderCourses userInfo={userInfo} />;
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
        return <RenderCourses userInfo={userInfo} />;
    }
  };

  return (
    <div
      style={{
        position: "absolute",
        marginTop: "60px",
        width: "-webkit-fill-available",
      }}
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
                Bienvenido {userInfo.username || "Estudiante"} !
              </p>
            </div>
            {
              /* <div className="flex items-center space-x-4">
              <div className="flex items-center text-sm text-gray-500">
                <i className="fas fa-graduation-cap mr-2"></i>
                <span>{0} cursos</span>
              </div>
            </div> */
            }
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
                  <span className="fas fa-file-alt mr-3" aria-hidden="true">
                  </span>
                  <span>Explorar Cursos</span>
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
        <div className="p-6 overflow-y-auto">
          {userInfo.type === "user" || userInfo.type === "admin"
            ? renderContent()
            : null}
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;
