import { useState } from "preact/hooks";
import { palette } from "../../../../assets/colors.ts";
import { Student } from "../../../../routes/api/users/user.tsx";
import { Course } from "../../../../types/course.ts";
import { ErrorAlert, SuccessAlert } from "../../../alerts/index.tsx";
import { ButtonSpinnerLoading } from "../../../components/spinners/spinners.tsx";

type StudentsProps = {
  newCourseObject: Course;
  removeStudentFromCourse: (studentId: string) => void;
  setOpenAddStudent: (open: boolean) => void;
  openAddStudent: boolean;
  error: string | null;
  successMessageUpdateStudent: string | null;
  loading: boolean;
  courses: Course[];
  students: Student[];
  addStudentToCourse: (studentId: string[]) => Promise<void>;
};

const StudentsTab = (
  {
    newCourseObject,
    removeStudentFromCourse,
    setOpenAddStudent,
    openAddStudent,
    error,
    successMessageUpdateStudent,
    loading,
    courses,
    students,
    addStudentToCourse,
  }: StudentsProps,
) => {
  const [formData, setFormData] = useState([] as Student[]);

  const studentsInNotCourse = students.filter((student) =>
    !newCourseObject.students.find((s) => s._id === student._id)
  );

  const handleStudentsSelect = (studentId: string) => {
    const isSelected = formData.some((student) =>
      typeof student === "string"
        ? student === studentId
        : student._id === studentId
    );

    if (isSelected) {
      setFormData((prev) =>
        prev.filter((student) =>
          typeof student === "string"
            ? student !== studentId
            : student._id !== studentId
        )
      );
    } else {
      const selectedStudent = students.find((student) =>
        student._id === studentId
      );
      if (selectedStudent) {
        setFormData((prev) => [...prev, selectedStudent]);
      }
    }
  };

  const removeUser = (studentId: string) => {
    setFormData((prev) =>
      prev.filter((student) =>
        typeof student === "string"
          ? student !== studentId
          : student._id !== studentId
      )
    );
  };

  const handleSubmit = (e: Event) => {
    e.preventDefault();
    if (formData.length === 0) return;
    const studentIds = formData.map((student) =>
      typeof student === "string" ? student : student._id
    );
    addStudentToCourse(studentIds);
  };

  if (successMessageUpdateStudent) {
    setTimeout(() => {
      setFormData([]);
    }, 1500);
  }

  return (
    <div className="space-y-4">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-4">
        <h3 className="text-lg font-semibold">Estudiantes Inscritos</h3>
        <button
          type="button"
          className={`px-4 py-2 bg-[${palette.primary}] text-white rounded-lg hover:bg-[${palette.hover}] transition-colors text-sm`}
          onClick={() => setOpenAddStudent(true)}
        >
          <i className="fas fa-user-plus mr-2"></i> Agregar Estudiante
        </button>
      </div>

      {openAddStudent && (
        <div className="fixed inset-0 backdrop-blur-[3px] bg-opacity-50 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 w-full h-full"
            onClick={() => setOpenAddStudent(false)}
            disabled={loading}
            onKeyDown={(e) => e.key === "Escape" && setOpenAddStudent(false)}
            aria-label="Close modal"
          />
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-[modalFadeIn_0.3s_ease-out_forwards] overflow-hidden relative z-10">
            <div
              className={`bg-[${palette.primary}]  p-5 flex justify-between items-center`}
            >
              <h3 className="text-xl font-bold text-white">
                <i className="fas fa-user text-white"></i> Add student to course
              </h3>
              <button
                type="button"
                onClick={() => setOpenAddStudent(false)}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <i className="fas fa-times"></i>
              </button>
            </div>
            <div className="p-6 flex flex-col">
              {error && <ErrorAlert message={error} />}
              {successMessageUpdateStudent && (
                <SuccessAlert message={successMessageUpdateStudent} />
              )}
              {successMessageUpdateStudent && (
                <SuccessAlert message={successMessageUpdateStudent} />
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
                    disabled
                    type="text"
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                    name="name"
                    value={newCourseObject.name}
                    placeholder="Enter a new name"
                    required
                  />
                </div>

                {/* Multi-select with chips for students */}
                <div>
                  <div className="block text-sm font-medium text-gray-700 mb-2">
                    <i className="fas fa-book text-black"></i> Students
                  </div>

                  {/* Selected students chips */}
                  {formData.length > 0 && (
                    <div className="flex flex-wrap gap-2 mb-3">
                      {formData.map((student) => {
                        const studentName = typeof student === "string"
                          ? students.find((s) => s._id === student)?.username ||
                            student
                          : student.username;
                        const studentId = typeof student === "string"
                          ? student
                          : student._id;

                        return (
                          <span
                            key={studentId}
                            className={`inline-flex items-center px-3 py-1 rounded-full text-sm bg-[${palette.primary}] text-white`}
                          >
                            {studentName}
                            <button
                              disabled={loading}
                              type="button"
                              onClick={() => removeUser(studentId)}
                              className="ml-2 text-white hover:text-gray-200 focus:outline-none"
                            >
                              <i className="fas fa-times text-xs"></i>
                            </button>
                          </span>
                        );
                      })}
                    </div>
                  )}

                  <select
                    onChange={(e) => {
                      const target = e.target as HTMLSelectElement;
                      if (target.value) {
                        handleStudentsSelect(target.value);
                        target.value = ""; // Reset select
                      }
                    }}
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition pr-8 text-black"
                  >
                    <option value="">Add Student...</option>
                    {studentsInNotCourse.filter((student) => {
                      const isSelected = formData.some(
                        (selectedStudent) =>
                          typeof selectedStudent === "string"
                            ? selectedStudent === student._id
                            : selectedStudent._id === student._id,
                      );
                      return !isSelected;
                    }).map((student) => (
                      <option key={student._id} value={student._id}>
                        {student.username}
                      </option>
                    ))}
                  </select>
                </div>

                <button
                  className={` bg-[${palette.primary}] text-white px-4 py-2 border border-gray-300 rounded-lg hover:bg-[${palette.hover}] transition`}
                  type="submit"
                  disabled={loading ||
                    (!!successMessageUpdateStudent &&
                      successMessageUpdateStudent.length > 0)}
                >
                  {loading ? <ButtonSpinnerLoading /> : "Update Student"}
                </button>
              </form>
            </div>
          </div>
        </div>
      )}

      {newCourseObject?.students.length === 0
        ? (
          <div className="text-center py-12">
            <i className="fas fa-users text-4xl text-gray-300 mb-4"></i>
            <p className="text-gray-500">
              No hay estudiantes inscritos en este curso
            </p>
          </div>
        )
        : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {newCourseObject?.students.map((
              student: Student,
              index: number,
            ) => (
              <div
                key={student.id || index}
                className="bg-white border rounded-lg p-4 hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div
                    className={`w-10 h-10 rounded-full bg-gradient-to-br from-[${palette.primary}] to-[${palette.hover}] flex items-center justify-center text-white font-semibold`}
                  >
                    {student?.username?.charAt(0).toUpperCase()}
                  </div>
                  <div className="ml-3 flex-1">
                    <h4 className="font-semibold text-gray-800">
                      {student?.username}
                    </h4>
                    <p className="text-sm text-gray-600">
                      ID: {student._id.slice(-6)}
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Tipo:</span>
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-medium ${
                        student.type === "admin"
                          ? "bg-red-100 text-red-800"
                          : "bg-blue-100 text-blue-800"
                      }`}
                    >
                      {student.type}
                    </span>
                  </div>
                </div>

                <div className="mt-4 flex gap-2">
                  <button
                    type="button"
                    className="flex-1 px-3 py-2 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded text-sm transition-colors"
                  >
                    <i className="fas fa-eye mr-2"></i> Ver Perfil
                  </button>
                  <button
                    onClick={() => removeStudentFromCourse(student._id)}
                    disabled={student.type === "admin" || loading}
                    type="button"
                    className={`px-3 py-2 ${
                      student.type === "admin"
                        ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                        : "bg-red-50 hover:bg-red-100 text-red-700"
                    } rounded text-sm transition-colors`}
                  >
                    <i className="fas fa-user-minus"></i>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
    </div>
  );
};

export default StudentsTab;
