import { useEffect, useState } from "preact/hooks";
import type { Module } from "../../../routes/api/modules/module.tsx";
import type { Course } from "../../../routes/api/courses/course.tsx";
import EditModule from "./editModule.tsx";
import ModuleModal from "./modalToCreateModule.tsx";
import ModulePreviewModal from "./modulePreviewModal.tsx";

interface ModuleData {
  name: string;
  course: string;
}

interface ModulesViewProps {
  token: string;
  courses: Course[];
  createModule: (moduleData: ModuleData) => void;
  isModuleCreated: boolean;
  isModuleError: string;
}

const ModulesView = (
  { token, courses, createModule, isModuleCreated, isModuleError }:
    ModulesViewProps,
) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [previewModule, setPreviewModule] = useState<Module | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");

  const getDifficultyClass = (difficulty?: string) => {
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

  const fetchAllModules = async () => {
    try {
      setLoading(true);
      // Obtener todos los módulos desde el API
      const response = await fetch("/api/modules/module", {
        headers: {
          "Authorization": `Bearer ${token}`,
        },
      });

      if (response.ok) {
        const data = await response.json();
        setModules(data);
      } else {
        console.error("Error fetching modules");
      }
    } catch (error) {
      console.error("Error fetching modules:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchAllModules();
  }, []);

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
  };

  const handleSaveModule = async (updatedModule: Module) => {
    try {
      // Actualizar la lista local
      setModules((prev) =>
        prev.map((module) =>
          module._id === updatedModule._id ? updatedModule : module
        )
      );
      setEditingModule(null);
      // Refrescar la lista
      await fetchAllModules();
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
  };

  // Filtrar módulos basado en búsqueda y curso
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      module.course.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCourse = filterCourse === "all" ||
      module.course === filterCourse;
    return matchesSearch && matchesCourse;
  });

  const findCourse = (courseId: string) => {
    return courses.find((course) => course._id === courseId);
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
    <div className="p-6">
      <div className="flex justify-between items-center mb-6">
        <ModuleModal
          createModule={createModule}
          isModuleCreated={isModuleCreated}
          courses={courses}
          isModuleError={isModuleError}
        />
        <h2 className="text-2xl font-bold text-gray-800">Gestión de Módulos</h2>
        <div className="text-sm text-gray-500">
          {filteredModules.length} de {modules.length} módulos
        </div>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label
              htmlFor="search-modules"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Buscar módulos
            </label>
            <input
              id="search-modules"
              type="text"
              value={searchTerm}
              onChange={(e) =>
                setSearchTerm((e.target as HTMLInputElement).value)}
              placeholder="Buscar por nombre o curso..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
          <div>
            <label
              htmlFor="filter-course"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Filtrar por curso
            </label>
            <select
              id="filter-course"
              value={filterCourse}
              onChange={(e) =>
                setFilterCourse((e.target as HTMLSelectElement).value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="all">Todos los cursos</option>
              {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Lista de módulos */}
      {loading
        ? (
          <div className="flex justify-center items-center h-64">
            <div className="text-gray-500">Cargando módulos...</div>
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredModules.map((module) => (
              <div
                key={module._id || module.id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2">
                      {module.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full ${
                        getDifficultyClass(module.content?.difficulty)
                      }`}
                    >
                      {module.content?.difficulty || "Sin definir"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-book mr-2"></i>
                      <span className="font-medium">
                        {findCourse(module.course)?.name || module.course}
                      </span>
                    </div>

                    {module.content?.duration && (
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-clock mr-2"></i>
                        <span>{module.content.duration} minutos</span>
                      </div>
                    )}

                    {module.content?.description && (
                      <p className="text-sm text-gray-600 line-clamp-2">
                        {module.content.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center">
                    <div className="flex items-center space-x-2">
                      {module.content?.videoUrl && (
                        <i
                          className="fas fa-video text-blue-500"
                          title="Tiene video"
                        >
                        </i>
                      )}
                      {module.content?.materials &&
                        module.content.materials.length > 0 && (
                        <i
                          className="fas fa-paperclip text-green-500"
                          title="Tiene materiales"
                        >
                        </i>
                      )}
                      {module.content?.exercises &&
                        module.content.exercises.length > 0 && (
                        <i
                          className="fas fa-tasks text-purple-500"
                          title="Tiene ejercicios"
                        >
                        </i>
                      )}
                    </div>

                    <div className="flex justify-between items-center space-x-2">
                      <button
                        type="button"
                        onClick={() => setPreviewModule(module)}
                        className="flex-1 px-3 py-2 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors"
                        title="Vista previa del módulo"
                      >
                        <i className="fas fa-eye mr-1"></i>
                        <span>Vista previa</span>
                      </button>
                      <button
                        type="button"
                        onClick={() => handleEditModule(module)}
                        className="flex-1 px-3 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        <i className="fas fa-edit mr-1"></i>
                        <span>Editar</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {filteredModules.length === 0 && !loading && (
        <div className="text-center py-12">
          <i className="fas fa-puzzle-piece text-gray-400 text-6xl mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron módulos
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterCourse !== "all"
              ? "Intenta ajustar los filtros de búsqueda"
              : "Aún no hay módulos creados"}
          </p>
        </div>
      )}

      {/* Modal de vista previa */}
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
};

export default ModulesView;
