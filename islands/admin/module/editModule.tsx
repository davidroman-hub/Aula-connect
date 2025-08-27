/** @jsxImportSource preact */
import { useEffect, useRef, useState } from "preact/hooks";
import type { Module } from "../../../routes/api/modules/module.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { renderEditorJSContent } from "../../../lib/editorJSRenderer.tsx";
import Loader from "../loader/adminLoader.tsx";

interface EditorInstance {
  save: () => Promise<unknown>;
  destroy: () => void;
}

type EditorJSConstructor = new (
  config: Record<string, unknown>,
) => EditorInstance;

interface EditModuleProps {
  module: Module;
  onSave: (module: Module) => void;
  onCancel: () => void;
  token: string;
}

const EditModule = ({ module, onSave, onCancel, token }: EditModuleProps) => {
  const editorRef = useRef<EditorInstance | null>(null);
  const editorMountedRef = useRef(false);

  const [formData, setFormData] = useState({
    name: module.name || "",
    description: module.content?.description || "",
    objectives: module.content?.objectives?.join("\n") || "",
    duration: module.content?.duration || "",
    difficulty: module.content?.difficulty || "beginner",
    videoUrl: module.content?.videoUrl || "",
    notes: module.content?.notes || "",
  });

  const [materials, setMaterials] = useState(module.content?.materials || []);
  const [exercises, setExercises] = useState(module.content?.exercises || []);
  const [previewContent, setPreviewContent] = useState<unknown>(null);
  const [showPreview, setShowPreview] = useState(false);
  const [loadingPatch, setLoadingPatch] = useState(false);

  // Función para actualizar la vista previa
  const updatePreview = async () => {
    if (editorRef.current) {
      try {
        const savedData = await editorRef.current.save();
        setPreviewContent(savedData);
        setShowPreview(!showPreview);
      } catch (error) {
        console.error("Error getting preview content:", error);
      }
    }
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as
      | HTMLInputElement
      | HTMLTextAreaElement
      | HTMLSelectElement;
    const { name, value } = target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const addMaterial = () => {
    setMaterials((prev) => [...prev, {
      type: "link",
      title: "",
      url: "",
      description: "",
    }]);
  };

  const updateMaterial = (index: number, field: string, value: string) => {
    setMaterials((prev) =>
      prev.map((material, i) =>
        i === index ? { ...material, [field]: value } : material
      )
    );
  };

  const removeMaterial = (index: number) => {
    setMaterials((prev) => prev.filter((_, i) => i !== index));
  };

  const addExercise = () => {
    setExercises((prev) => [...prev, {
      title: "",
      description: "",
      instructions: "",
      solution: "",
    }]);
  };

  const updateExercise = (index: number, field: string, value: string) => {
    setExercises((prev) =>
      prev.map((exercise, i) =>
        i === index ? { ...exercise, [field]: value } : exercise
      )
    );
  };

  const removeExercise = (index: number) => {
    setExercises((prev) => prev.filter((_, i) => i !== index));
  };

  const handleSave = async () => {
    setLoadingPatch(true);
    try {
      let editorContent = "";

      // Obtener contenido del editor si existe
      if (editorRef.current) {
        const savedData = await editorRef.current.save();
        editorContent = JSON.stringify(savedData);
      }

      const updatedModule: Module = {
        ...module,
        name: formData.name,
        content: {
          description: formData.description,
          objectives: formData.objectives.split("\n").filter((obj) =>
            obj.trim()
          ),
          duration: formData.duration,
          difficulty: formData.difficulty,
          videoUrl: formData.videoUrl,
          materials,
          exercises,
          notes: editorContent || formData.notes, // Usar contenido del editor o fallback al texto
        },
        updatedAt: new Date(),
      };

      await axiod.patch(`/api/modules/module`, updatedModule, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setLoadingPatch(false);

      onSave(updatedModule);
    } catch (error) {
      setLoadingPatch(false);

      alert("Error al guardar el módulo");
    }
  };

  useEffect(() => {
    // Solo inicializar en el lado del cliente
    if (typeof window === "undefined") return;

    // Esperar a que el DOM esté listo antes de inicializar el editor
    const timer = setTimeout(async () => {
      if (!editorMountedRef.current && document.getElementById("editor")) {
        try {
          // Importar EditorJS dinámicamente
          const { default: EditorJS } = await import("editorjs");

          // Importar herramientas dinámicamente
          const { default: Header } = await import(
            "https://esm.sh/@editorjs/header@2.8.1"
          );
          const { default: List } = await import(
            "https://esm.sh/@editorjs/list@1.9.0"
          );
          const { default: Quote } = await import(
            "https://esm.sh/@editorjs/quote@2.6.0"
          );
          const { default: RawTool } = await import(
            "https://esm.sh/@editorjs/raw@2.5.0"
          );
          const { default: CodeTool } = await import(
            "https://esm.sh/@editorjs/code@2.9.0"
          );
          const { default: LinkTool } = await import(
            "https://esm.sh/@editorjs/link@2.6.2"
          );
          const { default: ImageTool } = await import(
            "https://esm.sh/@editorjs/image@2.9.0"
          );

          // Configurar herramientas con casting para evitar problemas de tipos
          const tools = {
            header: {
              class: Header,
              config: {
                placeholder: "Ingresa un encabezado",
                levels: [1, 2, 3, 4, 5, 6],
                defaultLevel: 2,
              },
            },
            list: {
              class: List,
              inlineToolbar: true,
              config: {
                defaultStyle: "unordered",
              },
            },
            quote: {
              class: Quote,
              inlineToolbar: true,
              config: {
                quotePlaceholder: "Ingresa una cita",
                captionPlaceholder: "Autor de la cita",
              },
            },
            raw: {
              class: RawTool,
              config: {
                placeholder: "Ingresa HTML personalizado aquí...",
              },
            },
            code: {
              class: CodeTool,
              config: {
                placeholder: "Ingresa tu código aquí...",
              },
            },
            linkTool: {
              class: LinkTool,
              config: {
                endpoint: "/api/link-preview", // Endpoint para obtener vista previa de links (opcional)
              },
            },
            image: {
              class: ImageTool,
              config: {
                endpoints: {
                  byUrl: "/api/upload-image-by-url", // Endpoint para subir por URL
                },
                field: "image",
                types: "image/*",
                additionalRequestHeaders: {
                  "Authorization": `Bearer ${token}`,
                },
              },
            },
          };

          const editor = new (EditorJS as EditorJSConstructor)({
            holder: "editor",
            autofocus: true,
            placeholder: "Escribe las notas del módulo aquí...",
            tools,
            data: formData.notes
              ? (function () {
                try {
                  return JSON.parse(formData.notes);
                } catch {
                  // Si no es JSON válido, crear estructura básica con el texto
                  return {
                    time: Date.now(),
                    blocks: [{
                      type: "paragraph",
                      data: {
                        text: formData.notes,
                      },
                    }],
                  };
                }
              })()
              : undefined,
          });

          editorRef.current = editor;
          editorMountedRef.current = true;
        } catch (error) {
          console.error("Error initializing EditorJS:", error);
        }
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      if (editorRef.current && editorMountedRef.current) {
        try {
          editorRef.current.destroy();
          editorRef.current = null;
          editorMountedRef.current = false;
        } catch (error) {
          console.error("Error destroying editor:", error);
        }
      }
    };
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Editar Módulo</h2>
        <div className="flex gap-2">
          <button
            type="button"
            disabled={loadingPatch}
            onClick={onCancel}
            className={"px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100" +
              (loadingPatch ? " opacity-50 cursor-not-allowed" : "")}
          >
            Cancelar
          </button>
          <button
            type="button"
            disabled={loadingPatch}
            onClick={handleSave}
            className={"px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700" +
              (loadingPatch ? " opacity-50 cursor-not-allowed" : "")}
          >
            Guardar
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Información Básica */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold text-gray-700">
            Información Básica
          </h3>

          <div>
            <label
              htmlFor="module-name"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Nombre del Módulo
            </label>
            <input
              id="module-name"
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label
              htmlFor="module-description"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Descripción
            </label>
            <textarea
              id="module-description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Duración (minutos)
              </label>
              <input
                type="number"
                name="duration"
                value={formData.duration}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">
                Dificultad
              </label>
              <select
                name="difficulty"
                value={formData.difficulty}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
              >
                <option value="beginner">Principiante</option>
                <option value="intermediate">Intermedio</option>
                <option value="advanced">Avanzado</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              URL del Video
            </label>
            <input
              type="url"
              name="videoUrl"
              value={formData.videoUrl}
              onChange={handleInputChange}
              placeholder="https://youtube.com/watch?v=..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Objetivos (uno por línea)
            </label>
            <textarea
              name="objectives"
              value={formData.objectives}
              onChange={handleInputChange}
              rows={4}
              placeholder="Objetivo 1&#10;Objetivo 2&#10;Objetivo 3"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            />
          </div>
        </div>

        {/* Contenido Avanzado */}
        <div className="space-y-4">
          {/* <h3 className="text-lg font-semibold text-gray-700">Contenido</h3> */}

          {/* Materiales */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Materiales
              </label>
              <button
                type="button"
                onClick={addMaterial}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                + Agregar Material
              </button>
            </div>
            {materials.map((material, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg mb-2 bg-gray-50"
              >
                <div className="grid grid-cols-2 gap-2 mb-2">
                  <select
                    value={material.type}
                    onChange={(e) =>
                      updateMaterial(
                        index,
                        "type",
                        (e.target as HTMLInputElement).value,
                      )}
                    className="px-2 py-1 border rounded text-black"
                  >
                    <option value="pdf">PDF</option>
                    <option value="link">Enlace</option>
                    <option value="code">Código</option>
                    <option value="exercise">Ejercicio</option>
                  </select>
                  <button
                    type="button"
                    onClick={() => removeMaterial(index)}
                    className="text-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Título"
                  value={material.title}
                  onChange={(e) =>
                    updateMaterial(
                      index,
                      "title",
                      (e.target as HTMLInputElement).value,
                    )}
                  className="w-full px-2 py-1 border rounded mb-2 text-black"
                />
                <input
                  type="url"
                  placeholder="URL"
                  value={material.url}
                  onChange={(e) =>
                    updateMaterial(
                      index,
                      "url",
                      (e.target as HTMLInputElement).value,
                    )}
                  className="w-full px-2 py-1 border rounded text-black"
                />
              </div>
            ))}
          </div>

          {/* Ejercicios */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Ejercicios
              </label>
              <button
                type="button"
                onClick={addExercise}
                className="text-blue-600 text-sm hover:text-blue-800"
              >
                + Agregar Ejercicio
              </button>
            </div>
            {exercises.map((exercise, index) => (
              <div
                key={index}
                className="border p-3 rounded-lg mb-2 bg-gray-50"
              >
                <div className="flex justify-between items-center mb-2">
                  <span className="text-sm font-medium">
                    Ejercicio {index + 1}
                  </span>
                  <button
                    type="button"
                    onClick={() => removeExercise(index)}
                    className="text-red-600 text-sm"
                  >
                    Eliminar
                  </button>
                </div>
                <input
                  type="text"
                  placeholder="Título del ejercicio"
                  value={exercise.title}
                  onChange={(e) =>
                    updateExercise(
                      index,
                      "title",
                      (e.target as HTMLInputElement).value,
                    )}
                  className="w-full px-2 py-1 border rounded mb-2 text-black"
                />
                <textarea
                  placeholder="Instrucciones"
                  value={exercise.instructions}
                  onChange={(e) =>
                    updateExercise(
                      index,
                      "instructions",
                      (e.target as HTMLInputElement).value,
                    )}
                  rows={2}
                  className="w-full px-2 py-1 border rounded text-black"
                />
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Editor de Notas Avanzado */}

      <div className="bg-gray-50 p-6">
        <div className="flex justify-between items-center mb-4">
          <div>
            <h3 className="text-lg font-semibold text-gray-700 mb-2">
              📝 Editor de Notas Avanzado
            </h3>
            <p className="text-sm text-gray-600 mb-3">
              Usa las siguientes herramientas para crear contenido rico:
            </p>
          </div>
          <div className="flex gap-2">
            <button
              type="button"
              onClick={updatePreview}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
            >
              {showPreview ? "Ocultar Vista Previa" : "Vista Previa"}
            </button>
          </div>
        </div>
        <div className="flex flex-wrap gap-2 mb-4">
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
            📌 Párrafos
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-100 text-green-800">
            🏷️ Encabezados (H1-H6)
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-purple-100 text-purple-800">
            📋 Listas (ordenadas/no ordenadas)
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
            💬 Citas
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
            🔧 HTML personalizado
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-800">
            💻 Bloques de código
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-indigo-100 text-indigo-800">
            🔗 Enlaces/URLs
          </span>
          <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-pink-100 text-pink-800">
            🖼️ Imágenes
          </span>
        </div>
      </div>
      <div
        id="editor"
        className="border rounded-xl p-4 bg-white w-full shadow min-h-[300px]"
      />

      {/* Vista Previa */}
      {showPreview && previewContent && (
        <div className="mt-6">
          <h4 className="text-md font-semibold text-gray-700 mb-3">
            🔍 Vista Previa del Contenido
          </h4>
          <div className="border rounded-xl p-4 bg-white shadow">
            {renderEditorJSContent(previewContent)}
          </div>
        </div>
      )}

      <Loader loading={loadingPatch} />
    </div>
  );
};

export default EditModule;
