import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { updateMultipleCourses } from "../index.ts";
import { authenticatedGet } from "../../../../lib/apiHelpers.ts";

const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

export const editStudent = async (
  studentId: string,
  username: string,
  password: string,
  coursesIdsWhereUserWillBe: string[],
) => {
  try {
    const response = await axiod.patch(`/api/users/user`, {
      id: "jsjs",
      username,
      password,
    }, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
      },
    });

    // if (response.status === 200 && coursesIdsWhereUserWillBe.length > 0) {
    //   await updateMultipleCourses(
    //     coursesIdsWhereUserWillBe,
    //     studentId,
    //   );
    // }

    return response.data;
  } catch (error) {
    throw new Error(
      `Failed to edit user: ${
        (error instanceof Error) ? error.message : String(error)
      }`,
    );
  }
  // Implementation for editing a user
};

export const getCourses = async () => {
  try {
    const response = await authenticatedGet(
      `api/courses/course?adminOrg=${userInfo.adminOrg}`,
    );

    return response.data;
  } catch (error) {
    return error;
  }
};
