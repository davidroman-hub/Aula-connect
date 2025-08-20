import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { useEffect, useState } from "preact/hooks";
import { palette } from "../../../assets/colors.ts";
import { authenticatedGet } from "../../../lib/apiHelpers.ts";
import CourseDetails from "./courseProgress.tsx";
import { Course } from "../../../types/course.ts";
import { CurrentLesson } from "../../../types/users.ts";
import { ErrorAlert } from "../../alerts/index.tsx";
import ModuleContentView from "./moduleView.tsx";
import { getDifficultyGradient } from "../../admin/module/modulePreviewModal.tsx";

type Materials = {
  type: string;
  title: string;
  url: string;
  description: string;
};

type Exercises = {
  title: string;
  description: string;
  instructions: string;
  solution: string;
};

export interface Content {
  description: string;
  objectives: any[];
  duration: string;
  difficulty: string;
  videoUrl: string;
  materials: Materials[];
  exercises: Exercises[];
  notes: string;
}

export interface ModuleData {
  _id?: string;
  name?: string;
  description?: string;
  content?: Content;
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
  const [errors, setErrors] = useState<string>("");

  const [currentUser, setCurrentUser] = useState<CurrentUser | null>(null);
  const [activeTab, setActiveTab] = useState<"modules" | "overview">(
    "overview",
  );

  const currentCourse = course.courseData.find(
    (c) => c._id === _courseId,
  );

  console.log("Current Course:", currentCourse);
  const searchCurrentLessonInUser = async () => {
    setErrors("");
    try {
      const url = `/api/student/user?id=${userInfo.id}`;

      const response = await authenticatedGet(url);

      if (response.status !== 200) {
        setErrors(`Failed to fetch user: ${response.status}`);
      }
      const userData = response.data;

      setCurrentUser(userData);
    } catch (error) {
      setErrors(`Failed to fetch user: ${error}`);
    }
  };

  const activeModuleForStudent = async (CurrentLesson: CurrentLesson) => {
    try {
      if (currentUser !== null) {
        const response = await axiod.patch("/api/users/user", {
          id: currentUser._id,
          username: currentUser.username,
          currentLesson: [
            ...(currentUser.currentLesson ?? []),
            CurrentLesson,
          ],
        });

        if (response.status !== 200) {
          throw new Error(`Failed to update user: ${response.status}`);
        }
        setCurrentUser((prev) => ({
          ...prev!,
          currentLesson: [
            ...(prev!.currentLesson ?? []),
            CurrentLesson,
          ],
        }));
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
    }
  };

  const putModuleToDone = async (moduleId: string) => {
    try {
      if (currentUser !== null) {
        const response = await axiod.patch("/api/users/user", {
          id: currentUser._id,
          username: currentUser.username,
          currentLesson: currentUser.currentLesson?.map((lesson) =>
            lesson.moduleId === moduleId
              ? { ...lesson, status: "done" }
              : lesson
          ),
        });
        if (response.status !== 200) {
          throw new Error(`Failed to update user: ${response.status}`);
        }
        setCurrentUser((prev) => ({
          ...prev!,
          currentLesson: prev!.currentLesson?.map((lesson) =>
            lesson.moduleId === moduleId
              ? { ...lesson, status: "done" }
              : lesson
          ),
        }));
      } else {
        console.error("Failed to update user data");
      }
    } catch (error) {
      console.error("Error updating user data:", error);
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
    ...currentCourse,
    modules: course.modules,
  };

  const newUserObject = {
    _id: currentUser?._id || "",
    username: currentUser?.username || "",
    password: currentUser?.password || "",
    courses: currentUser?.courses || [],
    type: currentUser?.type || "student",
    updatedAt: currentUser?.updatedAt || new Date().toISOString(),
    currentLesson: currentUser?.currentLesson?.filter(
      (lesson) => lesson.courseId === (newCourseObject._id || ""),
    ) || null,
  };

  const CurrentLesson = {
    moduleId: selectedModuleData?._id || "",
    courseId: newCourseObject._id || "",
    moduleName: selectedModuleData?.name || "",
    status: "in-progress",
  };

  const isCompleted = newUserObject.currentLesson?.some((lesson) =>
    lesson.moduleId === selectedModuleData?._id &&
    lesson.status === "done"
  );

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
                {currentCourse?.name}
              </h2>
              <p className="text-gray-300 text-sm">
                {currentCourse?.description}
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
              <p className="font-medium">
                {currentUser?.username || "Usuario"}
              </p>
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
              <div className="">
                <div className="p-6 bg-gray-50">
                  <div className="max-w-1xl mx-auto">
                    <div
                      style={{ position: "sticky", top: 0 }}
                      className="bg-white rounded-xl shadow-lg overflow-hidden"
                    >
                      <div
                        className={`h-40 p-6 flex items-center justify-center text-white ${
                          getDifficultyGradient(
                            selectedModuleData?.content?.difficulty,
                          )
                        }`}
                      >
                        <div className="text-center">
                          <h3 className="text-2xl font-bold mb-2">
                            {selectedModuleData?.name}
                          </h3>
                          <div className="flex items-center justify-center space-x-4 text-sm">
                            <span className="flex items-center">
                              <i className="fas fa-book mr-1"></i>
                              {selectedModuleData?.name}
                            </span>
                            {Boolean(selectedModuleData?.content?.duration) && (
                              <span className="flex items-center">
                                <i className="fas fa-clock mr-1"></i>
                                {selectedModuleData?.content?.duration} min
                              </span>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {newUserObject.currentLesson?.find((lesson) =>
                    lesson.moduleId === selectedModuleData._id
                  )
                  ? (
                    <div>
                      <ModuleContentView
                        module={selectedModuleData}
                        isCompleted={isCompleted || false}
                        putModuleToDone={putModuleToDone}
                      />
                    </div>
                  )
                  : (
                    <div>
                      <div>Activa el modulo!</div>
                      <div>
                        <div className="fixed inset-0  backdrop-blur-[3px] bg-opacity-50 z-50 flex flex-col items-center justify-center p-4">
                          {errors && <ErrorAlert message={errors} />}
                          <div>Activa el módulo para ver los datos</div>

                          <div>
                            <button
                              type="button"
                              className={`cursor-pointer mr-5 items-center justify-center mt-20 h-15 p-2 rounded-lg bg-[${[
                                palette.primary,
                              ]}] hover:bg-gray-200 transition-colors`}
                              onClick={() =>
                                activeModuleForStudent(CurrentLesson)}
                              onKeyDown={(e) =>
                                e.key === "Escape" &&
                                setSelectedModule("intro")}
                              aria-label="Close modal"
                            >
                              Activar clase
                            </button>
                            <button
                              type="button"
                              className={`cursor-pointer  items-center justify-center mt-20 h-15 p-2 rounded-lg bg-[${[
                                palette.backgroundSoft,
                              ]}] hover:bg-gray-200 transition-colors`}
                              onClick={() => setSelectedModule("intro")}
                              onKeyDown={(e) =>
                                e.key === "Escape" &&
                                setSelectedModule("intro")}
                              aria-label="Close modal"
                            >
                              Cancelar
                            </button>
                          </div>
                        </div>
                        <pre className="bg-gray-100 p-4 rounded text-xs overflow-auto">
                      {JSON.stringify(selectedModuleData, null, 2)}
                        </pre>
                      </div>
                    </div>
                  )}
              </div>
            )
            : (
              <div className="p-6 text-center text-gray-500">
                Selecciona un módulo para ver su contenido
                <CourseDetails
                  newCourseObject={newCourseObject as Course}
                  courseName={currentCourse?.name || "Curso"}
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
