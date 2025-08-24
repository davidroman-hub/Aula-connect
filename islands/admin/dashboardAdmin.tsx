import { manageFontColorDash, palette } from "../../assets/colors.ts";
import { Student } from "../../routes/api/users/user.tsx";
import ProgressCharts from "./adminCharts.tsx";

function AdminDashboard({ students, courses }: any) {
  // Calcular estadísticas
  const totalStudents = students.length;
  const totalCourses = courses.length;
  const avgProgress = students.length > 0
    ? Math.round(
      students.reduce((acc: any, student: any) => acc + student.progress, 0) /
        students.length,
    )
    : 0;

  const topStudents = [...students]
    .sort((a, b) => b.progress - a.progress)
    .slice(0, 3);

  return (
    <div>
      <h2 className={`text-2xl font-bold text-[${palette.primary}] mb-6`}>
        Resumen General
      </h2>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6 card-hover transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Estudiantes</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {totalStudents}
              </h3>
            </div>
            <div className="bg-blue-100 p-3 rounded-full">
              <i className="fas fa-users text-primary text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>12% desde el mes pasado</span>
            </p>
          </div>
        </div>

        <div className="bg-white rounded-xl shadow p-6 card-hover transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Total Cursos</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {totalCourses}
              </h3>
            </div>
            <div className="bg-purple-100 p-3 rounded-full">
              <i className="fas fa-book text-secondary text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <p className="text-green-500 flex items-center">
              <i className="fas fa-arrow-up mr-1"></i>
              <span>2 nuevos este mes</span>
            </p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Progreso Mensual
          </h3>
          <ProgressCharts courses={courses} students={students} />
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
