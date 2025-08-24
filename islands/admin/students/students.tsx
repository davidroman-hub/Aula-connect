import { palette } from "../../../assets/colors.ts";
import type { Student } from "../../../routes/api/users/user.tsx";
import { Course } from "../../../types/course.ts";
import StudentUpdate from "./studentUpdate.tsx";

type StudentsProps = {
  students: Student[];
  openStudentDetail: (student: Student) => void;
  getCourses: () => Promise<any[]>;
  getStudents: () => Promise<any[]>;
  courses: Course[];
};

function Students(
  { students, openStudentDetail, getCourses, getStudents, courses }:
    StudentsProps,
) {
  if (!students) return null;

  const StudentsNewObject = students?.map((student) => {
    const currentCoursesIds = [
      ...new Set(student.currentLesson.map((module) => module.courseId)),
    ];

    const coursesResults = courses?.filter((course) =>
      currentCoursesIds.includes(course._id)
    );

    const progressObject = coursesResults?.map((course) => {
      const studentModules = student.currentLesson?.filter((module) =>
        module.courseId === course._id
      );
      const totalModules = course.modules.length;
      const completedModules = studentModules.filter((module) =>
        module.status === "done"
      ).length;

      const progress = totalModules > 0
        ? Math.round((completedModules / totalModules) * 100)
        : 0;

      return progress;
    });

    return {
      ...student,
      progress: Math.trunc(
        progressObject.reduce((acc, val) => acc + val, 0) /
            progressObject.length || 0,
      ),
    };
  });

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
              {StudentsNewObject.map((student) => (
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
                      <div className="w-16 mr-3">
                        <div className="progress-bar bg-gray-200">
                          <div
                            className="bg-primary h-full"
                            style={{ width: `${student.progress}%` }}
                          >
                          </div>
                        </div>
                      </div>
                      <span className="text-gray-600">{student.progress}%</span>
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
                    <StudentUpdate
                      getCourses={getCourses}
                      student={student}
                      getStudents={getStudents}
                    />

                    <div className="text-gray-400 text-sm mt-2">
                      Ultima actividad:{" "}
                      {new Date(student.updatedAt).toLocaleDateString()}
                    </div>
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
