import { palette } from "../../../../assets/colors.ts";
import { Course } from "../../../../routes/api/courses/course.tsx";

type OverviewCardsProps = {
  newCourseObject: Course;
  formatDuration: (minutes: number) => string;
};

const OverviewCards = (
  { newCourseObject, formatDuration }: OverviewCardsProps,
) => {
  return (
    <div className="space-y-6">
      {/* Course Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-gradient-to-br from-blue-50 to-blue-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-blue-600 text-sm font-medium">
                Total Módulos
              </p>
              <p className="text-2xl font-bold text-blue-800">
                {newCourseObject?.modules.length}
              </p>
            </div>
            <i className="fas fa-book text-blue-500 text-xl"></i>
          </div>
        </div>

        <div className="bg-gradient-to-br from-green-50 to-green-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-green-600 text-sm font-medium">
                Estudiantes
              </p>
              <p className="text-2xl font-bold text-green-800">
                {newCourseObject?.students.length}
              </p>
            </div>
            <i className="fas fa-users text-green-500 text-xl"></i>
          </div>
        </div>

        <div className="bg-gradient-to-br from-purple-50 to-purple-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-purple-600 text-sm font-medium">
                Duración Total
              </p>
              <p className="text-2xl font-bold text-purple-800">
                {formatDuration(
                  newCourseObject?.modules
                    ? newCourseObject.modules.reduce(
                      (total, module) =>
                        total +
                        (parseInt(module.content?.duration) || 0),
                      0,
                    )
                    : 0,
                )}
              </p>
            </div>
            <i className="fas fa-clock text-purple-500 text-xl"></i>
          </div>
        </div>

        <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-orange-600 text-sm font-medium">
                Completados
              </p>
              <p className="text-2xl font-bold text-orange-800">
                {newCourseObject?.modules.filter((module) => module.isFinished)
                  .length}
              </p>
            </div>
            <i className="fas fa-check-circle text-orange-500 text-xl">
            </i>
          </div>
        </div>
      </div>

      {/* Progress Chart */}
      <div className="bg-gray-50 p-4 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">
          Progreso del Curso
        </h3>
        <div className="w-full bg-gray-200 rounded-full h-4">
          <div
            className={`h-4 rounded-full bg-gradient-to-r from-[${palette.primary}] to-[${palette.hover}]`}
            style={{
              width: `${
                newCourseObject && newCourseObject.modules.length > 0
                  ? (newCourseObject.modules.filter((m) => m.isFinished)
                    .length /
                    newCourseObject.modules.length) * 100
                  : 0
              }%`,
            }}
          >
          </div>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          {newCourseObject?.modules.filter((m) => m.isFinished).length} de{" "}
          {newCourseObject?.modules.length} módulos completados
        </p>
      </div>
    </div>
  );
};

export default OverviewCards;
