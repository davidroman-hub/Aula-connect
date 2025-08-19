import { useEffect, useState } from "preact/hooks";

interface CourseData {
  _id?: string;
  name?: string;
  description?: string;
  modules?: Array<{ name?: string; description?: string; _id?: string }>;
  students?: Array<unknown>;
  error?: boolean;
}

interface CoursePreviewProps {
  course: CourseData;
  courseId: string;
}

const CoursePreview = ({ course, courseId }: CoursePreviewProps) => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  // Función para obtener datos adicionales si es necesario
  // const getAdditionalCourseData = (id: string) => {
  //   try {
  //     setLoading(true);
  //     setError("");
  //     // Si necesitas hacer fetch adicional, úsalo aquí
  //     console.log("Course ID:", id);
  //     console.log("Course data received:", course);
  //   } catch (error) {
  //     console.error("Error processing course data:", error);
  //     setError("Error al procesar datos del curso");
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  console.log(course, "Course data in CoursePreview");
  // useEffect(() => {
  //   if (courseId) {
  //     getAdditionalCourseData(courseId);
  //   }
  // }, [courseId]);

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Course Preview</h1>

      {loading && (
        <div className="text-center py-8">
          <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500">
          </div>
          <p className="mt-2">Cargando datos adicionales...</p>
        </div>
      )}

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4">
          {error}
        </div>
      )}

      {course && (
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-xl font-semibold mb-4">Información del Curso</h2>

          {course.error
            ? (
              <div className="bg-yellow-100 border border-yellow-400 text-yellow-700 px-4 py-3 rounded">
                <p className="font-semibold">{course.name}</p>
                <p>{course.description}</p>
              </div>
            )
            : (
              <div>
                <div className="mb-4">
                  <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {course.name || "Sin nombre"}
                  </h3>
                  <p className="text-gray-600 mb-2">
                    {course.description || "Sin descripción"}
                  </p>
                  <p className="text-sm text-gray-500">
                    ID:{" "}
                    <span className="font-mono bg-gray-100 px-2 py-1 rounded">
                      {courseId}
                    </span>
                  </p>
                </div>

                {course.modules && course.modules.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">
                      Módulos ({course.modules.length})
                    </h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      {course.modules.slice(0, 4).map((module, index) => (
                        <div
                          key={module._id || `module-${index}`}
                          className="bg-gray-50 p-3 rounded border"
                        >
                          <p className="font-medium">
                            {module.name || `Módulo ${index + 1}`}
                          </p>
                          <p className="text-sm text-gray-600">
                            {module.description || "Sin descripción"}
                          </p>
                        </div>
                      ))}
                    </div>
                    {course.modules.length > 4 && (
                      <p className="text-sm text-gray-500 mt-2">
                        Y {course.modules.length - 4} módulos más...
                      </p>
                    )}
                  </div>
                )}

                {course.students && course.students.length > 0 && (
                  <div className="mb-4">
                    <h4 className="text-lg font-semibold mb-2">
                      Estudiantes Inscritos ({course.students.length})
                    </h4>
                    <div className="text-sm text-gray-600">
                      {course.students.length}{" "}
                      estudiante{course.students.length > 1 ? "s" : ""}{" "}
                      inscrito{course.students.length > 1 ? "s" : ""}
                    </div>
                  </div>
                )}

                <details className="mt-4">
                  <summary className="cursor-pointer text-sm text-gray-600 hover:text-gray-800">
                    Ver datos completos (JSON)
                  </summary>
                  <pre className="bg-gray-50 p-4 rounded overflow-auto text-xs mt-2">
                  {JSON.stringify(course, null, 2)}
                  </pre>
                </details>
              </div>
            )}
        </div>
      )}

      {!course && (
        <div className="text-center py-8 text-gray-500">
          <p>No se pudo cargar la información del curso.</p>
        </div>
      )}
    </div>
  );
};

export default CoursePreview;
