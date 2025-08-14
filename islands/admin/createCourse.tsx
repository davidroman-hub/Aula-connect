import { useState } from "preact/hooks";
import { palette } from "../../assets/colors.ts";

function CreateCourse({ addCourse, setView }: any) {
  const [formData, setFormData] = useState({
    name: "",
    modules: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.name && formData.modules) {
      addCourse(formData);
      setFormData({ name: "", modules: "" });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setView("courses")}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className={`text-2xl font-bold text-[${palette.primary}]`}>
          Crear Nuevo Curso
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nombre del Curso
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el nombre del curso"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="modules">
              Número de Módulos
            </label>
            <input
              type="number"
              id="modules"
              name="modules"
              value={formData.modules}
              onChange={handleChange}
              min="1"
              max="20"
              className="w-full px-4 text-gray-700 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el número de módulos"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setView("courses")}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              Crear Curso
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateCourse;
