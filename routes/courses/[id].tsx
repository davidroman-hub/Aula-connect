import CoursePreview from "../../islands/student/course/selectedCourse.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CourseRawInfo } from "../../types/course.ts";
import { Module } from "../api/modules/module.tsx";
import mod from "https://deno.land/x/i18next_http_middleware@v3.3.2/index.js";

export const handler: Handlers = {
  async GET(req, context) {
    const { id } = context.params;

    try {
      // Obtener la URL base
      const url = new URL(req.url);
      const baseUrl = `${url.protocol}//${url.host}`;

      // Hacer fetch real a la API de cursos
      const response = await fetch(`${baseUrl}/api/courses/course?id=${id}`);

      if (!response.ok) {
        throw new Error(`Failed to fetch course: ${response.status}`);
      }

      const courseData = await response.json();

      const responseModules = await fetch(`${baseUrl}/api/modules/module`);
      // Verificar si la respuesta de módulos es exitosa
      if (!responseModules.ok) {
        throw new Error(`Failed to fetch modules: ${responseModules.status}`);
      }

      if (!responseModules.ok) {
        throw new Error(`Failed to fetch modules: ${responseModules.status}`);
      }

      const modulesData = await responseModules.json();

      modulesData.forEach((module: Module) => {
        if (module.course === id) {
          courseData.modules = courseData.modules || [];
          courseData.modules.push({
            ...module,
          });
        }
      });

      const newData = {
        ...courseData,
        modules: modulesData.filter((module: Module) => module.course === id),
      };

      return context.render({
        course: newData,
        courseId: id,
      });
    } catch (error) {
      console.error("Error fetching course data:", error);

      // Datos de fallback si falla la API
      const fallbackData = {
        _id: id,
        name: "Curso no encontrado",
        slug: "curso-no-encontrado",
        modules: [],
        students: [],
        description: "No se pudo cargar la descripción del curso.",
        difficulty: "Desconocida",
      };

      return context.render({
        course: fallbackData as CourseRawInfo,
        courseId: id,
      });
    }
  },
};

const Course = ({ data }: PageProps) => {
  const { course, courseId } = data;

  return (
    <div>
      <CoursePreview course={course} courseId={courseId} />
    </div>
  );
};
export default Course;
