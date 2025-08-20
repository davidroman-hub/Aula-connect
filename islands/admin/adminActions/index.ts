import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { Course } from "../../../types/course.ts";

export const updateCourseModuleOptions = async (
  courseId: string,
  newModule: string,
) => {
  try {
    const getCourseResponse = await axiod.get(`/api/courses/course`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    const currentCourse = getCourseResponse.data.find((course: Course) =>
      course._id === courseId
    );

    if (!currentCourse) {
      throw new Error("Course not found");
    }

    const updatedModules = [...(currentCourse.modules || []), newModule];

    const response = await axiod.patch(`/api/courses/course`, {
      _id: courseId,
      modules: updatedModules,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to update course: ${
        (error instanceof Error) ? error.message : String(error)
      }`,
    );
  }
};

export const updateCourseStudentOptions = async (
  courseId: string,
  newStudent: string,
) => {
  try {
    const getCourseResponse = await axiod.get(`/api/courses/course`, {
      headers: {
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    const currentCourse = getCourseResponse.data.find((course: Course) =>
      course._id === courseId
    );

    if (!currentCourse) {
      throw new Error("Course not found");
    }

    const updatedStudents = [...(currentCourse.students || []), newStudent];

    const response = await axiod.patch(`/api/courses/course`, {
      _id: courseId,
      students: updatedStudents,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to update course: ${
        (error instanceof Error) ? error.message : String(error)
      }`,
    );
  }
};

export const updateMultipleCourses = async (
  courseIds: string[],
  studentId: string,
) => {
  try {
    const updatePromises = courseIds.map((courseId) =>
      updateCourseStudentOptions(courseId, studentId)
    );
    const result = await Promise.all(updatePromises);

    return result;
  } catch (error) {
    throw new Error(
      `Failed to update multiple courses: ${
        (error instanceof Error) ? error.message : String(error)
      }`,
    );
  }
};
