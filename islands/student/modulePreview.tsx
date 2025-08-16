import { useEffect, useState } from "preact/hooks";
import type { Module } from "../../routes/api/modules/module.tsx";

interface Course {
  id?: string;
  _id?: string;
  name: string;
}

interface ModulePreviewProps {
  token: string;
  courses: Course[];
  studentId?: string;
}

const ModulePreview = ({ token, courses, studentId }: ModulePreviewProps) => {
  const [modules, setModules] = useState<Module[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [filterCourse, setFilterCourse] = useState("all");
  const [filterDifficulty, setFilterDifficulty] = useState("all");
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [enrolledModules] = useState<string[]>([]);

  // Helper function para obtener clases CSS de dificultad
  const getDifficultyClass = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800 border-green-200";
      case "intermediate":
        return "bg-yellow-100 text-yellow-800 border-yellow-200";
      case "advanced":
        return "bg-red-100 text-red-800 border-red-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const getDifficultyIcon = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
        return "🟢";
      case "intermediate":
        return "🟡";
      case "advanced":
        return "🔴";
      default:
        return "⚪";
    }
  };

  useEffect(() => {
    fetchAvailableModules();
  }, []);

  const fetchAvailableModules = async () => {
    try {
      setLoading(true);
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

  const handleModulePreview = (module: Module) => {
    setSelectedModule(module);
  };

  const handleClosePreview = () => {
    setSelectedModule(null);
  };

  const getModuleId = (module: Module): string => {
    return String(module._id || module.id || "");
  };

  // Filtrar módulos basado en búsqueda, curso y dificultad
  const filteredModules = modules.filter((module) => {
    const matchesSearch =
      module.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (module.content?.description?.toLowerCase().includes(
        searchTerm.toLowerCase(),
      ) ?? false);

    const matchesCourse = filterCourse === "all" ||
      module.course === filterCourse;

    const matchesDifficulty = filterDifficulty === "all" ||
      module.content?.difficulty === filterDifficulty;

    return matchesSearch && matchesCourse && matchesDifficulty;
  });

  const findCourse = (courseId: string) => {
    return courses.find((course) =>
      course._id === courseId || course.id === courseId
    );
  };

  const isEnrolled = (moduleId: string) => {
    return enrolledModules.includes(moduleId);
  };

  // Modal de vista previa detallada
  if (selectedModule) {
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
        <div className="bg-white rounded-xl max-w-4xl w-full max-h-[90vh] overflow-y-auto">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-2xl font-bold text-gray-800 mb-2">
                  {selectedModule.name}
                </h2>
                <div className="flex items-center space-x-4">
                  <span
                    className={`px-3 py-1 text-sm rounded-full border ${
                      getDifficultyClass(selectedModule.content?.difficulty)
                    }`}
                  >
                    {getDifficultyIcon(selectedModule.content?.difficulty)}{" "}
                    {selectedModule.content?.difficulty || "Sin definir"}
                  </span>
                  <span className="text-sm text-gray-600">
                    {findCourse(selectedModule.course)?.name ||
                      selectedModule.course}
                  </span>
                </div>
              </div>
              <button
                type="button"
                onClick={handleClosePreview}
                className="text-gray-400 hover:text-gray-600 text-2xl"
              >
                ×
              </button>
            </div>
          </div>

          <div className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Contenido principal */}
              <div className="lg:col-span-2">
                {selectedModule.content?.description && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">Descripción</h3>
                    <p className="text-gray-700 leading-relaxed">
                      {selectedModule.content.description}
                    </p>
                  </div>
                )}

                {selectedModule.content?.objectives &&
                  selectedModule.content.objectives.length > 0 && (
                  <div className="mb-6">
                    <h3 className="text-lg font-semibold mb-3">
                      Objetivos de aprendizaje
                    </h3>
                    <ul className="space-y-2">
                      {selectedModule.content.objectives.map((
                        objective,
                        index,
                      ) => (
                        <li
                          key={`objective-${objective.slice(0, 10)}-${index}`}
                          className="flex items-start"
                        >
                          <span className="text-green-500 mr-2">✓</span>
                          <span className="text-gray-700">{objective}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              {/* Información lateral */}
              <div className="lg:col-span-1">
                <div className="bg-gray-50 rounded-lg p-4 space-y-4">
                  <h3 className="font-semibold text-gray-800">
                    Información del módulo
                  </h3>

                  {Boolean(selectedModule.content?.duration) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-clock mr-2 text-blue-500"></i>
                      <span>{selectedModule.content?.duration} minutos</span>
                    </div>
                  )}

                  {Boolean(selectedModule.content?.videoUrl) && (
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-video mr-2 text-red-500"></i>
                      <span>Incluye contenido en video</span>
                    </div>
                  )}

                  {selectedModule.content?.materials &&
                    selectedModule.content.materials.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-paperclip mr-2 text-green-500"></i>
                      <span>
                        {selectedModule.content.materials.length}{" "}
                        materiales adicionales
                      </span>
                    </div>
                  )}

                  {selectedModule.content?.exercises &&
                    selectedModule.content.exercises.length > 0 && (
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-tasks mr-2 text-purple-500"></i>
                      <span>
                        {selectedModule.content.exercises.length}{" "}
                        ejercicios prácticos
                      </span>
                    </div>
                  )}

                  <div className="pt-4 border-t border-gray-200">
                    {isEnrolled(getModuleId(selectedModule))
                      ? (
                        <button
                          type="button"
                          disabled
                          className="w-full px-4 py-2 bg-gray-300 text-gray-500 rounded-lg cursor-not-allowed"
                        >
                          Ya inscrito
                        </button>
                      )
                      : (
                        <button
                          type="button"
                          className="w-full px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Inscribirse al módulo
                        </button>
                      )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">
          Módulos Disponibles
        </h1>
        <p className="text-gray-600">
          Explora los módulos de aprendizaje disponibles
        </p>
      </div>

      {/* Filtros y búsqueda */}
      <div className="bg-white rounded-lg shadow p-4 mb-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
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
              placeholder="Buscar por nombre o descripción..."
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
                <option
                  key={course.id || course._id}
                  value={course.id || course._id}
                >
                  {course.name}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label
              htmlFor="filter-difficulty"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Nivel de dificultad
            </label>
            <select
              id="filter-difficulty"
              value={filterDifficulty}
              onChange={(e) =>
                setFilterDifficulty((e.target as HTMLSelectElement).value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            >
              <option value="all">Todos los niveles</option>
              <option value="beginner">🟢 Principiante</option>
              <option value="intermediate">🟡 Intermedio</option>
              <option value="advanced">🔴 Avanzado</option>
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
                key={getModuleId(module)}
                className="bg-white rounded-lg shadow-md hover:shadow-xl transition-all duration-300 border border-gray-200"
              >
                <div className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="text-lg font-semibold text-gray-800 line-clamp-2 flex-1 mr-2">
                      {module.name}
                    </h3>
                    <span
                      className={`px-2 py-1 text-xs rounded-full border ${
                        getDifficultyClass(module.content?.difficulty)
                      }`}
                    >
                      {getDifficultyIcon(module.content?.difficulty)}{" "}
                      {module.content?.difficulty || "Sin definir"}
                    </span>
                  </div>

                  <div className="space-y-2 mb-4">
                    <div className="flex items-center text-sm text-gray-600">
                      <i className="fas fa-book mr-2 text-blue-500"></i>
                      <span className="font-medium">
                        {findCourse(module.course)?.name || module.course}
                      </span>
                    </div>

                    {Boolean(module.content?.duration) && (
                      <div className="flex items-center text-sm text-gray-600">
                        <i className="fas fa-clock mr-2 text-green-500"></i>
                        <span>{module.content?.duration} minutos</span>
                      </div>
                    )}

                    {module.content?.description && (
                      <p className="text-sm text-gray-600 line-clamp-3 mt-2">
                        {module.content.description}
                      </p>
                    )}
                  </div>

                  <div className="flex justify-between items-center pt-4 border-t border-gray-100">
                    <div className="flex items-center space-x-2">
                      {Boolean(module.content?.videoUrl) && (
                        <i
                          className="fas fa-video text-red-500"
                          title="Incluye video"
                        >
                        </i>
                      )}
                      {module.content?.materials &&
                        module.content.materials.length > 0 && (
                        <i
                          className="fas fa-paperclip text-green-500"
                          title="Incluye materiales"
                        >
                        </i>
                      )}
                      {module.content?.exercises &&
                        module.content.exercises.length > 0 && (
                        <i
                          className="fas fa-tasks text-purple-500"
                          title="Incluye ejercicios"
                        >
                        </i>
                      )}
                    </div>

                    <div className="flex space-x-2">
                      <button
                        type="button"
                        onClick={() => handleModulePreview(module)}
                        className="px-3 py-1 bg-gray-100 text-gray-700 text-sm rounded hover:bg-gray-200 transition-colors"
                      >
                        Vista previa
                      </button>
                      {isEnrolled(getModuleId(module))
                        ? (
                          <span className="px-3 py-1 bg-green-100 text-green-700 text-sm rounded">
                            Inscrito
                          </span>
                        )
                        : (
                          <button
                            type="button"
                            className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700 transition-colors"
                          >
                            Inscribirse
                          </button>
                        )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

      {filteredModules.length === 0 && !loading && (
        <div className="text-center py-12">
          <i className="fas fa-search text-gray-400 text-6xl mb-4"></i>
          <h3 className="text-xl font-semibold text-gray-600 mb-2">
            No se encontraron módulos
          </h3>
          <p className="text-gray-500">
            {searchTerm || filterCourse !== "all" || filterDifficulty !== "all"
              ? "Intenta ajustar los filtros de búsqueda"
              : "Aún no hay módulos disponibles"}
          </p>
        </div>
      )}
    </div>
  );
};

export default ModulePreview;
