import { useState } from "preact/hooks";
import type { Module } from "../../../routes/api/modules/module.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

interface EditModuleProps {
  module: Module;
  onSave: (module: Module) => void;
  onCancel: () => void;
  token: string;
}

const EditModule = ({ module, onSave, onCancel, token }: EditModuleProps) => {
  const [formData, setFormData] = useState({
    name: module.name || "",
    description: module.content?.description || "",
    objectives: module.content?.objectives?.join("\n") || "",
    duration: module.content?.duration || 0,
    difficulty: module.content?.difficulty || "beginner",
    videoUrl: module.content?.videoUrl || "",
    notes: module.content?.notes || "",
  });

  const [materials, setMaterials] = useState(module.content?.materials || []);
  const [exercises, setExercises] = useState(module.content?.exercises || []);

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
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
          difficulty: formData.difficulty as
            | "beginner"
            | "intermediate"
            | "advanced",
          videoUrl: formData.videoUrl,
          materials,
          exercises,
          notes: formData.notes,
        },
        updatedAt: new Date(),
      };

      const response = await axiod.patch(`/api/modules/module`, updatedModule, {
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
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Nombre del Módulo
            </label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleInputChange}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Descripción
            </label>
            <textarea
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

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Notas y Contenido
            </label>
            <textarea
              name="notes"
              value={formData.notes}
              onChange={handleInputChange}
              rows={6}
              placeholder="Contenido de la clase, explicaciones, conceptos clave..."
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 text-black"
            />
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
