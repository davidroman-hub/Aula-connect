import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { Course } from "../../../routes/api/courses/course.tsx";
import { Module } from "../../../routes/api/modules/module.tsx";

export const updateCourseModuleOptions = async (
  courseSlug: string,
  newModule: string,
) => {
  try {
    // First, get the current course to preserve existing modules
    const getCourseResponse = await axiod.get(`/api/courses/course`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    const currentCourse = getCourseResponse.data.find((course: Course) =>
      course.slug === courseSlug
    );

    if (!currentCourse) {
      throw new Error("Course not found");
    }

    // Add the new module to existing modules array
    const updatedModules = [...(currentCourse.modules || []), newModule];

    const response = await axiod.patch(`/api/courses/course`, {
      slug: courseSlug,
      modules: updatedModules,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating course:", error);
    throw new Error("Failed to update course");
  }
};

export const getModulesByCourse = async (courseName: string) => {
  try {
    const response = await axiod.get(`/api/modules/module`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    // Filter modules by course
    const modules = response.data.filter((module: Module) =>
      module.course === courseName
    );

    return modules;
  } catch (error) {
    console.error("Error fetching modules:", error);
    throw new Error("Failed to fetch modules");
  }
};

export const updateModule = async (module: Module) => {
  try {
    const response = await axiod.patch(`/api/modules/module`, module, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error updating module:", error);
    throw new Error("Failed to update module");
  }
};

export const createModule = async (moduleData: Partial<Module>) => {
  try {
    const response = await axiod.post(`/api/modules/module`, {
      ...moduleData,
      content: moduleData.content || {
        description: "",
        objectives: [],
        duration: 0,
        difficulty: "beginner",
        materials: [],
        exercises: [],
        notes: "",
      },
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    console.error("Error creating module:", error);
    throw new Error("Failed to create module");
  }
};
