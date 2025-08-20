import { useEffect, useState } from "preact/hooks";
import { getCourses } from "../../admin/adminActions/studentsAsyncActions/studentAsyncActions.ts";
import { Course, CourseRawInfo } from "../../../types/course.ts";

import { ButtonSpinnerLoading } from "../../components/spinners/spinners.tsx";

export interface RenderCoursesProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
    // Add any other relevant user info fields
  };
}

const easy = "1";
const medium = "2";

const RenderCourses = ({ userInfo }: RenderCoursesProps) => {
  // Función para obtener el gradiente según dificultad
  const getDifficultyGradient = (difficulty: string) => {
    if (difficulty === easy) {
      return "bg-gradient-to-r from-green-400 to-green-600";
    } else if (difficulty === medium) {
      return "bg-gradient-to-r from-yellow-400 to-orange-500";
    } else {
      return "bg-gradient-to-r from-red-400 to-pink-600";
    }
  };

  const [courses, setCourses] = useState<Course[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [fakeLoading, setFakeLoading] = useState(false);
  const [filteredCourses, setFilteredCourses] = useState("all");

  useEffect(() => {
    const fetchCourses = async () => {
      try {
        setIsLoading(true);

        await new Promise((resolve) => setTimeout(resolve, 2000));

        const response = await getCourses();

        const filteredCourses = response.filter((course: CourseRawInfo) =>
          course.students.find((student: string) => student === userInfo.id)
        ).map((course: CourseRawInfo) => ({
          id: course._id,
          name: course.name,
          slug: course.slug,
          modules: course.modules,
          difficulty: course.difficulty,
          description: course.description || "No description available",
        }));

        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchCourses();
  }, []);

  // Módulos de ejemplo para mostrar la funcionalidad

  const getDifficultyText = (difficulty: string) => {
    if (difficulty === easy) return "Principiante";
    if (difficulty === medium) return "Intermedio";
    return "Avanzado";
  };

  const coursesObject = courses.map((course) => ({
    id: course.id,
    name: course.name,
    slug: course.slug,
    modules: course.modules,
    difficulty: course.difficulty,
    description: course.description || "No description available",
  }));

  // Componente de loading para las tarjetas
  const CourseCardSkeleton = () => (
    <div className="bg-white rounded-xl shadow-lg overflow-hidden animate-pulse">
      {/* Header skeleton */}
      <div className="h-32 bg-gradient-to-r from-gray-300 to-gray-400"></div>

      {/* Content skeleton */}
      <div className="p-6">
        <div className="h-4 bg-gray-300 rounded mb-2"></div>
        <div className="h-3 bg-gray-200 rounded mb-4"></div>
        <div className="flex justify-between mb-4">
          <div className="h-3 bg-gray-200 rounded w-16"></div>
          <div className="flex space-x-3">
            <div className="h-3 bg-gray-200 rounded w-8"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
            <div className="h-3 bg-gray-200 rounded w-8"></div>
          </div>
        </div>
        <div className="h-10 bg-gray-300 rounded"></div>
      </div>
    </div>
  );

  return (
    <div className="">
      <div className="flex flex-wrap items-center mb-6">
        <h2 className="text-2xl mr-2 mb-2 font-bold text-gray-800">
          Cursos Disponibles
        </h2>

        <div className="flex mr-2 mb-2 space-x-4">
          <select
            className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500"
            value={filteredCourses}
            onChange={(e) =>
              setFilteredCourses((e.target as HTMLSelectElement).value)}
          >
            <option value="all">Toda dificultad</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>

      {isLoading
        ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {Array.from(
              { length: 6 },
              (_, index) => (
                <CourseCardSkeleton key={`skeleton-card-${index + 1}`} />
              ),
            )}
          </div>
        )
        : (
          <div>
            {coursesObject.length > 0
              ? (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {coursesObject.filter((course) => (
                    filteredCourses === "all" ||
                    getDifficultyText(course.difficulty || easy) ===
                      filteredCourses
                  )).map((course) => (
                    <div
                      key={course.id}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
                    >
                      {/* Header con gradiente según dificultad */}
                      <div
                        className={`h-32 p-4 flex items-center justify-center text-white ${
                          getDifficultyGradient(course.difficulty || "1")
                        }`}
                      >
                        <div className="text-center">
                          <h3 className="text-xl font-bold mb-2">
                            {course.name}
                          </h3>
                          <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                            {getDifficultyText(course.difficulty || "1")}
                          </span>
                        </div>
                      </div>

                      {/* Contenido */}
                      <div className="p-6">
                        <div className="mb-4">
                          <p className="text-sm text-blue-600 font-medium mb-2">
                            {course.name}
                          </p>
                          <p className="text-gray-600 text-sm">
                            {course.description}
                          </p>
                        </div>

                        {/* Estadísticas */}
                        <div className="flex justify-between text-sm text-gray-500 mb-4">
                          {
                            /* <div className="flex items-center">
                            <span className="fas fa-clock mr-1"></span>
                            <span>2h</span>
                          </div> */
                          }
                          <div className="flex space-x-3">
                            {
                              /* <span>
                              <span className="fas fa-video mr-1"></span>
                              <span>5</span>
                            </span> */
                            }
                            <span>
                              <span className="fas fa-puzzle-piece mr-1"></span>
                              <span>
                                {`${course.modules.length} ${
                                  course.modules.length === 1
                                    ? "clase"
                                    : "clases"
                                }`}
                              </span>
                            </span>
                            {
                              /* <span>
                              <span className="fas fa-question-circle mr-1">
                              </span>
                              <span>3</span>
                            </span> */
                            }
                          </div>
                        </div>

                        {/* Botones de acción */}
                        <div className="flex space-x-2">
                          <a
                            disabled={fakeLoading}
                            onClick={() => {
                              setFakeLoading(true);
                              setTimeout(() => {
                                setFakeLoading(false);
                              }, 2000);
                            }}
                            href={`/courses/${course.id}`}
                            className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm text-center"
                          >
                            {fakeLoading
                              ? <ButtonSpinnerLoading />
                              : "Iniciar/Continuar"}
                          </a>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )
              : (
                <div className="text-center py-12">
                  <i className="fas fa-book text-gray-400 text-6xl mb-4"></i>
                  <h3 className="text-xl font-semibold text-gray-600 mb-2">
                    No se encontraron Cursos
                  </h3>
                  <p className="text-gray-500">
                    Aún no hay cursos disponibles
                  </p>
                </div>
              )}
          </div>
        )}
    </div>
  );
};

export default RenderCourses;
