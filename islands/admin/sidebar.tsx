import { palette } from "../../assets/colors.ts";

interface DashboardSidebarProps {
  readonly view: string;
  readonly setView: (view: string) => void;
  readonly sidebarOpen: boolean;
  readonly setSidebarOpen: (open: boolean) => void;
  readonly userInfo: { username: string; email: string; type: string };
}

function DashboardSidebar(
  { view, setView, sidebarOpen, setSidebarOpen, userInfo }:
    DashboardSidebarProps,
) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "chart-simple" },
    { id: "students", label: "Estudiantes", icon: "users" },
    { id: "courses", label: "Cursos", icon: "book" },
    { id: "modules", label: "Módulos", icon: "puzzle-piece" },
    { id: "createUser", label: "Nuevo Estudiante", icon: "user-plus" },
    { id: "createCourse", label: "Nuevo Curso", icon: "plus-circle" },
  ];

  return (
    <>
      {/* Overlay para móvil */}
      {sidebarOpen && (
        <button
          type="button"
          className="overlay md:hidden"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSidebarOpen(false);
            }
          }}
          aria-label="Cerrar sidebar"
        />
      )}

      <aside
        style={{
          position: "fixed",
          top: "64px", // Altura del navbar (h-16 = 64px)
          left: "0",
          height: "calc(100vh - 64px)", // Altura total menos la altura del navbar
          zIndex: 30, // Menor que el navbar (z-40)
        }}
        className={`sidebar bg-[${palette.primary}] text-white transition-all duration-300 ${
          sidebarOpen ? "w-64" : "w-16"
        }`}
      >
        <div
          className={`p-4 border-b border-gray-700 flex items-center ${
            sidebarOpen ? "justify-between" : "justify-center"
          }`}
        >
          {sidebarOpen
            ? (
              <>
                <div className="flex items-center">
                  <div
                    style={{ background: palette.backgroundSoft }}
                    className="w-13 h-13 rounded-full flex items-center p-1 justify-center mr-2"
                  >
                    <img
                      src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1756059842/learningplat/aulaConnectNolleters_fvei4p.png"
                      alt="logo"
                      className="cursor-pointer"
                    />
                  </div>
                  <h2 className="text-xl font-bold">Aula Connect</h2>
                </div>
                <button
                  type="button"
                  className="cursor-pointer text-white hover:bg-gray-700 p-2 rounded-lg transition"
                  onClick={() => setSidebarOpen(false)}
                  aria-label="Minimizar sidebar"
                >
                  <i className="fas fa-chevron-left"></i>
                </button>
              </>
            )
            : (
              <button
                type="button"
                className="cursor-pointer text-white hover:bg-gray-700 p-2 rounded-lg transition"
                onClick={() => setSidebarOpen(true)}
                aria-label="Expandir sidebar"
              >
                <i className="fas fa-chevron-right"></i>
              </button>
            )}
        </div>

        <nav className="p-4">
          <ul>
            {menuItems.map((item) => (
              <li key={item.id} className="mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setView(item.id);
                    // Solo cerrar en móvil, no en desktop
                    if (globalThis.innerWidth && globalThis.innerWidth < 768) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`cursor-pointer w-full text-left flex items-center relative group ${
                    sidebarOpen ? "p-3" : "p-3 justify-center"
                  } rounded-lg transition ${
                    view === item.id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-700"
                  }`}
                  title={!sidebarOpen ? item.label : ""}
                >
                  <i
                    className={`fas fa-${item.icon} ${
                      sidebarOpen ? "mr-3" : ""
                    }`}
                  >
                  </i>
                  {sidebarOpen && <span>{item.label}</span>}

                  {/* Tooltip que aparece solo cuando está minimizado */}
                  {!sidebarOpen && (
                    <div className="absolute left-full ml-2 px-2 py-1 bg-gray-800 text-white text-sm rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-none whitespace-nowrap z-50">
                      {item.label}
                      <div className="absolute top-1/2 left-0 transform -translate-y-1/2 -translate-x-1 w-0 h-0 border-t-4 border-b-4 border-r-4 border-transparent border-r-gray-800">
                      </div>
                    </div>
                  )}
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div
          className={`absolute bottom-0 p-4 border-t border-gray-700 ${
            sidebarOpen ? "w-full" : "w-16"
          }`}
        >
          {sidebarOpen
            ? (
              <div className="flex items-center">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div>
                  <p className="font-medium uppercase">{userInfo.username}</p>
                  <p className="text-gray-400 text-sm">Administrador</p>
                  <p className="text-gray-400 text-sm">Version 1.5.0</p>
                </div>
              </div>
            )
            : (
              <div className="flex justify-center">
                <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center">
                  <i className="fas fa-user text-white"></i>
                </div>
              </div>
            )}
        </div>
      </aside>
    </>
  );
}

export default DashboardSidebar;
