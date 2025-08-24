import { useEffect, useState } from "preact/hooks";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { palette } from "../../../assets/colors.ts";
import { Student } from "../../../routes/api/users/user.tsx";

import { updateMultipleCourses } from "../adminActions/index.ts";
import { ErrorAlert, SuccessAlert } from "../../alerts/index.tsx";
import { ButtonSpinnerLoading } from "../../components/spinners/spinners.tsx";
import { Course } from "../../../types/course.ts";

type StudentUpdateProps = {
  getCourses: () => Promise<Course[]>;
  student: Student;
  getStudents: () => Promise<Student[]>;
};

const StudentUpdate = (
  { getCourses, student, getStudents }: StudentUpdateProps,
) => {
  const [isEditingUser, setIsEditingUser] = useState(false);
  const [courses, setCourses] = useState<Course[]>([]);
  const [loading, setLoading] = useState(false);
  const [successMessageUpdateStudent, setSuccessMessageUpdateStudent] =
    useState("");
  const [successMessageUpdateCourses, setSuccessMessageUpdateCourses] =
    useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: student.username,
    password: student.password || "",
    course: student.courses || [],
  });

  useEffect(() => {
    setFormData({
      name: student.username,
      password: student.password || "",
      course: student.courses || [],
    });
  }, [student]);

  const closeModal = () => {
    setIsEditingUser(false);
    setFormData({
      name: student.username,
      password: student.password || "",
      course: student.courses || [],
    });
  };

  const handleInputChange = (e: Event) => {
    const target = e.target as HTMLInputElement;
    setFormData({
      ...formData,
      [target.name]: target.value,
    });
  };

  const handleCourseSelect = (courseId: string) => {
    const isSelected = formData.course.some((course) =>
      typeof course === "string" ? course === courseId : course._id === courseId
    );

    if (isSelected) {
      setFormData({
        ...formData,
        course: formData.course.filter((course) =>
          typeof course === "string"
            ? course !== courseId
            : course._id !== courseId
        ),
      });
    } else {
      const selectedCourse = courses.find((course) => course._id === courseId);
      if (selectedCourse) {
        setFormData({
          ...formData,
          course: [...formData.course, selectedCourse],
        });
      }
    }
  };

  const removeCourse = (courseId: string) => {
    setFormData({
      ...formData,
      course: formData.course.filter((course) =>
        typeof course === "string"
          ? course !== courseId
          : course._id !== courseId
      ),
    });
  };

  const editStudent = async (
    studentId: string,
    username: string,
    password: string,
    coursesIdsWhereUserWillBe: string[],
  ) => {
    setLoading(true);
    try {
      const response = await axiod.patch(`/api/users/user`, {
        id: studentId,
        username,
        password,
      }, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("jwtToken")}`,
        },
      });

      if (response.status === 200 && coursesIdsWhereUserWillBe.length > 0) {
        const updateCoursers = await updateMultipleCourses(
          coursesIdsWhereUserWillBe,
          studentId,
        );
        setLoading(false);
        if (updateCoursers.length > 0) {
          setSuccessMessageUpdateCourses("Courses updated successfully");
        }
      }

      if (response.status === 200) {
        setLoading(false);
        setSuccessMessageUpdateStudent("Student updated successfully");
      }

      await getCourses();
      await getStudents();

      return response.data;
    } catch (error) {
      setLoading(false);
      setErrorMessage(
        `${
          typeof error === "object" && error !== null && "response" in error &&
            typeof (error as any).response?.data === "string"
            ? (error as any).response.data
            : String(error)
        }`,
      );
    }
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    editStudent(
      student._id,
      formData.name,
      formData.password || "",
      formData.course.map((course) => course._id),
    );
  };

  useEffect(() => {
    const fetchCourses = async () => {
      const coursesData = await getCourses();
      setCourses(coursesData);
    };
    fetchCourses();
  }, []);

  if (
    successMessageUpdateStudent || successMessageUpdateCourses || errorMessage
  ) {
    setTimeout(() => {
      closeModal();
      setErrorMessage("");
      setSuccessMessageUpdateStudent("");
      setSuccessMessageUpdateCourses("");
    }, 2000);
  }

  const coursesFilterdFromStudent = courses?.filter((course) =>
    !student.currentLesson.find((studentCourse) =>
      studentCourse.courseId === course._id
    )
  );

  return (
    <div className="flex items-center justify-center p-4">
      <button
        type="button"
        onClick={() => setIsEditingUser(true)}
        className="text-gray-500 hover:text-gray-700"
      >
        <i className="fas fa-edit"></i>
      </button>

      {isEditingUser && (
        <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 w-full h-full"
            onClick={closeModal}
            disabled={loading}
            onKeyDown={(e) => e.key === "Escape" && closeModal()}
            aria-label="Close modal"
          />
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-[modalFadeIn_0.3s_ease-out_forwards] overflow-hidden relative z-10">
            <div
              className={`bg-[${palette.primary}]  p-5 flex justify-between items-center`}
            >
              <h3 className="text-xl font-bold text-white">
                <i className="fas fa-user text-white"></i>{" "}
                Modify student information
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col">
              {errorMessage && <ErrorAlert message={errorMessage} />}
              {successMessageUpdateStudent && (
                <SuccessAlert message={successMessageUpdateStudent} />
              )}
              {successMessageUpdateCourses && (
                <SuccessAlert message={successMessageUpdateCourses} />
              )}
              <form className="flex flex-col space-y-4" onSubmit={handleSubmit}>
                <div>
                  <label
                    htmlFor="moduleName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fas fa-user text-white" /> Name
                  </label>
                  <input
                    disabled={loading}
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                    name="name"
                    value={formData.name}
                    onChange={handleInputChange}
                    placeholder="Enter a new name"
                    required
                  />
                </div>
                <div>
                  <label
                    htmlFor="moduleName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <i className="fas fa-password text-black"></i> Password
                  </label>
                  <input
                    disabled={loading}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                    type="text"
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="Enter a new password"
                    required
                  />
                </div>

                {/* Multi-select with chips for courses */}
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-book text-black"></i> Courses
                  </div>

                  {/* Selected courses chips */}
                  {formData.course.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.course.map((course) => {
                        const courseName = typeof course === "string"
                          ? courses.find((c) => c._id === course)?.name ||
                            course
                          : course.name;
                        const courseId = typeof course === "string"
                          ? course
                          : course._id;

                        return (
                          <span
                            key={courseId}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm bg-[${palette.primary}] text-white`}
                          >
                            {courseName}
                            <button
                              type="button"
                              onClick={() => removeCourse(courseId)}
                              className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  {/* Dropdown for available courses */}
                  <select
                    onChange={(e) => {
                      const target = e.target as HTMLSelectElement;
                      if (target.value) {
                        handleCourseSelect(target.value);
                        target.value = ""; // Reset select
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition pr-8 text-black"
                  >
                    <option value="">Add Course...</option>
                    {coursesFilterdFromStudent.filter((course) => {
                      const isSelected = formData.course.some(
                        (selectedCourse) =>
                          typeof selectedCourse === "string"
                            ? selectedCourse === course._id
                            : selectedCourse._id === course._id,
                      );
                      return !isSelected;
                    }).map((course) => (
                      <option key={course._id} value={course._id}>
                        {course.name}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className={` bg-[${palette.primary}] text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-[${palette.hover}] transition`}
                  type="submit"
                  disabled={loading || successMessageUpdateCourses.length > 0 ||
                    successMessageUpdateStudent.length > 0}
                >
                  {loading ? <ButtonSpinnerLoading /> : "Update Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default StudentUpdate;
