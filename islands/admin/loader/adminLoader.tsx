import { useEffect, useState } from "preact/hooks";

interface ModuleData {
  _id?: string;
  name?: string;
  description?: string;
  content?: {
    text?: string;
    html?: string;
  };
  duration?: number;
}

interface CourseData {
  _id?: string;
  name?: string;
  description?: string;
  modules?: Array<ModuleData>;
  students?: Array<unknown>;
  error?: boolean;
}

interface CourseLoaderProps {
  course: { courseData: CourseData[]; modules: ModuleData[] };
  courseId: string;
}

const Loader = ({ loading }: { loading: boolean }) => {
  if (loading) {
    return (
      <div className="fixed inset-0  backdrop-blur-[3px] bg-opacity-50 z-50 flex flex-col items-center justify-center p-4">
        <div className="flex items-center justify-center bg-gray-50">
          <div className="text-center">
            {/* Spinner de loading */}
            <div className="inline-block animate-spin rounded-full h-16 w-16 border-b-4 border-purple-600 mb-4">
            </div>

            {/* Texto de loading */}
            <h2 className="text-2xl font-semibold text-gray-800 mb-2">
              Creando recursos...
            </h2>
            <p className="text-gray-600">
              Espera a que preparemos todo para ti, no recarges la página.
            </p>

            {/* Barra de progreso animada */}
            <div className="w-64 bg-gray-200 rounded-full h-2 mx-auto mt-4">
              <div
                className="bg-purple-600 h-2 rounded-full animate-pulse"
                style={{ width: "100%" }}
              >
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
  return null;
};

export default Loader;
