import { useEffect, useState } from "preact/hooks";
import Sidebar from "./sidebar.tsx";
import HeaderAdminDashboard from "./header.tsx";
import AdminDashboard from "./dashboardAdmin.tsx";
import Students from "./students.tsx";
import StudentDetail from "./studentDetails.tsx";
import Courses from "./courses.tsx";
import CreateUser from "./createUser.tsx";
import CreateCourse from "./createCourse.tsx";
import axiod from "https://deno.land/x/axiod@0.26.2/mod.ts";
import { use } from "https://deno.land/x/i18next@v21.8.1/index.js";

// Datos iniciales de prueba

const initialModules = [
  { id: 1, name: "Fundamentos de JS", course: "JavaScript Profesional" },
  { id: 2, name: "React Básico", course: "React Avanzado" },
  { id: 3, name: "React Avanzado", course: "React Avanzado" },
  { id: 4, name: "Bases de Datos", course: "Desarrollo Web Full Stack" },
];

// Componente principal de la aplicación
export function AdminDashboards() {
  const token = localStorage.getItem("jwtToken") || "{}";
  const [view, setView] = useState("dashboard");
  const [students, setStudents] = useState([] as any[]);
  const [courses, setCourses] = useState([] as any[]);
  const [modules, setModules] = useState(initialModules);
  const [selectedStudent, setSelectedStudent] = useState(null);
  const [sidebarOpen, setSidebarOpen] = useState(false);

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

  // Agregar nuevo curso
  const addCourse = (course: any) => {
    const newCourse = {
      id: courses.length + 1,
      name: course.name,
      modules: parseInt(course.modules),
      students: 0,
    };
    setCourses([...courses, newCourse]);
    setView("courses");
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
        {view === "courses" && <Courses courses={courses} />}
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
