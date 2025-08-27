import { useState } from "preact/hooks";
import { palette } from "../../../assets/colors.ts";

import CourseDetails from "./courseDetails.tsx";
import { Student } from "../../../routes/api/users/user.tsx";
import { Module } from "../../../routes/api/modules/module.tsx";
import { Course } from "../../../types/course.ts";

export interface CoursesProps {
  courses: Course[];
  createModule: (moduleData: any) => void;
  isModuleCreated: boolean;
  isModuleError: string;
  getStudents: () => Promise<Student[]>;
  getAllModules: () => Promise<Module[]>;
  getCourses: () => Promise<Course[]>;
  resetModuleCreated: () => void;
  students: Student[];
  loadingCreateModule: boolean;
}

function Courses(
  {
    courses,
    getStudents,
    getAllModules,
    createModule,
    isModuleCreated,
    isModuleError,
    getCourses,
    resetModuleCreated,
    students,
    loadingCreateModule,
  }: CoursesProps,
) {
  const [selectedCourse, setSelectedCourse] = useState<any | null>(null);

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

            {courses.length > 0
              ? (
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
                          className="cursor-pointer w-full bg-gray-100 hover:bg-gray-200 text-gray-800 py-2 rounded-lg transition"
                        >
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )
              : (
                <div className="text-center py-12">
                  <i className="fas fa-book text-gray-400 text-6xl mb-4">
                  </i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No se encontraron Cursos
                  </h3>
                  <p className="text-gray-500">
                    Aún no hay cursos disponibles
                  </p>
                </div>
              )}
          </div>
        )
        : (
          <CourseDetails
            loadingCreateModule={loadingCreateModule}
            getCourses={getCourses}
            isModuleCreated={isModuleCreated}
            isModuleError={isModuleError}
            token={localStorage.getItem("jwtToken") || ""}
            getModules={getAllModules}
            getStudents={getStudents}
            createModule={createModule}
            course={selectedCourse}
            onBack={() => setSelectedCourse(null)}
            courses={courses}
            resetModuleCreated={resetModuleCreated}
          />
        )}
    </div>
  );
}

export default Courses;
