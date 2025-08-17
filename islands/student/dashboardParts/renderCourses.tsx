import { useEffect, useState } from "preact/hooks";
import { Course, CourseRawInfo } from "../../../routes/api/courses/course.tsx";
import { getCourses } from "../../admin/adminActions/studentsAsyncActions/studentAsyncActions.ts";
import { diff } from "$std/assert/_diff.ts";

export interface RenderCoursesProps {
  userInfo: {
    id: string;
    name: string;
    email: string;
    // Add any other relevant user info fields
  };
}

const RenderCourses = ({ userInfo }: RenderCoursesProps) => {
  // Función para obtener el gradiente según dificultad
  const getDifficultyGradient = (difficulty: string) => {
    if (difficulty === "1") {
      return "bg-gradient-to-r from-green-400 to-green-600";
    } else if (difficulty === "2") {
      return "bg-gradient-to-r from-yellow-400 to-orange-500";
    } else {
      return "bg-gradient-to-r from-red-400 to-pink-600";
    }
  };

  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    // Función para obtener los cursos

    const fetchCourses = async () => {
      try {
        const response = await getCourses();
        console.log("Courses fetched:", response);

        const filteredCourses = response.filter((course: CourseRawInfo) =>
          course.students.find((student: string) => student === userInfo.id)
        ).map((course: CourseRawInfo) => ({
          id: course._id,
          name: course.name,
          slug: course.slug,
          modules: course.modules,
        }));

        setCourses(filteredCourses);
      } catch (error) {
        console.error("Error fetching courses:", error);
      }
    };

    fetchCourses();
  }, []);

  // Módulos de ejemplo para mostrar la funcionalidad

  let coursesInfo = courses;

  coursesInfo.map((course) => ({
    id: course.id,
    name: course.name,
    slug: course.slug,
    modules: course.modules,
    difficulty: course.difficulty || "1",
    description: course.description || "No description available",
  }));

  // const sampleModules = [
  //   {
  //     _id: "mod1",
  //     name: "Introducción a HTML",
  //     course: "Desarrollo Web",
  //     difficulty: "Principiante",
  //     description: "Aprende los fundamentos de HTML para crear páginas web",
  //     duration: "2 horas",
  //     videos: 5,
  //     documents: 3,
  //     quizzes: 2,
  //   },
  //   {
  //     _id: "mod2",
  //     name: "CSS Avanzado",
  //     course: "Desarrollo Web",
  //     difficulty: "Intermedio",
  //     description: "Domina CSS Grid, Flexbox y animaciones",
  //     duration: "3 horas",
  //     videos: 8,
  //     documents: 4,
  //     quizzes: 3,
  //   },
  //   {
  //     _id: "mod3",
  //     name: "JavaScript ES6+",
  //     course: "JavaScript Avanzado",
  //     difficulty: "Avanzado",
  //     description: "Características modernas de JavaScript",
  //     duration: "4 horas",
  //     videos: 12,
  //     documents: 6,
  //     quizzes: 4,
  //   },
  //   {
  //     _id: "mod4",
  //     name: "React Hooks",
  //     course: "React & TypeScript",
  //     difficulty: "Intermedio",
  //     description: "Aprende a usar React Hooks efectivamente",
  //     duration: "3.5 horas",
  //     videos: 10,
  //     documents: 5,
  //     quizzes: 3,
  //   },
  // ];

  return (
    <div // style={{
     //   width: "100%",
    //   backgroundColor: "red",
    // }}
    className="">
      <div className="flex flex-wrap items-center mb-6">
        <h2 className="text-2xl mr-2 mb-2 font-bold text-gray-800">
          Cursos Disponibles
        </h2>
        <div className="flex mr-2 mb-2  space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Todos los cursos</option>
            {
              /* {courses.map((course) => (
                <option key={course._id} value={course._id}>
                  {course.name}
                </option>
              ))} */
            }
          </select>
        </div>
        <div className="flex mr-2 mb-2  space-x-4">
          <select className="px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500">
            <option value="">Toda dificultad</option>
            <option value="Principiante">Principiante</option>
            <option value="Intermedio">Intermedio</option>
            <option value="Avanzado">Avanzado</option>
          </select>
        </div>
      </div>

      {coursesInfo.length > 0
        ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {coursesInfo.map((module) => (
              <div
                key={module._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-shadow duration-300"
              >
                {/* Header con gradiente según dificultad */}
                <div
                  className={`h-32 p-4 flex items-center justify-center text-white ${
                    getDifficultyGradient(module.difficulty || "1")
                  }`}
                >
                  <div className="text-center">
                    <h3 className="text-xl font-bold mb-2">{module.name}</h3>
                    <span className="bg-white/20 px-3 py-1 rounded-full text-sm">
                      {module.difficulty}
                    </span>
                  </div>
                </div>

                {/* Contenido */}
                <div className="p-6">
                  <div className="mb-4">
                    <p className="text-sm text-blue-600 font-medium mb-2">
                      {module.name}
                    </p>
                    <p className="text-gray-600 text-sm">
                      {module.description}
                    </p>
                  </div>

                  {/* Estadísticas */}
                  <div className="flex justify-between text-sm text-gray-500 mb-4">
                    <div className="flex items-center">
                      <span className="fas fa-clock mr-1"></span>
                      {/* {module.duration} */}
                    </div>
                    <div className="flex space-x-3">
                      <span>
                        <span className="fas fa-video mr-1"></span>
                        {/* {module.videos} */}
                      </span>
                      <span>
                        <span className="fas fa-file-alt mr-1"></span>
                        {/* {module.documents} */}
                      </span>
                      <span>
                        <span className="fas fa-question-circle mr-1"></span>
                        {/* {module.quizzes} */}
                      </span>
                    </div>
                  </div>

                  {/* Botones de acción */}
                  <div className="flex space-x-2">
                    <button
                      type="button"
                      className="flex-1 bg-blue-600 text-white py-2 px-4 rounded-lg hover:bg-blue-700 transition-colors duration-200 text-sm"
                      onClick={() => {}}
                    >
                      <span className="fas fa-eye mr-2"></span>
                      <span>Vista previa</span>
                    </button>
                    <button
                      type="button"
                      className="flex-1 bg-green-600 text-white py-2 px-4 rounded-lg hover:bg-green-700 transition-colors duration-200 text-sm"
                    >
                      <span className="fas fa-plus mr-2"></span>
                      <span>Inscribirsessss</span>
                    </button>
                  </div>
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
  );
};

export default RenderCourses;
