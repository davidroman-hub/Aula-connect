import { useState } from "preact/hooks";

function CreateUser({ addStudent, setView }: any) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (formData.name && formData.email) {
      addStudent(formData);
      setFormData({ name: "", email: "" });
    }
  };

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setView("students")}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Registrar Nuevo Estudiante
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6 max-w-2xl mx-auto">
        <form onSubmit={handleSubmit}>
          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el nombre completo"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="email">
              Correo Electrónico
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el correo electrónico"
              required
            />
          </div>

          <div className="flex justify-end">
            <button
              type="button"
              onClick={() => setView("students")}
              className="mr-3 px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="bg-primary text-white px-4 py-2 rounded-lg hover:bg-secondary transition"
            >
              Registrar Estudiante
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateUser;
