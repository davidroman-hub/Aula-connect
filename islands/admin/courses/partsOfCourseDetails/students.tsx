import { palette } from "../../../../assets/colors.ts";
import { Student } from "../../../../routes/api/users/user.tsx";
import { Course } from "../../../../types/course.ts";

type StudentsProps = {
  newCourseObject: Course;
  removeStudentFromCourse: (studentId: string) => void;
};

const StudentsTab = (
  { newCourseObject, removeStudentFromCourse }: StudentsProps,
) => {
  console.log("newCourseObject in StudentsTab:", newCourseObject);
  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Estudiantes Inscritos</h3>
        <button
          type="button"
          className={`px-4 py-2 bg-[${palette.primary}] text-white rounded-lg hover:bg-[${palette.hover}] transition-colors text-sm`}
        >
          <i className="fas fa-user-plus mr-2"></i> Agregar Estudiante
        </button>
      </div>

      {newCourseObject?.students.length === 0
        ? (
          <div className="text-center py-12">
            <i className="fas fa-users text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              No hay estudiantes inscritos en este curso
            </p>
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newCourseObject?.students.map((
              student: Student,
              index: number,
            ) => (
              <div
                key={student.id || index}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-[${palette.primary}] to-[${palette.hover}] flex items-center justify-center text-white font-semibold`}
                  >
                    {student?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {student?.username}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ID: {student._id.slice(-6)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.type === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {student.type}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm transition-colors"
                  >
                    <i className="fas fa-eye mr-2"></i> Ver Perfil
                  </button>
                  <button
                    onClick={() => removeStudentFromCourse(student._id)}
                    disabled={student.type === "admin"}
                    type="button"
                    className={`px-3 py-2 ${
                      student.type === "admin"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 hover:bg-red-100 text-red-700"
                    } rounded text-sm transition-colors`}
                  >
                    <i className="fas fa-user-minus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default StudentsTab;
