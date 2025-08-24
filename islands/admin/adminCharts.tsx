import { useEffect, useRef, useState } from "preact/hooks";
import {
  BarController,
  BarElement,
  CategoryScale,
  Chart,
  Legend,
  LinearScale,
  Title,
  Tooltip,
} from "chart.js";

// Register Chart.js components including BarController
Chart.register(
  CategoryScale,
  LinearScale,
  BarElement,
  BarController,
  Title,
  Tooltip,
  Legend,
);

interface StudentProgress {
  name: string;
  progress: number;
  completedModules: number;
  totalModules: number;
}

const ProgressCharts = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);

  // Sample data - en una aplicación real, esto vendría de props o de una API
  const studentData: StudentProgress[] = [
    {
      name: "Ana García",
      progress: 85,
      completedModules: 17,
      totalModules: 20,
    },
    {
      name: "Carlos López",
      progress: 72,
      completedModules: 14,
      totalModules: 20,
    },
    {
      name: "María Silva",
      progress: 93,
      completedModules: 19,
      totalModules: 20,
    },
    {
      name: "Pedro Ruiz",
      progress: 60,
      completedModules: 12,
      totalModules: 20,
    },
    {
      name: "Laura Díaz",
      progress: 78,
      completedModules: 15,
      totalModules: 20,
    },
    {
      name: "Juan Torres",
      progress: 88,
      completedModules: 18,
      totalModules: 20,
    },
  ];

  useEffect(() => {
    console.log("Chart effect running...");
    setIsLoading(true);
    setHasError(false);

    // Delay to ensure DOM is ready
    const timer = setTimeout(() => {
      if (!chartRef.current) {
        console.log("Chart ref not available");
        setHasError(true);
        setIsLoading(false);
        return;
      }

      const ctx = chartRef.current.getContext("2d");
      if (!ctx) {
        console.log("Context not available");
        setHasError(true);
        setIsLoading(false);
        return;
      }

      // Destroy previous instance if it exists
      if (chartInstance.current) {
        try {
          chartInstance.current.destroy();
        } catch (e) {
          console.log("Error destroying previous chart:", e);
        }
      }

      console.log("Creating chart with data:", studentData);

      try {
        // Clear the canvas
        ctx.clearRect(0, 0, chartRef.current.width, chartRef.current.height);

        chartInstance.current = new Chart(ctx, {
          type: "bar",
          data: {
            labels: studentData.map((student) => student.name.split(" ")[0]), // Solo primer nombre
            datasets: [
              {
                label: "Progreso (%)",
                data: studentData.map((student) => student.progress),
                backgroundColor: [
                  "rgba(59, 130, 246, 0.7)",
                  "rgba(16, 185, 129, 0.7)",
                  "rgba(245, 158, 11, 0.7)",
                  "rgba(239, 68, 68, 0.7)",
                  "rgba(139, 92, 246, 0.7)",
                  "rgba(236, 72, 153, 0.7)",
                ],
                borderColor: [
                  "rgba(59, 130, 246, 1)",
                  "rgba(16, 185, 129, 1)",
                  "rgba(245, 158, 11, 1)",
                  "rgba(239, 68, 68, 1)",
                  "rgba(139, 92, 246, 1)",
                  "rgba(236, 72, 153, 1)",
                ],
                borderWidth: 2,
              },
            ],
          },
          options: {
            responsive: true,
            maintainAspectRatio: false,
            plugins: {
              legend: {
                display: true,
                position: "top",
              },
              title: {
                display: true,
                text: "Progreso de Estudiantes",
              },
            },
            scales: {
              y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                  callback: function (value) {
                    return value + "%";
                  },
                },
              },
            },
          },
        });

        console.log("Chart created successfully");
        setIsLoading(false);
        setHasError(false);
      } catch (error) {
        console.error("Error creating chart:", error);
        setHasError(true);
        setIsLoading(false);

        // Fallback: mostrar mensaje de error en el canvas
        ctx.fillStyle = "#374151";
        ctx.font = "16px Arial";
        ctx.textAlign = "center";
        ctx.fillText(
          "Error cargando el gráfico",
          chartRef.current.width / 2,
          chartRef.current.height / 2,
        );
        ctx.fillText(
          "Revisa la consola para más detalles",
          chartRef.current.width / 2,
          chartRef.current.height / 2 + 30,
        );
      }
    }, 500); // Aumentamos el delay

    // Cleanup function
    return () => {
      clearTimeout(timer);
      if (chartInstance.current) {
        try {
          chartInstance.current.destroy();
        } catch (e) {
          console.log("Error in cleanup:", e);
        }
      }
    };
  }, []);

  return (
    <div className="w-full bg-white rounded-lg shadow-lg p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">
        Dashboard de Progreso
      </h2>

      {/* Stats cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-blue-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-blue-100 rounded-lg">
              <svg
                className="w-6 h-6 text-blue-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z"
                >
                </path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-blue-600">
                Total Estudiantes
              </p>
              <p className="text-2xl font-bold text-blue-900">
                {studentData.length}
              </p>
            </div>
          </div>
        </div>

        <div className="bg-green-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-green-100 rounded-lg">
              <svg
                className="w-6 h-6 text-green-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                >
                </path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-green-600">
                Progreso Promedio
              </p>
              <p className="text-2xl font-bold text-green-900">
                {Math.round(
                  studentData.reduce(
                    (acc, student) => acc + student.progress,
                    0,
                  ) / studentData.length,
                )}%
              </p>
            </div>
          </div>
        </div>

        <div className="bg-yellow-50 rounded-lg p-4">
          <div className="flex items-center">
            <div className="p-2 bg-yellow-100 rounded-lg">
              <svg
                className="w-6 h-6 text-yellow-600"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M13 10V3L4 14h7v7l9-11h-7z"
                >
                </path>
              </svg>
            </div>
            <div className="ml-4">
              <p className="text-sm font-medium text-yellow-600">
                Mejor Estudiante
              </p>
              <p className="text-2xl font-bold text-yellow-900">
                {Math.max(...studentData.map((s) => s.progress))}%
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Chart container with explicit styling */}
      <div className="bg-gray-50 rounded-lg p-4 mb-6">
        <div style={{ position: "relative", height: "400px", width: "100%" }}>
          {isLoading && (
            <div className="absolute inset-0 flex items-center justify-center bg-gray-100 rounded">
              <div className="text-center">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4">
                </div>
                <p className="text-gray-600">Cargando gráfico...</p>
              </div>
            </div>
          )}
          {hasError && (
            <div className="absolute inset-0 flex items-center justify-center bg-red-50 rounded">
              <div className="text-center">
                <div className="text-red-500 text-4xl mb-4">⚠️</div>
                <p className="text-red-700 font-semibold">
                  Error al cargar el gráfico
                </p>
                <p className="text-red-600 text-sm">
                  Revisa la consola para más detalles
                </p>
              </div>
            </div>
          )}
          <canvas
            ref={chartRef}
            style={{
              maxWidth: "100%",
              maxHeight: "100%",
              display: (isLoading || hasError) ? "none" : "block",
            }}
          >
          </canvas>
        </div>
      </div>

      {/* Simple student list */}
      <div className="mt-6">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">
          Detalle de Estudiantes
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {studentData.map((student) => {
            const getStatusColor = (progress: number) => {
              if (
                progress >= 90
              ) return "bg-green-100 text-green-800 border-green-200";
              if (
                progress >= 70
              ) return "bg-yellow-100 text-yellow-800 border-yellow-200";
              return "bg-red-100 text-red-800 border-red-200";
            };

            const getStatusText = (progress: number) => {
              if (progress >= 90) return "Excelente";
              if (progress >= 70) return "En progreso";
              return "Necesita apoyo";
            };

            return (
              <div
                key={student.name}
                className="bg-white border rounded-lg p-4 shadow-sm hover:shadow-md transition-shadow"
              >
                <div className="flex items-center mb-3">
                  <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center text-white font-semibold">
                    {student.name.split(" ").map((n) => n[0]).join("")}
                  </div>
                  <div className="ml-3">
                    <h4 className="text-sm font-medium text-gray-900">
                      {student.name}
                    </h4>
                    <p className="text-xs text-gray-500">
                      {student.completedModules}/{student.totalModules} módulos
                    </p>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm text-gray-600">Progreso</span>
                    <span className="text-sm font-semibold text-gray-900">
                      {student.progress}%
                    </span>
                  </div>

                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div
                      className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                      style={{ width: `${student.progress}%` }}
                    >
                    </div>
                  </div>

                  <div className="pt-2">
                    <span
                      className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full border ${
                        getStatusColor(student.progress)
                      }`}
                    >
                      {getStatusText(student.progress)}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressCharts;
