import { StateUpdater } from "preact/hooks/src/index.d.ts";
import { Module } from "../../../../routes/api/modules/module.tsx";
import { Course } from "../../../../types/course.ts";
import ModuleModal from "../../module/modalToCreateModule.tsx";

type ModuleProps = {
  createModule: (moduleData: any) => void;
  isModuleCreated: boolean;
  newCourseObjectSelect: { _id: string; name: string };
  isModuleError: string;
  newCourseObject: Course;
  setPreviewModule: (value: StateUpdater<Module | null>) => void;
  formatDuration: (minutes: number) => string;
  handleEditModule: (module: Module) => void;
};

export const getDifficultyColor = (difficulty: string) => {
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

const ModulesTab = (
  {
    createModule,
    isModuleCreated,
    newCourseObjectSelect,
    isModuleError,
    newCourseObject,
    setPreviewModule,
    formatDuration,
    handleEditModule,
  }: ModuleProps,
) => {
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Módulos del Curso</h3>

        <ModuleModal
          createModule={createModule}
          isModuleCreated={isModuleCreated}
          courses={[newCourseObjectSelect]}
          isModuleError={isModuleError}
        />
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
  );
};

export default ModulesTab;
