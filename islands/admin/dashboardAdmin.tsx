import { manageFontColorDash } from "../../assets/colors.ts";

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

  // Datos para gráficos
  const progressData = {
    labels: ["Ene", "Feb", "Mar", "Abr", "May", "Jun"],
    datasets: [
      {
        label: "Progreso Promedio",
        data: [45, 55, 60, 70, 75, 80],
        borderColor: "#4361ee",
        backgroundColor: "rgba(67, 97, 238, 0.1)",
        tension: 0.4,
        fill: true,
      },
    ],
  };

  const moduleProgressData = {
    labels: [
      "Fundamentos JS",
      "React Básico",
      "React Avanzado",
      "Bases de Datos",
    ],
    datasets: [
      {
        label: "Progreso Promedio",
        data: [90, 75, 55, 65],
        backgroundColor: [
          "rgba(67, 97, 238, 0.7)",
          "rgba(76, 201, 240, 0.7)",
          "rgba(247, 37, 133, 0.7)",
          "rgba(72, 149, 239, 0.7)",
        ],
        borderColor: [
          "#4361ee",
          "#4cc9f0",
          "#f72585",
          "#4895ef",
        ],
        borderWidth: 1,
      },
    ],
  };

  return (
    <div>
      <h2 className={`text-2xl font-bold ${manageFontColorDash()} mb-6`}>
        Resumen General
      </h2>

      {/* Cards de estadísticas */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
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

        <div className="bg-white rounded-xl shadow p-6 card-hover transition-all duration-300">
          <div className="flex justify-between items-center">
            <div>
              <p className="text-gray-500">Progreso Promedio</p>
              <h3 className="text-3xl font-bold text-gray-800">
                {avgProgress}%
              </h3>
            </div>
            <div className="bg-green-100 p-3 rounded-full">
              <i className="fas fa-chart-line text-success text-xl"></i>
            </div>
          </div>
          <div className="mt-4">
            <div className="progress-bar bg-gray-200">
              <div
                className="bg-success h-full"
                style={{ width: `${avgProgress}%` }}
              >
              </div>
            </div>
            <p className="text-gray-500 text-sm mt-2">
              +5% desde la semana pasada
            </p>
          </div>
        </div>
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Progreso Mensual
          </h3>
          {
            /* <div className="chart-container">
            <ChartComponent type="line" data={progressData} />
          </div> */
          }
        </div>

        <div className="bg-white rounded-xl shadow p-6">
          <h3 className="text-lg font-bold text-gray-800 mb-4">
            Progreso por Módulo
          </h3>
          {
            /* <div className="chart-container">
            <ChartComponent type="bar" data={moduleProgressData} />
          </div> */
          }
        </div>
      </div>

      {/* Top estudiantes */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-lg font-bold text-gray-800 mb-4">
          Top Estudiantes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {topStudents.map((student) => (
            <div
              key={student.id}
              className="border rounded-lg p-4 hover:bg-gray-50 transition"
            >
              <div className="flex items-center mb-3">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center mr-3">
                  <i className="fas fa-user text-white"></i>
                </div>
                <div>
                  <h4 className="font-bold">{student.name}</h4>
                  <p className="text-gray-500 text-sm">{student.email}</p>
                </div>
              </div>
              <div>
                <p className="text-gray-600 mb-1">
                  Progreso: {student.progress}%
                </p>
                <div className="progress-bar bg-gray-200">
                  <div
                    className="bg-primary h-full"
                    style={{ width: `${student.progress}%` }}
                  >
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminDashboard;
