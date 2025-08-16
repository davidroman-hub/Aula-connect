import type { Module } from "../../routes/api/modules/module.tsx";

interface ModuleCardProps {
  module: Module;
  onPreview: (module: Module) => void;
  onEnroll: (moduleId: string) => void;
  isEnrolled: boolean;
  courseName?: string;
}

const ModuleCard = (
  { module, onPreview, onEnroll, isEnrolled, courseName }: ModuleCardProps,
) => {
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

  const getModuleId = (module: Module): string => {
    return String(module._id || module.id || "");
  };

  const hasContent = (contentArray?: unknown[]) => {
    return contentArray && contentArray.length > 0;
  };

  return (
    <div className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-100 overflow-hidden">
      {/* Header con gradient */}
      <div className="bg-gradient-to-r from-blue-500 to-purple-600 p-4 text-white">
        <div className="flex justify-between items-start">
          <h3 className="text-lg font-bold line-clamp-2 flex-1 mr-2">
            {module.name}
          </h3>
          <span
            className={`px-3 py-1 text-xs rounded-full border-2 border-white/20 backdrop-blur-sm`}
          >
            {getDifficultyIcon(module.content?.difficulty)}{" "}
            {module.content?.difficulty || "Sin definir"}
          </span>
        </div>

        {courseName && (
          <div className="flex items-center mt-2 text-blue-100">
            <span className="fas fa-book mr-2 text-sm" aria-hidden="true">
            </span>
            <span className="text-sm font-medium">{courseName}</span>
          </div>
        )}
      </div>

      {/* Contenido */}
      <div className="p-6">
        {/* Descripción */}
        {module.content?.description && (
          <p className="text-gray-600 text-sm line-clamp-3 mb-4 leading-relaxed">
            {module.content.description}
          </p>
        )}

        {/* Estadísticas del módulo */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          {Boolean(module.content?.duration) && (
            <div className="flex items-center text-sm text-gray-500">
              <span
                className="fas fa-clock mr-2 text-blue-500"
                aria-hidden="true"
              >
              </span>
              <span>{module.content?.duration} min</span>
            </div>
          )}

          {module.content?.objectives && module.content.objectives.length > 0 &&
            (
              <div className="flex items-center text-sm text-gray-500">
                <span
                  className="fas fa-bullseye mr-2 text-green-500"
                  aria-hidden="true"
                >
                </span>
                <span>{module.content.objectives.length} objetivos</span>
              </div>
            )}
        </div>

        {/* Iconos de contenido disponible */}
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center space-x-3">
            {Boolean(module.content?.videoUrl) && (
              <div className="flex items-center bg-red-50 px-2 py-1 rounded-lg">
                <span
                  className="fas fa-video text-red-500 text-sm mr-1"
                  aria-hidden="true"
                >
                </span>
                <span className="text-xs text-red-700 font-medium">Video</span>
              </div>
            )}

            {hasContent(module.content?.materials) && (
              <div className="flex items-center bg-green-50 px-2 py-1 rounded-lg">
                <span
                  className="fas fa-paperclip text-green-500 text-sm mr-1"
                  aria-hidden="true"
                >
                </span>
                <span className="text-xs text-green-700 font-medium">
                  {module.content?.materials?.length} materiales
                </span>
              </div>
            )}

            {hasContent(module.content?.exercises) && (
              <div className="flex items-center bg-purple-50 px-2 py-1 rounded-lg">
                <span
                  className="fas fa-tasks text-purple-500 text-sm mr-1"
                  aria-hidden="true"
                >
                </span>
                <span className="text-xs text-purple-700 font-medium">
                  {module.content?.exercises?.length} ejercicios
                </span>
              </div>
            )}
          </div>
        </div>

        {/* Botones de acción */}
        <div className="flex space-x-3">
          <button
            type="button"
            onClick={() => onPreview(module)}
            className="flex-1 px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
          >
            <span className="fas fa-eye mr-2" aria-hidden="true"></span>
            <span>Vista previa</span>
          </button>

          {isEnrolled
            ? (
              <div className="flex-1 px-4 py-2 bg-green-100 text-green-700 rounded-lg text-center text-sm font-medium">
                <span className="fas fa-check mr-2" aria-hidden="true"></span>
                <span>Inscrito</span>
              </div>
            )
            : (
              <button
                type="button"
                onClick={() => onEnroll(getModuleId(module))}
                className="flex-1 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors text-sm font-medium"
              >
                <span className="fas fa-plus mr-2" aria-hidden="true"></span>
                <span>Inscribirse</span>
              </button>
            )}
        </div>
      </div>

      {/* Footer con progreso (si está inscrito) */}
      {isEnrolled && (
        <div className="bg-gray-50 px-6 py-3 border-t border-gray-100">
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-600">Progreso:</span>
            <div className="flex items-center">
              <div className="w-20 bg-gray-200 rounded-full h-2 mr-2">
                <div
                  className="bg-green-500 h-2 rounded-full"
                  style={{ width: "45%" }}
                >
                </div>
              </div>
              <span className="text-gray-700 font-medium">45%</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleCard;
