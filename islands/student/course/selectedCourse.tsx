import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";
import { palette } from "../../../assets/colors.ts";
import { authenticatedGet } from "../../../lib/apiHelpers.ts";
import CourseDetails from "./courseProgress.tsx";
import { Course } from "../../../types/course.ts";
import { CurrentLesson } from "../../../types/users.ts";

interface ModuleData {
  _id?: string;
  name?: string;
  description?: string;
  content?: {
    text?: string;
    html?: string;
  };
  duration?: number;
}

interface CourseData {
  _id?: string;
  name?: string;
  description?: string;
  modules?: Array<ModuleData>;
  students?: Array<unknown>;
  error?: boolean;
}

interface CoursePreviewProps {
  course: { courseData: CourseData[]; modules: ModuleData[] };
  courseId: string;
}

interface CurrentUser {
  currentLesson?: CurrentLesson[] | null;
  _id: string;
  username: string;
  password: string;
  courses: string[];
  type: string;
  updatedAt: string;
}

const CourseView = ({ course, courseId: _courseId }: CoursePreviewProps) => {
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");
  const [selectedModule, setSelectedModule] = useState<string | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [activeTab, setActiveTab] = useState<"modules" | "overview">(
    "overview",
  );

  const searchCurrentLessonInUser = async () => {
    try {
      const url = `/api/student/user?id=${userInfo.id}`;

      const response = await authenticatedGet(url);

      if (response.status !== 200) {
        throw new Error(`Failed to fetch user: ${response.status}`);
      }
      const userData = response.data;

      setCurrentUser(userData);
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Seleccionar el primer módulo por defecto
  useEffect(() => {
    if (course?.modules && course.modules.length > 0 && !selectedModule) {
      setSelectedModule("intro");
      searchCurrentLessonInUser();
    }
  }, [course?.modules, selectedModule]);

  // Obtener datos del módulo seleccionado
  const selectedModuleData = course?.modules?.find((m) =>
    m._id === selectedModule
  );

  if (!course) {
    return <div className="p-4">Curso no encontrado</div>;
  }

  const newCourseObject = {
    ...course.courseData[0],
    modules: course.modules,
  };

  const newUserObject = {
    _id: currentUser?._id || "",
    username: currentUser?.username || "",
    password: currentUser?.password || "",
    courses: currentUser?.courses || [],
    type: currentUser?.type || "student",
    updatedAt: currentUser?.updatedAt || new Date().toISOString(),
    currentLesson: currentUser?.currentLesson || null,
  };

  console.log("Current user:", newUserObject);

  return (
    <div className="h-screen flex relative">
      {/* Overlay para móviles */}
      {sidebarOpen && (
        <button
          type="button"
          className="fixed inset-0 bg-opacity-50 z-20 lg:hidden cursor-default"
          onClick={() => setSidebarOpen(false)}
          onKeyDown={(e) => {
            if (e.key === "Escape") {
              setSidebarOpen(false);
            }
          }}
          aria-label="Cerrar menú"
        />
      )}

      <aside
        style={{
          width: "280px",
        }}
        className={`
        ${sidebarOpen ? "translate-x-0" : "-translate-x-full"}
        lg:translate-x-0 lg:static fixed inset-y-0 left-0 z-30
        w-70 lg:w-1/3 bg-[${palette.primary}] text-white overflow-y-auto
        transition-transform duration-300 ease-in-out
      `}
      >
        {/* Header del sidebar */}
        <div className="mt-17 p-4 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="bg-accent rounded-lg p-2 mr-3">
              <i className="fas fa-book text-white text-xl"></i>
            </div>
            <div>
              <h2 className="text-l font-bold">
                {course.courseData[0].name}
              </h2>
              <p className="text-gray-300 text-sm">
                {course.courseData[0].description}
              </p>
            </div>
          </div>
          {/* Botón para cerrar en móviles */}
          <button
            type="button"
            className="lg:hidden text-white"
            onClick={() => setSidebarOpen(false)}
          >
            <i className="fas fa-times"></i>
          </button>
        </div>

        {/* Lista de módulos */}
        <nav className="p-4">
          <ul>
            <li className="mb-2">
              <button
                type="button"
                onClick={() => {
                  setSelectedModule("intro");
                  // Cerrar sidebar en móviles después de seleccionar
                  if (globalThis.innerWidth && globalThis.innerWidth < 1024) {
                    setSidebarOpen(false);
                  }
                }}
                className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                  selectedModule === "intro"
                    ? "bg-primary text-white"
                    : "hover:bg-gray-700"
                }`}
              >
                <div className="flex-1">
                  <div className="font-medium">
                    {"Progreso del curso"}
                  </div>
                </div>
              </button>
            </li>
            {course.modules?.map((module, index) => (
              <li key={module._id || `module-${index}`} className="mb-2">
                <button
                  type="button"
                  onClick={() => {
                    setSelectedModule(module._id || null);
                    // Cerrar sidebar en móviles después de seleccionar
                    if (globalThis.innerWidth && globalThis.innerWidth < 1024) {
                      setSidebarOpen(false);
                    }
                  }}
                  className={`w-full text-left flex items-center p-3 rounded-lg transition ${
                    selectedModule === module._id
                      ? "bg-primary text-white"
                      : "hover:bg-gray-700"
                  }`}
                >
                  <div className="w-8 h-8 rounded-full bg-gray-600 flex items-center justify-center mr-3 text-sm font-bold">
                    {index + 1}
                  </div>
                  <div className="flex-1">
                    <div className="font-medium">
                      {module.name || `Módulo ${index + 1}`}
                    </div>
                    <div className="text-gray-300 text-sm truncate">
                      {module.description}
                    </div>
                  </div>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        {/* Footer del sidebar */}
        <div className="absolute bottom-0 left-0 right-0 p-4 border-t border-gray-700">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center mr-3">
              <i className="fas fa-user text-white"></i>
            </div>
            <div>
              <p className="font-medium">Estudiante</p>
              <p className="text-gray-400 text-sm">Aprendiendo</p>
            </div>
          </div>
        </div>
      </aside>

      {/* Contenido principal */}
      <div className="mt-17 flex-1 flex flex-col overflow-hidden">
        {/* Header para móviles con botón de menú */}
        <header className="lg:hidden bg-white shadow-sm border-b border-gray-200 flex items-center justify-between p-4">
          <button
            type="button"
            onClick={() => setSidebarOpen(true)}
            className="p-2 rounded-md text-gray-600 hover:text-gray-900 hover:bg-gray-100"
          >
            <i className="fas fa-bars text-xl"></i>
          </button>
          <h1 className="text-lg font-semibold text-gray-900">
            {selectedModuleData?.name || "Selecciona un módulo"}
          </h1>
          <div className="w-10"></div> {/* Spacer para centrar el título */}
        </header>

        {/* Contenido del módulo */}
        <div className="flex-1 overflow-y-auto">
          {selectedModuleData
            ? (
              <div className="p-6">
                <h1 className="text-2xl font-bold mb-4">
                  {selectedModuleData.name}
                </h1>

                {selectedModuleData.description && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Descripción:</h3>
                    <p className="text-gray-700">
                      {selectedModuleData.description}
                    </p>
                  </div>
                )}

                {selectedModuleData.duration && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Duración:</h3>
                    <p className="text-gray-700">
                      {selectedModuleData.duration} minutos
                    </p>
                  </div>
                )}

                {selectedModuleData.content?.text && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Contenido (Texto):</h3>
                    <div className="bg-gray-50 p-4 rounded border">
                      <pre className="whitespace-pre-wrap text-sm">{selectedModuleData.content.text}</pre>
                    </div>
                  </div>
                )}

                {selectedModuleData.content?.html && (
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2">Contenido (HTML):</h3>
                    <div className="bg-gray-50 p-4 rounded border">
                      <pre className="whitespace-pre-wrap text-sm">{selectedModuleData.content.html}</pre>
                    </div>
                  </div>
                )}

                <div className="mt-8 pt-4 border-t">
                  <h3 className="font-semibold mb-2">
                    Datos del módulo (JSON):
                  </h3>
                  <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                {JSON.stringify(selectedModuleData, null, 2)}
                  </pre>
                </div>
              </div>
            )
            : (
              <div className="p-6 text-center text-gray-500">
                Selecciona un módulo para ver su contenido
                <CourseDetails
                  newCourseObject={newCourseObject as Course}
                  courseName={course.courseData[0].name || "Curso"}
                  currentUser={newUserObject}
                  setActiveTab={setActiveTab}
                  activeTab={activeTab}
                />
              </div>
            )}
        </div>
      </div>
    </div>
  );
};

export default CourseView;
