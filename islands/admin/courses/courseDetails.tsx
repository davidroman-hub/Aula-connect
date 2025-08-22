import { useEffect, useState } from "preact/hooks";
import { palette } from "../../../assets/colors.ts";

import { Module } from "../../../routes/api/modules/module.tsx";
import { Student } from "../../../routes/api/users/user.tsx";
import OverviewCards from "./partsOfCourseDetails/overviewCards.tsx";
import EditModule from "../module/editModule.tsx";
import ModulePreviewModal from "../module/modulePreviewModal.tsx";
import { Course, CourseRawInfo } from "../../../types/course.ts";
import ModulesTab from "./partsOfCourseDetails/modulesTab.tsx";
import StudentsTab from "./partsOfCourseDetails/students.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";

interface ModuleData {
  name: string;
  course: string;
}
export interface CourseDetailsProps {
  course: CourseRawInfo;
  token: string;
  onBack: () => void;
  getStudents: () => Promise<Student[]>;
  getModules: () => Promise<Module[]>;
  createModule: (moduleData: any) => void;
  getCourses: () => Promise<Course[]>;
  courses: Course[];
  isModuleCreated: boolean;
  isModuleError: string;
  resetModuleCreated: () => void;
}

export const getDifficultyColor = (difficulty: string) => {
  switch (difficulty) {
    case "beginner":
      return "bg-green-100 text-green-800";
    case "intermediate":
      return "bg-yellow-100 text-yellow-800";
    case "advanced":
      return "bg-red-100 text-red-800";
    default:
      return "bg-gray-100 text-gray-800";
  }
};

export const formatDuration = (minutes: number) => {
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0) {
    return `${hours}h ${mins}m`;
  }
  return `${mins}m`;
};

