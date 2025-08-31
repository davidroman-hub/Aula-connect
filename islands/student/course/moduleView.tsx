import { renderEditorJSContent } from "../../../lib/editorJSRenderer.tsx";
import { renderFormattedNotesPreview } from "../../../lib/notesRenderer.tsx";
import {
  getDifficultyBadgeClass,
} from "../../admin/module/modulePreviewModal.tsx";
import { ModuleData } from "./selectedCourse.tsx";
import { palette } from "../../../assets/colors.ts";
import ClickOk from "./clickOk.tsx";
import { renderVideoPlayer } from "../../helpers/renderVideo.tsx";
import { useState } from "preact/hooks";

interface Exercise {
  title: string;
  description?: string;
  instructions?: string;
  resources?: string[];
  type?: string;
}

type ModuleContentViewProps = {
  module: ModuleData | undefined;
  isCompleted: boolean;
  putModuleToDone: (moduleId: string) => void;
  isOk?: boolean;
};
const ModuleContentView = (
  { module, isCompleted, putModuleToDone, isOk }: ModuleContentViewProps,
) => {
  const [selectedExercise, setSelectedExercise] = useState<Exercise | null>(
    null,
  );
  const [isExerciseModalOpen, setIsExerciseModalOpen] = useState(false);

  const handleExerciseClick = (exercise: Exercise) => {
    setSelectedExercise(exercise);
    setIsExerciseModalOpen(true);
  };

  const closeExerciseModal = () => {
    setSelectedExercise(null);
    setIsExerciseModalOpen(false);
  };
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
                    <ul className="space-y-2">
                      {module.content.materials.map((material, index) => (
                        <li
                          key={`material-${
                            material.title || material.url || index
                          }`}
                          className="text-sm"
                        >
                          {material.url
                            ? (
                              <a
                                href={material.url}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center text-blue-600 hover:text-blue-800 hover:underline transition-colors p-2 rounded-lg hover:bg-blue-50"
                              >
                                <i className="fas fa-external-link-alt text-xs mr-2">
                                </i>
                                <span className="font-medium">
                                  {material.title || `Material ${index + 1}`}
                                </span>
                                {material.description && (
                                  <span className="text-gray-500 ml-2 text-xs">
                                    - {material.description}
                                  </span>
                                )}
                              </a>
                            )
                            : (
                              <div className="flex items-center text-gray-600 p-2">
                                <i className="fas fa-file text-xs mr-2"></i>
                                <span>
                                  {material.title || `Material ${index + 1}`}
                                </span>
                                {material.description && (
                                  <span className="text-gray-500 ml-2 text-xs">
                                    - {material.description}
                                  </span>
                                )}
                              </div>
                            )}
                        </li>
                      ))}
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

              {/* Sección de Ejercicios */}
              {module?.content?.exercises &&
                module.content.exercises.length > 0 && (
                <div className="mt-6 bg-gray-50 rounded-lg p-4">
                  <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                    <i className="fas fa-dumbbell text-purple-500 mr-2"></i>
                    <span>Ejercicios ({module.content.exercises.length})</span>
                  </h5>
                  <div className="grid gap-3">
                    {module.content.exercises.map((exercise, index) => (
                      <button
                        type="button"
                        key={`exercise-${exercise.title}-${index}`}
                        className="bg-white rounded-lg p-4 border border-gray-200 hover:border-purple-300 transition-colors hover:shadow-sm text-left w-full"
                        onClick={() => handleExerciseClick(exercise)}
                      >
                        <div className="flex items-center justify-between">
                          <h6 className="font-medium text-gray-800 flex items-center">
                            <i className="fas fa-play-circle text-purple-500 mr-2">
                            </i>
                            {exercise.title}
                          </h6>
                          <i className="fas fa-chevron-right text-gray-400 text-sm">
                          </i>
                        </div>
                        {exercise.description && (
                          <p className="text-sm text-gray-600 mt-2 line-clamp-2">
                            {exercise.description}
                          </p>
                        )}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Modal de Ejercicio */}
              {isExerciseModalOpen && selectedExercise && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
                  <div className="bg-white rounded-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
                    <div className="p-6">
                      <div className="flex items-center justify-between mb-4">
                        <h3 className="text-xl font-bold text-gray-800 flex items-center">
                          <i className="fas fa-dumbbell text-purple-500 mr-2">
                          </i>
                          {selectedExercise.title}
                        </h3>
                        <button
                          type="button"
                          onClick={closeExerciseModal}
                          className="text-gray-400 hover:text-gray-600 transition-colors"
                        >
                          <i className="fas fa-times text-lg"></i>
                        </button>
                      </div>

                      {selectedExercise.description && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Descripción
                          </h4>
                          <p className="text-gray-600 leading-relaxed">
                            {selectedExercise.description}
                          </p>
                        </div>
                      )}

                      {selectedExercise.instructions && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Instrucciones
                          </h4>
                          <div className="bg-blue-50 rounded-lg p-4 border-l-4 border-blue-400">
                            <p className="text-gray-700 leading-relaxed">
                              {selectedExercise.instructions}
                            </p>
                          </div>
                        </div>
                      )}

                      {selectedExercise.resources &&
                        selectedExercise.resources.length > 0 && (
                        <div className="mb-4">
                          <h4 className="font-semibold text-gray-800 mb-2">
                            Recursos
                          </h4>
                          <ul className="space-y-2">
                            {selectedExercise.resources.map((
                              resource,
                              index,
                            ) => (
                              <li
                                key={`resource-${
                                  resource.slice(0, 10)
                                }-${index}`}
                                className="flex items-center text-gray-600"
                              >
                                <i className="fas fa-link text-blue-500 mr-2">
                                </i>
                                <span>{resource}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      <div className="flex justify-end pt-4 border-t border-gray-200">
                        <button
                          type="button"
                          onClick={closeExerciseModal}
                          className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 transition-colors"
                        >
                          Cerrar
                        </button>
                      </div>
                    </div>
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
