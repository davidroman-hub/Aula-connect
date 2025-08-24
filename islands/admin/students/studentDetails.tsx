import type { Student } from "../../../routes/api/users/user.tsx";
import { Course } from "../../../types/course.ts";

type StudentDetailProps = {
  student: Student | null;
  closeDetail: () => void;
  courses: Course[];
};

function StudentDetail(
  { student, closeDetail, courses }: StudentDetailProps,
) {
  if (!student) return null;

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

    return {
      courseId: course._id,
      courseName: course.name,
      studentModules,
      progress,
    };
  });

  const generalProgress =
    progressObject.reduce((acc, course) => acc + course.progress, 0) /
      progressObject.length || 0;

  const RenderStudentCourses = () => {
    return (
      <>
        {progressObject?.map((course) => (
          <div
            key={course.courseId}
            className="collapse bg-base-100 border-base-300 border mb-2"
          >
            <input type="checkbox" />
            <div className="collapse-title font-semibold">
              <div>
                <div className="progress-bar bg-gray-200">
                  <div
                    className={`h-full ${
                      course.progress >= 80
                        ? "bg-green-500"
                        : course.progress >= 50
                        ? "bg-yellow-500"
                        : "bg-red-500"
                    }`}
                    style={{ width: `${course.progress}%` }}
                  >
                  </div>
                </div>
              </div>
              {course.courseName} - Progreso: {course.progress || 0} %
            </div>
            <div className="collapse-content text-sm">
              {course.studentModules?.map((module) => (
                <div
                  key={module.moduleId}
                  className="flex justify-between mb-2"
                >
                  <span>{module.moduleName}</span>
                  <span
                    className={`px-2 py-1 rounded text-xs ${
                      module.status === "done"
                        ? "bg-green-100 text-green-800"
                        : "bg-red-100 text-red-800"
                    }`}
                  >
                    {module.status === "done" ? "Completado" : "En progreso"}
                  </span>
                </div>
              ))}
            </div>
          </div>
        ))}
      </>
    );
  };

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
                    style={{ width: `${generalProgress}%` }}
                  >
                  </div>
                </div>
              </div>
              <span className="text-lg font-bold text-gray-800">
                {Math.trunc(generalProgress)}%
              </span>
            </div>
            <p className="text-gray-500 mt-1">Progreso general</p>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Progreso por Curso
        </h3>
        {coursesResults && coursesResults.length > 0
          ? <RenderStudentCourses />
          : <p>El estudiante no ha iniciado ningún curso.</p>}
      </div>
    </div>
  );
}

export default StudentDetail;
