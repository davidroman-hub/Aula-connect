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
export type Course = {
  id: number;
  name: string;
  slug: string;
  modules: Module[];
  students: Student[];
  progress?: number;
};

export type Module = {
  id: number;
  name: string;
  course: string;
  progress?: number;
};

export type Student = {
  id: number;
  username: string;
  courses: Course[];
  password?: string;
  type: string;
};
const initialStudents = [
  {
    id: 1,
    name: "María Rodríguez",
    email: "maria@ejemplo.com",
    progress: 75,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 90 },
      { id: 2, name: "React Básico", progress: 80 },
      { id: 3, name: "React Avanzado", progress: 60 },
      { id: 4, name: "Bases de Datos", progress: 70 },
    ],
  },
  {
    id: 2,
    name: "Carlos Pérez",
    email: "carlos@ejemplo.com",
    progress: 60,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 100 },
      { id: 2, name: "React Básico", progress: 70 },
      { id: 3, name: "React Avanzado", progress: 30 },
      { id: 4, name: "Bases de Datos", progress: 40 },
    ],
  },
  {
    id: 3,
    name: "Ana Gómez",
    email: "ana@ejemplo.com",
    progress: 90,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 100 },
      { id: 2, name: "React Básico", progress: 95 },
      { id: 3, name: "React Avanzado", progress: 85 },
      { id: 4, name: "Bases de Datos", progress: 80 },
    ],
  },
  {
    id: 4,
    name: "Jorge Martínez",
    email: "jorge@ejemplo.com",
    progress: 45,
    modules: [
      { id: 1, name: "Fundamentos de JS", progress: 70 },
      { id: 2, name: "React Básico", progress: 40 },
      { id: 3, name: "React Avanzado", progress: 30 },
      { id: 4, name: "Bases de Datos", progress: 35 },
    ],
  },
];

const initialCourses = [
  { id: 1, name: "Desarrollo Web Full Stack", modules: 6, students: 24 },
  { id: 2, name: "React Avanzado", modules: 4, students: 18 },
  { id: 3, name: "JavaScript Profesional", modules: 5, students: 32 },
  { id: 4, name: "Node.js y Express", modules: 4, students: 15 },
];

const initialModules = [
  { id: 1, name: "Fundamentos de JS", course: "JavaScript Profesional" },
  { id: 2, name: "React Básico", course: "React Avanzado" },
  { id: 3, name: "React Avanzado", course: "React Avanzado" },
  { id: 4, name: "Bases de Datos", course: "Desarrollo Web Full Stack" },
];

// Componente principal de la aplicación
export function AdminDashboards() {
  const token = localStorage.getItem("jwtToken") || "{}";
  const [view, setView] = useState("dashboard"); // dashboard, students, courses, createUser, createCourse
  const [students, setStudents] = useState([] as any[]); // Inicializar como array vacío
  const [courses, setCourses] = useState(initialCourses);
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
      console.log(response);
    } catch (error) {
      console.error(error);
    }
  };
  // Agregar nuevo estudiante
  const addStudent = (student: Student) => {
    const newStudent = {
      id: student.id,
      name: student.username,
      password: student.password,
      progress: 0,
      modules: modules.map((module) => ({
        id: module.id,
        name: module.name,
        progress: 0,
      })),
    };
    setStudents([...students, newStudent]);
    setView("students");
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
          <CreateUser addStudent={addStudent} setView={setView} token={token} />
        )}
        {view === "createCourse" && (
          <CreateCourse addCourse={addCourse} setView={setView} />
        )}
      </main>
    </div>
  );
}
