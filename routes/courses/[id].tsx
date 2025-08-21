import CourseLoader from "../../islands/CourseLoader.tsx";
import { Handlers, PageProps } from "$fresh/server.ts";
import { CourseRawInfo } from "../../types/course.ts";
import { Module } from "../api/modules/module.tsx";
import { getCurrentUser } from "../../middleware/auth.ts";

export const handler: Handlers = {
  async GET(req, context) {
    const { id } = context.params;

    // Verificar usuario actual
    const currentUser = await getCurrentUser(req);

    if (!currentUser) {
      // Usuario no autenticado, redirigir al login
      return new Response("", {
        status: 302,
        headers: { Location: "/login" },
      });
    }

    // Delay de 2 segundos
    await new Promise((resolve) => setTimeout(resolve, 2000));

    try {
      // Obtener la URL base
      const url = new URL(req.url);

      // Extraer adminOrg correctamente del query string
      const adminOrg = url.search.replace("?", "");
      const adminOrgTransformed = parseInt(adminOrg);
      const baseUrl = `${url.protocol}//${url.host}`;

      // Hacer fetch real a la API de cursos
      const courseResponse = await fetch(
        `${baseUrl}/api/courses/course?adminOrg=${adminOrgTransformed}&id=${id}`,
      );

      if (!courseResponse.ok) {
        throw new Error(`Failed to fetch course: ${courseResponse.status}`);
      }

      const courseData = await courseResponse.json();

      // Verificar que el adminOrg del curso coincida con el del usuario
      if (courseData.adminOrg !== currentUser.adminOrg) {
        console.warn(
          `User adminOrg (${currentUser.adminOrg}) doesn't match course adminOrg (${courseData.adminOrg})`,
        );
        // Redirigir a la lista de cursos
        return new Response("", {
          status: 302,
          headers: { Location: "/user-dash" },
        });
      }

      const moduleResponse = await fetch(
        `${baseUrl}/api/modules/module?adminOrg=${adminOrgTransformed}`,
      );

      // Verificar si la respuesta de módulos es exitosa
      if (!moduleResponse.ok) {
        throw new Error(`Failed to fetch modules: ${moduleResponse.status}`);
      }

      const modulesData = await moduleResponse.json();
      // Asegurarse de que modulesData sea un array
      const modulesArray = Array.isArray(modulesData) ? modulesData : [];

      modulesArray.forEach((module: Module) => {
        if (module.course === id) {
          courseData.modules = courseData.modules || [];
          courseData.modules.push({
            ...module,
          });
        }
      });

      return context.render({
        course: {
          courseData: [courseData], // Convertir a array como espera CourseLoader
          modules: modulesArray.filter((module: Module) =>
            module.course === id
          ),
        },
        courseId: id,
      });
    } catch (_error) {
      console.error("Error fetching course data:", _error);
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
      <CourseLoader course={course} courseId={courseId} />
    </div>
  );
};
export default Course;
