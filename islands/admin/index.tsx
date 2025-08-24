import { useEffect, useState } from "preact/hooks";
import Sidebar from "./sidebar.tsx";
import HeaderAdminDashboard from "./header.tsx";
import AdminDashboard from "./dashboardAdmin.tsx";
import Students from "./students/students.tsx";
import StudentDetail from "./students/studentDetails.tsx";
import Courses from "./courses/courses.tsx";
import CourseDetails from "./courses/courseDetails.tsx";
import CreateUser from "./students/createUser.tsx";
import CreateCourse from "./courses/createCourse.tsx";
import ModulesView from "./module/modulesView.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { updateCourseModuleOptions } from "./adminActions/index.ts";

import { authenticatedGet } from "../../lib/apiHelpers.ts";
import { Course } from "../../types/course.ts";
import { Student } from "../../routes/api/users/user.tsx";

// Para el tipo del módulo
interface ModuleData {
  course?: string;
  name?: string;
  [key: string]: unknown;
}

export function AdminDashboards() {
  const token = localStorage.getItem("jwtToken") || "{}";
  const UserInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const [view, setView] = useState("dashboard");
  const [students, setStudents] = useState([] as Student[]);
  const [courses, setCourses] = useState([] as Course[]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModuleCreated, setIsModuleCreated] = useState(false);
  const [isModuleError, setIsModuleError] = useState("");

  const getStudents = async () => {
    try {
      // Usar el helper autenticado con refresh automático
      const response = await authenticatedGet(
        "api/users/user?adminOrg=" + UserInfo.adminOrg,
      );
      setStudents(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const getAllModules = async () => {
    try {
      const response = await axiod.get(
        `/api/modules/module?adminOrg=${UserInfo.adminOrg}`,
        {
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        },
      );

      return response.data;
    } catch (error) {
      console.error("Error fetching modules:", error);
    }
  };

  const getCourses = async () => {
    try {
      // Usar el helper autenticado con refresh automático
      const response = await authenticatedGet(
        `api/courses/course?adminOrg=${UserInfo.adminOrg}`,
      );

      setCourses(response.data);
      return response.data;
    } catch (error) {
      console.error(error);
    }
  };

  const createModule = async (module: any) => {
    try {
      const response = await axiod.post(
        `/api/modules/module?adminOrg=${UserInfo.adminOrg}`,
        {
          name: module.name,
          course: module.course,
        },
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        },
      );

      await updateCourseModuleOptions(module.course, response.data.id);

      setIsModuleCreated(true);
      return response.data;
    } catch (error: any) {
      setIsModuleError(error.message || "Error creating module");
    }
  };

  const resetModuleCreated = () => {
    setIsModuleCreated(false);
  };

  // Abrir detalle de estudiante
  const openStudentDetail = (student: any) => {
    setSelectedStudent(student);
    setView("studentDetail");
  };

  // Cerrar detalle de estudiante
  const closeStudentDetail = () => {
    setSelectedStudent(null);
    setView("students");
  };

  if (isModuleCreated) {
    setTimeout(() => {
      setIsModuleCreated(false);
    }, 2000);
  }

  if (isModuleError) {
    setTimeout(() => {
      setIsModuleError("");
    }, 2000);
  }

  useEffect(() => {
    getStudents();
    getCourses();
  }, []);

  useEffect(() => {
    getCourses();
  }, [isModuleCreated]);

  return (
    <div className={`dashboard-grid  ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Sidebar */}
      <Sidebar
        view={view}
        setView={setView}
        sidebarOpen={sidebarOpen}
        setSidebarOpen={setSidebarOpen}
      />

      {/* Header */}
      <HeaderAdminDashboard setSidebarOpen={setSidebarOpen} />

      {/* Main Content */}
      <main
        style={{ padding: "46px" }}
        className="main md:p-6 overflow-y-auto"
      >
        {view === "dashboard" && (
          <AdminDashboard students={students} courses={courses} />
        )}
        {view === "students" && (
          <Students
            getCourses={getCourses}
            students={students}
            openStudentDetail={openStudentDetail}
            getStudents={getStudents}
            courses={courses}
          />
        )}
        {view === "studentDetail" && (
          <StudentDetail
            courses={courses}
            student={selectedStudent}
            closeDetail={closeStudentDetail}
          />
        )}
        {view === "courses" && (
          <Courses
            students={students}
            getStudents={getStudents}
            courses={courses}
            createModule={createModule}
            isModuleCreated={isModuleCreated}
            isModuleError={isModuleError}
            getAllModules={getAllModules}
            getCourses={getCourses}
            resetModuleCreated={resetModuleCreated}
          />
        )}
        {view === "modules" && (
          <ModulesView
            token={token}
            courses={courses}
            userInfo={UserInfo}
            createModule={createModule}
            isModuleCreated={isModuleCreated}
            isModuleError={isModuleError}
          />
        )}
        {view === "createUser" && (
          <CreateUser
            setView={setView}
            token={token}
            getStudents={getStudents}
          />
        )}
        {view === "createCourse" && (
          <CreateCourse
            getCourses={getCourses}
            token={token}
            setView={setView}
          />
        )}
      </main>
    </div>
  );
}
