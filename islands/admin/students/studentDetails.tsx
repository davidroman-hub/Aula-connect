import type { Student } from "../../../routes/api/users/user.tsx";

function StudentDetail(
  { student, closeDetail }: {
    student: Student | null;
    closeDetail: () => void;
  },
) {
  if (!student) return null;

  return (
    <div>
      <div className="flex items-center mb-6">
        <button
          onClick={closeDetail}
          className="mr-4 text-gray-600 hover:text-gray-900"
        >
          <i className="fas fa-arrow-left"></i>
        </button>
        <h2 className="text-2xl font-bold text-gray-800">
          Progreso de {student.username}
        </h2>
      </div>

      <div className="bg-white rounded-xl shadow p-6 mb-6">
        <div className="flex flex-col md:flex-row items-center mb-6">
          <div className="w-24 h-24 rounded-full bg-primary flex items-center justify-center mr-6 mb-4 md:mb-0">
            <i className="fas fa-user text-white text-4xl"></i>
          </div>
          <div className="text-center md:text-left">
            <h3 className="text-xl font-bold">{student.username}</h3>
            <p className="text-gray-600 mb-2">{student.password}</p>
            <div className="flex items-center">
              <div className="w-48 mr-3">
                <div className="progress-bar bg-gray-200">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${100}%` }}
                  >
                  </div>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">
                {100}%
              </span>
            </div>
            <p className="text-gray-500 mt-1">Progreso general</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Progreso por Módulo
        </h3>

        {
          /* <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {student.modules.map((module: any) => (
            <div
              key={module.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex justify-between mb-3">
                <h4 className="font-bold">{module.name}</h4>
                <span
                  className={`px-2 py-1 rounded text-xs ${
                    module.progress >= 80
                      ? "bg-green-100 text-green-800"
                      : module.progress >= 50
                      ? "bg-yellow-100 text-yellow-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {module.progress >= 80
                    ? "Excelente"
                    : module.progress >= 50
                    ? "En progreso"
                    : "Necesita apoyo"}
                </span>
              </div>
              <div className="mb-2">
                <p className="text-gray-600 mb-1">
                  Progreso: {module.progress}%
                </p>
                <div className="progress-bar bg-gray-200">
                  <div
                    className={`h-full ${
                      module.progress >= 80
                        ? "bg-green-500"
                        : module.progress >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${module.progress}%` }}
                  >
                  </div>
                </div>
              </div>
              <div className="flex justify-between text-sm text-gray-500">
                <span>0%</span>
                <span>100%</span>
              </div>
            </div>
          ))}
        </div> */
        }
      </div>
    </div>
  );
}

export default StudentDetail;
