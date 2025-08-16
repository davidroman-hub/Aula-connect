import { useState } from "preact/hooks";
import { palette } from "../../../assets/colors.ts";
import { Course } from "../../../routes/api/courses/course.tsx";
import CourseDetails from "./courseDetails.tsx";

export interface CoursesProps {
  courses: Course[];
  createModule: (moduleData: any) => void;
  isModuleCreated: boolean;
  isModuleError: string;
}

function Courses(
  { courses }: CoursesProps,
) {
  const [selectedCourse, setSelectedCourse] = useState<Course | null>(null);

  return (
    <div>
      {selectedCourse?._id == undefined || selectedCourse?._id === null
        ? (
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className={`text-2xl font-bold text-[${palette.primary}]`}>
                Gestión de Cursos
              </h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {courses.map((course: Course) => (
                <div
                  key={course.id}
                  className="bg-white rounded-xl shadow p-6 card-hover transition-all duration-300"
                >
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-xl font-bold text-gray-800">
                        {course.name}
                      </h3>
                      <p className="text-gray-600">ID: {course.slug}</p>
                    </div>
                    <div className="bg-purple-100 p-2 rounded-lg">
                      <i className="fas fa-book text-secondary text-xl"></i>
                    </div>
                  </div>

                  <div className="flex justify-between mb-4">
                    <div>
                      <p className="text-gray-500 text-sm">Módulos</p>
                      <p className="font-bold">{course.modules.length}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 text-sm">Estudiantes</p>
                      <p className="font-bold">{course.students.length}</p>
                    </div>
                  </div>

                  <div className="mt-4">
                    <button
                      onClick={() => setSelectedCourse(course)}
                      className="w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
                    >
                      Ver Detalles
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )
        : (
          <CourseDetails
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
          />
        )}
    </div>
  );
}

export default Courses;