function CourseDetails(
  {
    course,
    onBack,
    getStudents,
    getModules,
    token,
    courses,
    createModule,
    isModuleCreated,
    isModuleError,
    getCourses,
    resetModuleCreated,
  }: CourseDetailsProps,
) {
  const [activeTab, setActiveTab] = useState<
    "overview" | "modules" | "students"
  >("overview");

  const [students, setStudents] = useState<Student[]>([]);
  const [modules, setModules] = useState<Module[]>([]);
  const [editingModule, setEditingModule] = useState<Module | null>(null);
  const [previewModule, setPreviewModule] = useState<Module | null>(null);
  const [openAddStudent, setOpenAddStudent] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [successMessageUpdateStudent, setSuccessMessageUpdateStudent] =
    useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const removeStudentFromCourse = async (studentId: string) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Get current students from updated course state
      const currentStudents = [
        ...(updatedCourse?.students || course.students || []),
      ];

      const response = await axiod.patch(
        `/api/courses/course`,
        {
          _id: course._id,
          students: currentStudents.filter((s) => s !== studentId),
        },
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      );

      if (response.status === 200) {
        // Refresh data after student is removed
        await getCourses(); // Update courses list
        const updatedStudents = await getStudents();
        setStudents(updatedStudents);
        setSuccessMessageUpdateStudent("Student removed successfully");
        setLoading(false);
      } else {
        throw new Error(`Failed to remove student. Status: ${response.status}`);
      }
    } catch (error) {
      setLoading(false);
      const errorMessage = error instanceof Error
        ? error.message
        : JSON.stringify(error);
      setError(`Error removing student from course: ${errorMessage}`);
    }
  };

  const addMultipleStudentsToCourse = async (studentIds: string[]) => {
    setLoading(true);
    setError(null); // Clear previous errors

    try {
      // Get the current course state
      let currentStudents = [
        ...(updatedCourse?.students || course.students || []),
      ];

      // Add each student sequentially to avoid conflicts
      for (const studentId of studentIds) {
        const response = await axiod.patch(
          `/api/courses/course`,
          {
            _id: course._id,
            students: [...currentStudents, studentId],
          },
          {
            headers: {
              "Authorization": `Bearer ${token}`,
            },
          },
        );

        if (response.status === 200) {
          // Update the current students array for the next iteration
          currentStudents = [...currentStudents, studentId];
        } else {
          throw new Error(`Failed to add student ${studentId}`);
        }
      }

      // Refresh data after all students are added
      await getCourses(); // Update courses list
      const updatedStudents = await getStudents();
      setStudents(updatedStudents);
      setSuccessMessageUpdateStudent("Students added successfully");

      setLoading(false);
    } catch (error) {
      setLoading(false);
      const errorMessage = error instanceof Error
        ? error.message
        : JSON.stringify(error);
      setError(`Error adding students to course: ${errorMessage}`);
    }
  };

  // Buscar el curso actualizado en la lista de cursos
  const updatedCourse = courses.find((c) => c._id === course._id) || course;

  // Calcular el objeto del curso con datos filtrados dinámicamente
  const newCourseObject = {
    _id: updatedCourse?._id || "",
    name: updatedCourse?.name || "",
    slug: updatedCourse?.slug || "",
    modules: modules.length > 0
      ? modules?.filter((m) => {
        if (!m._id) return false;
        // updatedCourse.modules puede ser un array de strings o Module[]
        const moduleIds = Array.isArray(updatedCourse?.modules)
          ? updatedCourse.modules.map((mod) =>
            typeof mod === "string" ? mod : mod._id
          )
          : [];
        return moduleIds.includes(m._id);
      })
      : [],
    students: students?.filter((s) => {
      if (!s._id) return false;
      // updatedCourse.students puede ser un array de strings o Student[]
      const studentIds = Array.isArray(updatedCourse?.students)
        ? updatedCourse.students.map((student) =>
          typeof student === "string" ? student : student._id
        )
        : [];
      return studentIds.includes(s._id);
    }) || [],
  } as Course;

  const newCourseObjectSelect = {
    name: course?.name || "",
    _id: course?._id || "",
  };

  useEffect(() => {
    if (course) {
      (async () => {
        const students = await getStudents();
        const modules = await getModules();
        setStudents(students);
        setModules(modules);
      })();
    }
  }, []);

  useEffect(() => {
    if (course && isModuleCreated) {
      (async () => {
        await getCourses();
        const students = await getStudents();
        const modules = await getModules();
        setStudents(students);
        setModules(modules);
        resetModuleCreated();
      })();
    }
  }, [isModuleCreated]);

  const handleEditModule = (module: Module) => {
    setEditingModule(module);
  };

  const handleSaveModule = async (updatedModule: Module) => {
    try {
      setModules((prev) =>
        prev.map((module) =>
          module._id === updatedModule._id ? updatedModule : module
        )
      );
      setEditingModule(null);
      await getModules();
    } catch (error) {
      console.error("Error saving module:", error);
    }
  };

  const handleCancelEdit = () => {
    setEditingModule(null);
  };

  if (editingModule) {
    return (
      <EditModule
        module={editingModule}
        onSave={handleSaveModule}
        onCancel={handleCancelEdit}
        token={token}
      />
    );
  }

  if (successMessageUpdateStudent) {
    setTimeout(() => {
      setSuccessMessageUpdateStudent(null);
      setOpenAddStudent(false);
    }, 3000);
  }

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <button
              type="button"
              onClick={onBack}
              className="flex items-center justify-center w-10 h-10 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors"
            >
              <i className="fas fa-arrow-left text-gray-600"></i>
            </button>
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {newCourseObject?.name}
              </h1>
              <p className="text-gray-600">ID: {newCourseObject?._id}</p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold text-[${palette.primary}]`}>
                {newCourseObject?.modules.length}
              </div>
              <p className="text-sm text-gray-600">Módulos</p>
            </div>
            <div className="text-center">
              <div className={`text-2xl font-bold text-[${palette.primary}]`}>
                {newCourseObject?.students.length}
              </div>
              <p className="text-sm text-gray-600">Estudiantes</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "overview"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            <span className="hidden sm:inline">Resumen</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("modules")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "modules"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-book mr-2"></i>
            <span className="hidden sm:inline">Módulos</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("students")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "students"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-users mr-2"></i>
            <span className="hidden sm:inline">Estudiantes</span>
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewCards
              newCourseObject={newCourseObject}
              formatDuration={formatDuration}
              isAdmin="admin"
            />
          )}

          {/* Modules Tab */}
          {activeTab === "modules" && (
            <ModulesTab
              createModule={createModule}
              isModuleCreated={isModuleCreated}
              newCourseObjectSelect={newCourseObjectSelect}
              isModuleError={isModuleError}
              newCourseObject={newCourseObject}
              setPreviewModule={setPreviewModule}
              formatDuration={formatDuration}
              handleEditModule={handleEditModule}
            />
          )}

          {/* Students Tab */}
          {activeTab === "students" && (
            <StudentsTab
              successMessageUpdateStudent={successMessageUpdateStudent}
              newCourseObject={newCourseObject}
              setOpenAddStudent={setOpenAddStudent}
              removeStudentFromCourse={removeStudentFromCourse}
              openAddStudent={openAddStudent}
              error={error}
              courses={courses}
              students={students}
              loading={loading}
              addStudentToCourse={addMultipleStudentsToCourse}
            />
          )}
        </div>
      </div>

      {previewModule && (
        <ModulePreviewModal
          module={previewModule}
          isOpen={Boolean(previewModule)}
          onClose={() => setPreviewModule(null)}
          courses={courses}
        />
      )}
    </div>
  );
}

export default CourseDetails;
