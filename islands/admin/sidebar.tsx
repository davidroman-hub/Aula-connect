import { palette } from "../../assets/colors.ts";

function DashboardSidebar({ view, setView, sidebarOpen, setSidebarOpen }: any) {
  const menuItems = [
    { id: "dashboard", label: "Dashboard", icon: "grid" },
    { id: "students", label: "Estudiantes", icon: "users" },
    { id: "courses", label: "Cursos", icon: "book" },
    { id: "modules", label: "Módulos", icon: "puzzle-piece" },
    { id: "createUser", label: "Nuevo Estudiante", icon: "user-plus" },
    { id: "createCourse", label: "Nuevo Curso", icon: "plus-circle" },
  ];

  return (
    <aside className={`sidebar bg-[${palette.primary}] text-white`}>
      <div className="p-4 border-b border-gray-700 flex items-center justify-between">
        <div className="flex items-center">
          <div className="bg-accent rounded-lg p-2 mr-3">
            <i className="fas fa-laptop-code text-white text-2xl"></i>
          </div>
          <h1 className="text-xl font-bold">CodeMaster Dashboard</h1>
        </div>
        <button
          className="md:hidden text-white"
          onClick={() => setSidebarOpen(false)}
        >
          <i className="fas fa-times"></i>
        </button>
      </div>

      <nav className="p-4">
        <ul>
          {menuItems.map((item) => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => {
                  setView(item.id);
                  setSidebarOpen(false);
                }}
                className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                  view === item.id
                    ? "bg-primary text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <i className={`fas fa-${item.icon} mr-3`}></i>
                <span>{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>

      <div className="absolute bottom-0 w-full p-4 border-t border-gray-700">
        <div className="flex items-center">
          <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
            <i className="fas fa-user text-white"></i>
          </div>
          <div>
            <p className="font-medium">Administrador</p>
            <p className="text-gray-400 text-sm">admin@codemaster.com</p>
          </div>
        </div>
      </div>
    </aside>
  );
}

export default DashboardSidebar;
