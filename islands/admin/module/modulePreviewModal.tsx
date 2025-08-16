import type { Module } from "../../../routes/api/modules/module.tsx";
import type { Course } from "../../../routes/api/courses/course.tsx";

interface ModulePreviewModalProps {
  module: Module;
  isOpen: boolean;
  onClose: () => void;
  courses: Course[];
}

const ModulePreviewModal = (
  { module, isOpen, onClose, courses }: ModulePreviewModalProps,
) => {
  if (!isOpen) return null;

  // Función para renderizar formato inline de manera simple
  const renderInlineFormatting = (text: string) => {
    // Si no hay formato especial, devolver el texto tal como está
    if (!text.includes("**") && !text.includes("*") && !text.includes("`")) {
      return text;
    }

    const parts = [];
    const segments = text.split(/(\*\*.*?\*\*|\*.*?\*|`.*?`)/);

    for (let i = 0; i < segments.length; i++) {
      const segment = segments[i];

      if (segment.startsWith("**") && segment.endsWith("**")) {
        // Negrita
        const content = segment.slice(2, -2);
        parts.push(
          <strong
            key={`bold-${content.slice(0, 8)}-${i}`}
            className="font-semibold"
          >
            {content}
          </strong>,
        );
      } else if (
        segment.startsWith("*") && segment.endsWith("*") &&
        !segment.startsWith("**")
      ) {
        // Cursiva
        const content = segment.slice(1, -1);
        parts.push(
          <em key={`italic-${content.slice(0, 8)}-${i}`} className="italic">
            {content}
          </em>,
        );
      } else if (segment.startsWith("`") && segment.endsWith("`")) {
        // Código
        const content = segment.slice(1, -1);
        parts.push(
          <code
            key={`code-${content.slice(0, 8)}-${i}`}
            className="bg-gray-100 px-1 py-0.5 rounded text-sm font-mono"
          >
            {content}
          </code>,
        );
      } else if (segment) {
        // Texto normal
        parts.push(segment);
      }
    }

    return parts.length > 1 ? parts : text;
  };

  // Función para renderizar las notas con formato
  const renderFormattedNotes = (notes?: string) => {
    if (!notes) return null;

    // Detectar si el contenido parece ser Markdown
    const isMarkdown = notes.includes("# ") || notes.includes("## ") ||
      notes.includes("**") || notes.includes("- ");

    if (isMarkdown) {
      // Para contenido Markdown, aplicar estilos básicos
      return (
        <div className="space-y-4">
          {notes.split("\n").map((line, lineIndex) => {
            const trimmedLine = line.trim();
            if (!trimmedLine) {
              return (
                <div
                  key={`empty-${lineIndex}-${trimmedLine.length}`}
                  className="h-2"
                >
                </div>
              );
            }

            // Títulos
            if (trimmedLine.startsWith("# ")) {
              return (
                <h1
                  key={`h1-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                  className="text-2xl font-bold mb-3 text-gray-900"
                >
                  {trimmedLine.replace("# ", "")}
                </h1>
              );
            }
            if (trimmedLine.startsWith("## ")) {
              return (
                <h2
                  key={`h2-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                  className="text-xl font-semibold mb-2 text-gray-800"
                >
                  {trimmedLine.replace("## ", "")}
                </h2>
              );
            }
            if (trimmedLine.startsWith("### ")) {
              return (
                <h3
                  key={`h3-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                  className="text-lg font-medium mb-2 text-gray-700"
                >
                  {trimmedLine.replace("### ", "")}
                </h3>
              );
            }

            // Listas
            if (trimmedLine.startsWith("- ")) {
              return (
                <div
                  key={`list-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                  className="flex items-start ml-4"
                >
                  <span className="text-gray-500 mr-2">•</span>
                  <span className="text-gray-700">
                    {trimmedLine.replace("- ", "")}
                  </span>
                </div>
              );
            }

            // Citas
            if (trimmedLine.startsWith("> ")) {
              return (
                <blockquote
                  key={`quote-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                  className="border-l-4 border-blue-500 pl-4 italic text-gray-600 my-2 bg-blue-50 py-2 rounded-r"
                >
                  {trimmedLine.replace("> ", "")}
                </blockquote>
              );
            }

            // Bloques de código
            if (trimmedLine.startsWith("```") || trimmedLine.endsWith("```")) {
              return (
                <pre
                  key={`code-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                  className="bg-gray-100 p-3 rounded-lg text-sm font-mono overflow-x-auto border"
                >
                  <code>{trimmedLine.replace(/```\w*/g, '')}</code>
                </pre>
              );
            }

            // Texto normal con formato inline
            return (
              <div
                key={`text-${lineIndex}-${trimmedLine.slice(0, 10)}`}
                className="text-gray-700 leading-relaxed"
              >
                {renderInlineFormatting(trimmedLine)}
              </div>
            );
          })}
        </div>
      );
    } else {
      // Texto simple con saltos de línea preservados
      return (
        <div className="whitespace-pre-wrap text-gray-700 leading-relaxed">
          {notes}
        </div>
      );
    }
  };

  // Función para obtener el nombre del curso
  const getCourseName = (courseId: string) => {
    const course = courses.find((c) => c._id === courseId);
    return course?.name || courseId;
  };

  // Función para obtener el gradiente según dificultad
  const getDifficultyGradient = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
      case "Principiante":
        return "bg-gradient-to-r from-green-400 to-green-600";
      case "intermediate":
      case "Intermedio":
        return "bg-gradient-to-r from-yellow-400 to-orange-500";
      case "advanced":
      case "Avanzado":
        return "bg-gradient-to-r from-red-400 to-pink-600";
      default:
        return "bg-gradient-to-r from-gray-400 to-gray-600";
    }
  };

  // Función para obtener el color del badge de dificultad
  const getDifficultyBadgeClass = (difficulty?: string) => {
    switch (difficulty) {
      case "beginner":
      case "Principiante":
        return "bg-green-100 text-green-800";
      case "intermediate":
      case "Intermedio":
        return "bg-yellow-100 text-yellow-800";
      case "advanced":
      case "Avanzado":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-4xl max-h-[90vh] overflow-hidden">
        {/* Header del modal */}
        <div className="bg-gray-900 text-white p-6 flex justify-between items-center">
          <div>
            <h2 className="text-2xl font-bold">Vista Previa del Módulo</h2>
            <p className="text-gray-300 text-sm">
              Así es como verán los estudiantes este módulo
            </p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-gray-300 hover:text-white transition-colors"
            aria-label="Cerrar vista previa"
          >
            <span className="text-2xl">×</span>
          </button>
        </div>

        {/* Contenido scrolleable */}
        <div className="overflow-y-auto max-h-[calc(90vh-120px)]">
          {/* Preview del módulo como lo vería un estudiante */}
          <div className="p-6 bg-gray-50">
            <div className="max-w-2xl mx-auto">
              {/* Tarjeta del módulo */}
              <div className="bg-white rounded-xl shadow-lg overflow-hidden">
                {/* Header con gradiente según dificultad */}
                <div
                  className={`h-40 p-6 flex items-center justify-center text-white ${
                    getDifficultyGradient(module.content?.difficulty)
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-2xl font-bold mb-2">{module.name}</h3>
                    <div className="flex items-center justify-center space-x-4 text-sm">
                      <span className="flex items-center">
                        <i className="fas fa-book mr-1"></i>
                        {getCourseName(module.course)}
                      </span>
                      {Boolean(module.content?.duration) && (
                        <span className="flex items-center">
                          <i className="fas fa-clock mr-1"></i>
                          {module.content.duration} min
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Contenido del módulo */}
                <div className="p-6">
                  {/* Badge de dificultad */}
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-3 py-1 text-sm rounded-full font-medium ${
                        getDifficultyBadgeClass(module.content?.difficulty)
                      }`}
                    >
                      {module.content?.difficulty || "Sin definir"}
                    </span>
                    <div className="text-sm text-gray-500">
                      Módulo #{module._id?.slice(-6) || "------"}
                    </div>
                  </div>

                  {/* Descripción */}
                  {module.content?.description && (
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
                    {module.content?.videoUrl && (
                      <div className="bg-gray-50 rounded-lg p-4">
                        <div className="flex items-center mb-2">
                          <i className="fas fa-video text-blue-500 mr-2"></i>
                          <h5 className="font-semibold text-gray-800">
                            Video del módulo
                          </h5>
                        </div>
                        <div className="bg-gray-200 rounded-lg h-32 flex items-center justify-center">
                          <div className="text-center text-gray-500">
                            <i className="fas fa-play-circle text-3xl mb-2"></i>
                            <p className="text-sm">Video disponible</p>
                          </div>
                        </div>
                      </div>
                    )}

                    {/* Materiales */}
                    {module.content?.materials &&
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
                              key={`material-${index}-${
                                _material.title || index
                              }`}
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
                    {module.content?.objectives &&
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
                              key={`objective-${
                                objective.slice(0, 10)
                              }-${index}`}
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

                  {/* Contenido del módulo - Notas formateadas */}
                  {module.content?.notes && (
                    <div className="mt-4 bg-gray-50 rounded-lg p-4">
                      <h5 className="font-semibold text-gray-800 mb-3 flex items-center">
                        <i className="fas fa-file-text text-blue-500 mr-2"></i>
                        <span>Contenido de la Clase</span>
                      </h5>
                      <div className="bg-white rounded-lg p-4 border border-gray-200">
                        {renderFormattedNotes(module.content.notes)}
                      </div>
                    </div>
                  )}

                  {/* Botones de acción como los vería un estudiante */}
                  <div className="flex gap-3">
                    <button
                      type="button"
                      className="flex-1 bg-blue-600 text-white py-3 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 font-medium"
                    >
                      <i className="fas fa-play mr-2"></i>
                      <span>Comenzar Módulo</span>
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-gray-600 text-white py-3 px-4 rounded-lg hover:bg-gray-700 transition-colors duration-200 font-medium"
                    >
                      <i className="fas fa-bookmark mr-2"></i>
                      <span>Guardar para después</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer del modal */}
        <div className="bg-gray-100 px-6 py-4 flex justify-between items-center">
          <div className="text-sm text-gray-600">
            <i className="fas fa-info-circle mr-1"></i>
            <span>
              Esta es una vista previa de cómo verán los estudiantes este módulo
            </span>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
          >
            Cerrar Vista Previa
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModulePreviewModal;
