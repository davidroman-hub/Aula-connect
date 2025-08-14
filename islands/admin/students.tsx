import { manageFontColorDash, palette } from "../../assets/colors.ts";
import { Student } from "./index.tsx";

function Students({ students, openStudentDetail }: any) {
  return (
    <div>
      <div className="flex justify-between  items-center mb-6">
        <h2 className={`text-2xl font-bold text-[${palette.primary}]`}>
          Gestión de Estudiantes
        </h2>
        <button className="bg-primary text-white px-4 py-2 rounded-lg flex items-center">
          <i className="fas fa-download mr-2"></i>
          Exportar
        </button>
      </div>

      <div className="bg-white rounded-xl shadow overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Estudiante
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Contrasena
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Progreso
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Acciones
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {students.map((student: Student) => (
                <tr key={student.id} className="hover:bg-gray-50">
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center mr-3">
                        <i className="fas fa-user text-white"></i>
                      </div>
                      <div className="font-medium text-gray-900">
                        {student.username}
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-gray-500">
                    {student.password}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="w-32 mr-3">
                        <div className="progress-bar bg-gray-200">
                          <div className="bg-primary h-full" // style={{ width: `${student.progress}%` }}
                          >
                          </div>
                        </div>
                      </div>
                      {/* <span className="text-gray-600">{student.progress}%</span> */}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      onClick={() =>
                        openStudentDetail(student)}
                      className="text-primary hover:text-secondary mr-3"
                    >
                      <i className="fas fa-eye"></i> Ver Detalle
                    </button>
                    <button className="text-gray-500 hover:text-gray-700">
                      <i className="fas fa-edit"></i>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default Students;
