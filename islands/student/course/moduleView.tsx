import { renderEditorJSContent } from "../../../lib/editorJSRenderer.tsx";
import { renderFormattedNotesPreview } from "../../../lib/notesRenderer.tsx";
import {
  getDifficultyBadgeClass,
} from "../../admin/module/modulePreviewModal.tsx";
import { ModuleData } from "./selectedCourse.tsx";
import { palette } from "../../../assets/colors.ts";
import ClickOk from "./clickOk.tsx";
import { renderVideoPlayer } from "../../helpers/renderVideo.tsx";

type ModuleContentViewProps = {
  module: ModuleData | undefined;
  isCompleted: boolean;
  putModuleToDone: (moduleId: string) => void;
  isOk?: boolean;
};
const ModuleContentView = (
  { module, isCompleted, putModuleToDone, isOk }: ModuleContentViewProps,
) => {
  const renderFormattedNotes = (notes?: string) => {
    if (!notes) return null;

    // Detectar si el contenido es JSON de EditorJS
    try {
      const parsed = JSON.parse(notes);
      if (parsed.blocks && Array.isArray(parsed.blocks)) {
        // Es contenido de EditorJS
        return renderEditorJSContent(parsed);
      }
    } catch {
      // No es JSON válido, continuar con el procesamiento original
    }

    // Detectar si el contenido es HTML
    const isHTML = notes.includes("<h1>") || notes.includes("<h2>") ||
      notes.includes("<p>") || notes.includes("<div>") ||
      notes.includes("<strong>");

    if (isHTML) {
      // Usar la función del notesRenderer para HTML
      return renderFormattedNotesPreview(notes, "html");
    } else {
      // Usar la función del notesRenderer para markdown o texto
      return renderFormattedNotesPreview(notes, "markdown");
    }
  };

  return (
    <div className="max-h-[calc(95vh-120px)]">
      <div className="p-6 bg-gray-50">
        <div className="max-w-1xl mx-auto">
          <div className="bg-white rounded-xl shadow-lg overflow-hidden">
            {/* Contenido del módulo */}
            <div className="p-6">
              {/* Badge de dificultad */}
              <div className="flex items-center justify-between mb-4">
                <span
                  className={`px-3 py-1 text-sm rounded-full font-medium ${
                    getDifficultyBadgeClass(module?.content?.difficulty)
                  }`}
                >
                  {module?.content?.difficulty || "Sin definir"}
                </span>
                <div className="text-sm text-gray-500">
                  Módulo #{module?._id?.slice(-6) || "------"}
                </div>
              </div>
              {/* Descripción */}
              {module?.content?.description && (
                <div className="mb-6">
                  <h4 className="text-lg font-semibold text-gray-800 mb-2">
                    Descripción
                  </h4>
                  <p className="text-gray-600 leading-relaxed">
                    {module.content.description}
                  </p>
                </div>
              )}

              {/* Contenido y recursos */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                {/* Video */}
                {module?.content?.videoUrl && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-video text-blue-500 mr-2"></i>
                      <h5 className="font-semibold text-gray-800">
                        Video del módulo
                      </h5>
                    </div>
                    <div className="rounded-lg overflow-hidden">
                      {renderVideoPlayer(module.content.videoUrl)}
                    </div>
                  </div>
                )}

                {/* Materiales */}
                {module?.content?.materials &&
                  module.content.materials.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-paperclip text-green-500 mr-2">
                      </i>
                      <h5 className="font-semibold text-gray-800">
                        Materiales ({module.content.materials.length})
                      </h5>
                    </div>
                    <ul className="space-y-1">
                      {module.content.materials.slice(0, 3).map((
                        _material,
                        index,
                      ) => (
                        <li
                          key={`material-${index}-${_material.title || index}`}
                          className="text-sm text-gray-600 flex items-center"
                        >
                          <i className="fas fa-file text-xs mr-2"></i>
                          Material {index + 1}
                        </li>
                      ))}
                      {module.content.materials.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{module.content.materials.length - 3} más...
                        </li>
                      )}
                    </ul>
                  </div>
                )}
                {/* Objetivos */}
                {module?.content?.objectives &&
                  module.content.objectives.length > 0 && (
                  <div className="bg-gray-50 rounded-lg p-4">
                    <div className="flex items-center mb-2">
                      <i className="fas fa-bullseye text-yellow-500 mr-2">
                      </i>
                      <h5 className="font-semibold text-gray-800">
                        Objetivos
                      </h5>
                    </div>
                    <ul className="space-y-1">
                      {module.content.objectives.slice(0, 3).map((
                        objective: string,
                        index: number,
                      ) => (
                        <li
                          key={`objective-${objective.slice(0, 10)}-${index}`}
                          className="text-sm text-gray-600 flex items-start"
                        >
                          <i className="fas fa-arrow-right text-xs mr-2 mt-1">
                          </i>
                          <span>{objective}</span>
                        </li>
                      ))}
                      {module.content.objectives.length > 3 && (
                        <li className="text-sm text-gray-500">
                          +{module.content.objectives.length - 3} más...
                        </li>
                      )}
                    </ul>
                  </div>
                )}
              </div>
              {/* Contenido del editor */}
              {module?.content?.notes && (
                <div className="mt-4 bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <i className="fas fa-file-text text-blue-500 mr-2"></i>
                    <span>Contenido de la Clase</span>
                  </h5>
                  <div className="bg-white rounded-lg p-4 border border-gray-200">
                    {renderFormattedNotes(module.content?.notes)}
                  </div>
                </div>
              )}

              <div>
                <div class="w-10 h-10 ml-2">
                  <ClickOk isOk={!!isOk} />
                </div>
                <button
                  type="button"
                  disabled={isCompleted}
                  className={`${
                    !isCompleted ? "cursor-pointer" : "cursor-not-allowed"
                  } mt-4 items-center justify-center h-15 p-2 rounded-lg bg-[${[
                    isCompleted ? palette.backgroundSoft : palette.primary,
                  ]}] hover:bg-gray-200 transition-colors`}
                  onClick={() => putModuleToDone(module?._id || "")}
                >
                  {isCompleted ? "Módulo completado" : "Marcar como completado"}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ModuleContentView;
