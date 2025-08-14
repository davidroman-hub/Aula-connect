import { useState } from "preact/hooks";
import axiod from "https://deno.land/x/axiod/mod.ts";
import { palette } from "../../assets/colors.ts";

function CreateUser({ addStudent, setView, token }: any) {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
  });

  const handleChange = (e: any) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  async function createUser(e: any) {
    e.preventDefault();
    try {
      const response = await axiod.post("/api/users/user", {
        username: formData.name,
        password: formData.password,
        role: "user",
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      setFormData({ name: "", password: "" });
      return response.data;
    } catch (error: any) {
      const errorMessage = error.response?.data || error.message ||
        "Unknown error occurred";
      throw new Error(`Error creating user: ${errorMessage}`);
    }
  }

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={() => setView("students")}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className={`text-2xl font-bold text-[${palette.primary}]`}>
          Registrar Nuevo Estudiante
        </h2>
      </div>

      <div className={`bg-white rounded-xl shadow p-6 max-w-2xl mx-auto`}>
        <form onSubmit={createUser}>
          <div className="mb-6">
            <label className={`block text-gray-700 mb-2`} htmlFor="name">
              Nombre Completo
            </label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="w-full text-gray-700 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el nombre completo"
              required
            />
          </div>

          <div className="mb-6">
            <label className="block text-gray-700 mb-2" htmlFor="name">
              Contrasena
            </label>
            <input
              type="text"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              className="w-full px-4 py-2 border text-gray-700 border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
              placeholder="Ingresa el nombre completo"
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
