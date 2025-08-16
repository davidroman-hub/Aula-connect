import { useEffect, useState } from "preact/hooks";
import Sidebar from "./sidebar.tsx";
import HeaderAdminDashboard from "./header.tsx";
import AdminDashboard from "./dashboardAdmin.tsx";
import Students from "./students/students.tsx";
import StudentDetail from "./students/studentDetails.tsx";
import Courses from "./courses/courses.tsx";
import CreateUser from "./students/createUser.tsx";
import CreateCourse from "./courses/createCourse.tsx";
import ModulesView from "./module/modulesView.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { updateCourseModuleOptions } from "./adminActions/index.ts";

export function AdminDashboards() {
  const token = localStorage.getItem("jwtToken") || "{}";
  const [view, setView] = useState("dashboard");
  const [students, setStudents] = useState([] as any[]);
  const [courses, setCourses] = useState([] as any[]);

  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isModuleCreated, setIsModuleCreated] = useState(false);
  const [isModuleError, setIsModuleError] = useState("");

  const getStudents = async () => {
    try {
      const response = await axiod.get(
        `api/users/user`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setStudents(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const getCourses = async () => {
    try {
      const response = await axiod.get(
        `api/courses/course`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );
      setCourses(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  const createModule = async (module: any) => {
    try {
      const response = await axiod.post(
        `/api/modules/module`,
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

  return (
    <div className={`dashboard-grid ${sidebarOpen ? "sidebar-open" : ""}`}>
      {/* Overlay para móviles */}
      <div className="overlay" onClick={() => setSidebarOpen(false)}></div>

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
      <main className="main p-4 md:p-6 overflow-y-auto">
        {view === "dashboard" && (
          <AdminDashboard students={students} courses={courses} />
        )}
        {view === "students" && (
          <Students students={students} openStudentDetail={openStudentDetail} />
        )}
        {view === "studentDetail" && (
          <StudentDetail
            student={selectedStudent}
            closeDetail={closeStudentDetail}
          />
        )}
        {view === "courses" && (
          <Courses
            courses={courses}
            createModule={createModule}
            isModuleCreated={isModuleCreated}
            isModuleError={isModuleError}
          />
        )}
        {view === "modules" && (
          <ModulesView
            token={token}
            courses={courses}
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
