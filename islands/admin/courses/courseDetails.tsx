import { useEffect, useState } from "preact/hooks";
import { palette } from "../../../assets/colors.ts";
import { Course } from "../../../routes/api/courses/course.tsx";
import { Module } from "../../../routes/api/modules/module.tsx";
import { Student } from "../../../routes/api/users/user.tsx";
import { use } from "https://deno.land/x/i18next@v21.8.1/index.js";
import OverviewCards from "./partsOfCourseDetails/overviewCards.tsx";
import EditModule from "../module/editModule.tsx";
import ModulePreviewModal from "../module/modulePreviewModal.tsx";

type CourseRawInfo = {
  _id: string;
  name: string;
  slug: string;
  modules: string[];
  students: string[];
};

export interface CourseDetailsProps {
  readonly course: CourseRawInfo | null;
  readonly onBack: () => void;
  getStudents: () => Promise<Student[]>;
  getModules: () => Promise<Module[]>;
  token: string;
  courses: Course[];
}

function CourseDetails(
  { course, onBack, getStudents, getModules, token, courses }:
    CourseDetailsProps,
) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "modules" | "students"
  >("overview");

  const [students, setStudents] = useState<Student[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [previewModule, setPreviewModule] = useState<Module | null>(null);

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const formatDuration = (minutes: number) => {
    const hours = Math.floor(minutes / 60);
    const mins = minutes % 60;
    if (hours > 0) {
      return `${hours}h ${mins}m`;
    }
    return `${mins}m`;
  };

  const newCourseObject = {
    _id: course?._id || "",
    name: course?.name || "",
    slug: course?.slug || "",
    modules: modules?.filter((m) => course?.modules.includes(m.id)),
    students: students?.filter((m) => course?.students.includes(m._id)),
  } as Course;

  console.log("New Course Object:", newCourseObject);
  useEffect(() => {
    if (course) {
      (async () => {
        const students = await getStudents();
        const modules = await getModules();
        setStudents(students);
        setModules(modules);
      })();
    }
  }, []);
  const handleEditModule = (module: Module) => {
    setEditingModule(module);
  };

  const handleSaveModule = async (updatedModule: Module) => {
    try {
      setModules((prev) =>
        prev.map((module) =>
          module._id === updatedModule._id ? updatedModule : module
        )
      );
      setEditingModule(null);
      await getModules();
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
  };

  if (editingModule) {
    return (
      <EditModule
        module={editingModule}
        onSave={handleSaveModule}
        onCancel={handleCancelEdit}
        token={token}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-arrow-left text-gray-600"></i>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {newCourseObject?.name}
              </h1>
              <p className="text-gray-600">ID: {newCourseObject?.slug}</p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold text-[${palette.primary}]`}>
                {newCourseObject?.modules.length}
              </div>
              <p className="text-sm text-gray-600">Módulos</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-[${palette.primary}]`}>
                {newCourseObject?.students.length}
              </div>
              <p className="text-sm text-gray-600">Estudiantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "overview"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            <span className="hidden sm:inline">Resumen</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("modules")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "modules"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-book mr-2"></i>
            <span className="hidden sm:inline">Módulos</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("students")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "students"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-users mr-2"></i>
            <span className="hidden sm:inline">Estudiantes</span>
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewCards
              newCourseObject={newCourseObject}
              formatDuration={formatDuration}
            />
          )}

          {/* Modules Tab */}
          {activeTab === "modules" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Módulos del Curso</h3>
                <button
                  type="button"
                  className={`px-4 py-2 bg-[${palette.primary}] text-white rounded-lg hover:bg-[${palette.hover}] transition-colors text-sm`}
                >
                  <i className="fas fa-plus mr-2"></i> Agregar Módulo
                </button>
              </div>

              {newCourseObject?.modules.length === 0
                ? (
                  <div className="text-center py-12">
                    <i className="fas fa-book text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">
                      No hay módulos en este curso
                    </p>
                  </div>
                )
                : (
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
                    {newCourseObject?.modules.map((
                      module: Module,
                      index: number,
                    ) => (
                      <div
                        key={module.id || index}
                        className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-3">
                          <div className="flex-1">
                            <h4 className="font-semibold text-gray-800 mb-1">
                              {module.name}
                            </h4>
                            <p className="text-sm text-gray-600 line-clamp-2">
                              {module.content?.description || "Sin descripción"}
                            </p>
                          </div>
                          <div
                            className={`ml-4 px-2 py-1 rounded-full text-xs font-medium ${
                              module.isFinished
                                ? "bg-green-100 text-green-800"
                                : "bg-yellow-100 text-yellow-800"
                            }`}
                          >
                            {module.isFinished ? "Completado" : "Pendiente"}
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-3">
                          {module.content?.difficulty && (
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                getDifficultyColor(module.content.difficulty)
                              }`}
                            >
                              {module.content.difficulty}
                            </span>
                          )}
                          {Boolean(module.content?.duration) && (
                            <span className="px-2 py-1 bg-blue-100 text-blue-800 rounded-full text-xs font-medium">
                              <i className="fas fa-clock mr-1"></i>
                              {formatDuration(
                                parseInt(module.content.duration),
                              )}
                            </span>
                          )}
                        </div>

                        <div className="flex flex-col sm:flex-row gap-2">
                          <button
                            type="button"
                            onClick={() => setPreviewModule(module)}
                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm transition-colors"
                          >
                            <i className="fas fa-eye mr-2"></i> Ver Detalles
                          </button>
                          <button
                            type="button"
                            onClick={() => handleEditModule(module)}
                            className="flex-1 px-3 py-2 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded text-sm transition-colors"
                          >
                            <i className="fas fa-edit mr-2"></i> Editar
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
                <h3 className="text-lg font-semibold">Estudiantes Inscritos</h3>
                <button
                  type="button"
                  className={`px-4 py-2 bg-[${palette.primary}] text-white rounded-lg hover:bg-[${palette.hover}] transition-colors text-sm`}
                >
                  <i className="fas fa-user-plus mr-2"></i> Agregar Estudiante
                </button>
              </div>

              {newCourseObject?.students.length === 0
                ? (
                  <div className="text-center py-12">
                    <i className="fas fa-users text-4xl text-gray-300 mb-4"></i>
                    <p className="text-gray-500">
                      No hay estudiantes inscritos en este curso
                    </p>
                  </div>
                )
                : (
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {newCourseObject?.students.map((
                      student: Student,
                      index: number,
                    ) => (
                      <div
                        key={student.id || index}
                        className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-center mb-3">
                          <div
                            className={`w-10 h-10 rounded-full bg-gradient-to-br from-[${palette.primary}] to-[${palette.hover}] flex items-center justify-center text-white font-semibold`}
                          >
                            {student?.username?.charAt(0).toUpperCase()}
                          </div>
                          <div className="ml-3 flex-1">
                            <h4 className="font-semibold text-gray-800">
                              {student?.username}
                            </h4>
                            <p className="text-sm text-gray-600">
                              ID: {student.id}
                            </p>
                          </div>
                        </div>

                        <div className="space-y-2">
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">
                              Cursos totales:
                            </span>
                            <span className="font-medium">
                              {student.courses?.length || 0}
                            </span>
                          </div>
                          <div className="flex justify-between text-sm">
                            <span className="text-gray-600">Tipo:</span>
                            <span
                              className={`px-2 py-1 rounded-full text-xs font-medium ${
                                student.type === "admin"
                                  ? "bg-red-100 text-red-800"
                                  : "bg-blue-100 text-blue-800"
                              }`}
                            >
                              {student.type}
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 flex gap-2">
                          <button
                            type="button"
                            className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm transition-colors"
                          >
                            <i className="fas fa-eye mr-2"></i> Ver Perfil
                          </button>
                          <button
                            type="button"
                            className="px-3 py-2 bg-red-50 hover:bg-red-100 text-red-700 rounded text-sm transition-colors"
                          >
                            <i className="fas fa-user-minus"></i>
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
            </div>
          )}
        </div>
      </div>

      {previewModule && (
        <ModulePreviewModal
          module={previewModule}
          isOpen={Boolean(previewModule)}
          onClose={() => setPreviewModule(null)}
          courses={courses}
        />
      )}
    </div>
  );
}

export default CourseDetails;
