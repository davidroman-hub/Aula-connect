import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { updateMultipleCourses } from "../index.ts";

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
