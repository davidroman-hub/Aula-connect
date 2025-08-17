import { useRef, useState } from "preact/hooks";
import type { Module } from "../../../routes/api/modules/module.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { getPlaceholderText } from "../../../lib/notesEditor.ts";
import { renderFormattedNotesPreview } from "../../../lib/notesRenderer.tsx";

interface EditModuleProps {
  module: Module;
  onSave: (module: Module) => void;
  onCancel: () => void;
  token: string;
}

const EditModule = ({ module, onSave, onCancel, token }: EditModuleProps) => {
  const notesTextareaRef = useRef<HTMLTextAreaElement>(null);

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
  const [noteFormat, setNoteFormat] = useState("markdown"); // "text", "markdown", "html"

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

  // Función para insertar formato en el textarea
  const handleInsertFormatting = (
    prefix: string,
    suffix: string,
    placeholder: string,
  ) => {
    const textarea = notesTextareaRef.current;
    if (!textarea) return;

    // Enfocar el textarea primero
    textarea.focus();

    const start = textarea.selectionStart || 0;
    const end = textarea.selectionEnd || 0;
    const currentValue = formData.notes;
    const selectedText = currentValue.substring(start, end);
    const textToInsert = selectedText || placeholder;
    const newText = prefix + textToInsert + suffix;

    const newValue = currentValue.substring(0, start) + newText +
      currentValue.substring(end);

    // Actualizar el estado
    setFormData((prev) => ({ ...prev, notes: newValue }));

    // Reposicionar el cursor después de que React actualice el DOM
    setTimeout(() => {
      const newCursorPos = start + prefix.length + textToInsert.length;
      textarea.setSelectionRange(newCursorPos, newCursorPos);
    }, 0);
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
    try {
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
          notes: formData.notes,
        },
        updatedAt: new Date(),
      };

      await axiod.patch(`/api/modules/module`, updatedModule, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });

      onSave(updatedModule);
    } catch (error) {
      console.error("Error saving module:", error);
      alert("Error al guardar el módulo");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Editar Módulo</h2>
        <div className="flex gap-2">
          <button
            type="button"
            onClick={onCancel}
            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
          >
            Cancelar
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
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
          <h3 className="text-lg font-semibold text-gray-700">Contenido</h3>

          {/* Editor de Notas Avanzado */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="text-sm font-medium text-gray-700">
                Contenido y Notas del Módulo
              </label>
              <select
                value={noteFormat}
                onChange={(e) =>
                  setNoteFormat((e.target as HTMLSelectElement).value)}
                className="text-xs px-2 py-1 border border-gray-300 rounded text-black"
              >
                <option value="text">Texto Simple</option>
                <option value="markdown">Markdown</option>
                <option value="html">HTML</option>
              </select>
            </div>

            {/* Barra de herramientas para formato */}
            <div className="border border-gray-300 rounded-t-lg bg-gray-50 p-2 flex flex-wrap gap-1">
              {noteFormat === "markdown" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("**", "**", "texto en negrita")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Negrita"
                  >
                    <b>B</b>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("*", "*", "texto en cursiva")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Cursiva"
                  >
                    <i>I</i>
                  </button>
                  <button
                    type="button"
                    onClick={() => handleInsertFormatting("`", "`", "código")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 font-mono"
                    title="Código inline"
                  >
                    `code`
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "\n```\n",
                        "\n```\n",
                        "bloque de código",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 font-mono"
                    title="Bloque de código"
                  >
                    ```
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("\n## ", "", "Título de Sección")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Título"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("\n- ", "", "elemento de lista")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Lista"
                  >
                    •
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("\n> ", "", "cita importante")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Cita"
                  >
                    "
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("[", "](url)", "texto del enlace")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Enlace"
                  >
                    🔗
                  </button>
                </>
              )}

              {noteFormat === "html" && (
                <>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "<strong>",
                        "</strong>",
                        "texto en negrita",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Negrita HTML"
                  >
                    <b>B</b>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "<em>",
                        "</em>",
                        "texto en cursiva",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Cursiva HTML"
                  >
                    <i>I</i>
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("<code>", "</code>", "código")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100 font-mono"
                    title="Código HTML"
                  >
                    &lt;code&gt;
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "<h1>",
                        "</h1>",
                        "Título Principal",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Título H1"
                  >
                    H1
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "<h2>",
                        "</h2>",
                        "Título de Sección",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Título H2"
                  >
                    H2
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("<h3>", "</h3>", "Subtítulo")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Título H3"
                  >
                    H3
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting("<p>", "</p>", "párrafo de texto")}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Párrafo"
                  >
                    P
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "<div>",
                        "</div>",
                        "contenido en div",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Div"
                  >
                    &lt;div&gt;
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      handleInsertFormatting(
                        "\n<ul>\n<li>",
                        "</li>\n</ul>",
                        "elemento de lista",
                      )}
                    className="px-2 py-1 text-xs bg-white border border-gray-300 rounded hover:bg-gray-100"
                    title="Lista HTML"
                  >
                    •
                  </button>
                </>
              )}
            </div>

            <textarea
              ref={notesTextareaRef}
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={12}
              placeholder={getPlaceholderText(noteFormat)}
              className="w-full px-3 py-2 border-x border-b border-gray-300 rounded-b-lg focus:ring-2 focus:ring-blue-500 text-black font-mono text-sm"
            />

            {/* Vista previa */}
            {formData.notes && (
              <div className="mt-2 border border-gray-300 rounded-lg p-3 bg-gray-50">
                <div className="text-xs text-gray-600 mb-2">Vista previa:</div>
                <div className="prose prose-sm max-w-none">
                  {renderFormattedNotesPreview(formData.notes, noteFormat)}
                </div>
              </div>
            )}
          </div>

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
    </div>
  );
};

export default EditModule;
