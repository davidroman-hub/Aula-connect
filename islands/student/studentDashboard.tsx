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
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const menuItems = [
    { id: "courses", label: "Explorar Cursos", icon: "fa-file-alt", number: 1 },
    { id: "progress", label: "Mi Progreso", icon: "fa-chart-line", number: 2 },
    // {
    //   id: "certificates",
    //   label: "Mis Certificados",
    //   icon: "fa-certificate",
    //   number: 3,
    // },
    { id: "assignments", label: "Tareas", icon: "fa-tasks", number: 4 },
    { id: "calendar", label: "Calendario", icon: "fa-calendar", number: 5 },
    // { id: "forums", label: "Foros", icon: "fa-comments", number: 6 },
    // { id: "resources", label: "Recursos", icon: "fa-folder", number: 7 },
    // { id: "grades", label: "Calificaciones", icon: "fa-star", number: 8 },
    // { id: "messages", label: "Mensajes", icon: "fa-envelope", number: 9 },
    // { id: "settings", label: "Configuración", icon: "fa-cog", number: 10 },
    // { id: "help", label: "Ayuda", icon: "fa-question-circle", number: 11 },
    // { id: "library", label: "Biblioteca", icon: "fa-book", number: 12 },
  ];

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
      default: {
        const selectedItem = menuItems.find((item) => item.id === activeView);
        return (
          <div className="p-6">
            <h2 className="text-2xl font-bold text-gray-800 mb-4">
              {selectedItem?.label || "Sección"}
            </h2>
            <div className="bg-white rounded-lg shadow p-6">
              <p className="text-gray-600">
                Esta sección está en desarrollo...
              </p>
            </div>
          </div>
        );
      }
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
        {/* Sidebar de navegación colapsable */}
        <div
          className={`bg-white shadow-sm min-h-screen transition-all duration-300 ${
            sidebarOpen ? "w-64" : "w-25"
          } flex flex-col`}
        >
          {/* Header del sidebar con botón toggle */}
          <div
            className={`p-4 border-b border-gray-200 flex items-center ${
              sidebarOpen ? "justify-between" : "justify-center"
            }`}
          >
            {sidebarOpen && (
              <h2 className="text-lg font-semibold text-gray-800">
                Navegación
              </h2>
            )}
            <button
              type="button"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 rounded-lg hover:bg-gray-100 transition-colors"
              aria-label={sidebarOpen ? "Cerrar sidebar" : "Abrir sidebar"}
            >
              <i
                className={`fas ${
                  sidebarOpen ? "fa-chevron-left" : "fa-chevron-right"
                } text-gray-600`}
              >
              </i>
            </button>
          </div>

          {/* Navegación */}
          <nav className={`p-4 flex-1 ${!sidebarOpen ? "px-2" : ""}`}>
            <ul
              className={`space-y-2 ${
                !sidebarOpen && menuItems.length > 10
                  ? "overflow-y-auto max-h-96"
                  : ""
              }`}
            >
              {menuItems.map((item) => (
                <li key={item.id}>
                  <button
                    type="button"
                    onClick={() => setActiveView(item.id)}
                    className={`w-full text-left px-4 py-3 rounded-lg transition-colors flex items-center ${
                      activeView === item.id
                        ? "bg-blue-100 text-blue-700 border border-blue-200"
                        : "text-gray-700 hover:bg-gray-100"
                    } ${
                      !sidebarOpen ? "justify-center relative group px-2" : ""
                    }`}
                    title={!sidebarOpen ? item.label : ""}
                  >
                    {!sidebarOpen
                      ? (
                        <>
                          <div className="relative">
                            <span
                              className={`fas ${item.icon}`}
                              aria-hidden="true"
                            >
                            </span>
                          </div>
                          {/* Tooltip */}
                          <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                            {item.label}
                            <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800">
                            </div>
                          </div>
                        </>
                      )
                      : (
                        <>
                          <span
                            className={`fas ${item.icon} mr-3`}
                            aria-hidden="true"
                          >
                          </span>
                          <span>{item.label}</span>
                        </>
                      )}
                  </button>
                </li>
              ))}
            </ul>
          </nav>

          {/* Información adicional en el sidebar */}
          {sidebarOpen && (
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
          )}
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
