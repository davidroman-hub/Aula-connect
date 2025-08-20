import { palette } from "../../../../assets/colors.ts";
import { Course } from "../../../../types/course.ts";
import { CurrentLesson } from "../../../../types/users.ts";

type OverviewCardsProps = {
  newCourseObject: Course | null;
  formatDuration: (minutes: number) => string;
  isAdmin: "admin" | "user";
  currentUser?: {
    _id: string;
    username: string;
    password: string;
    courses: Array<string>;
    type: string;
    updatedAt: string;
    currentLesson: Array<CurrentLesson> | null;
  };
};

const OverviewCards = (
  { newCourseObject, formatDuration, isAdmin, currentUser }: OverviewCardsProps,
) => {
  return (
    <div className="space-y-6">
      {/* Course Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
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

        {isAdmin === "admin" && (
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
        )}

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

        {isAdmin === "user" && (
          <div className="bg-gradient-to-br from-orange-50 to-orange-100 p-4 rounded-lg">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-orange-600 text-sm font-medium">
                  Completados
                </p>
                <p className="text-2xl font-bold text-orange-800">
                  {(currentUser?.currentLesson ?? []).filter((lesson) =>
                    lesson.status === "done" &&
                    lesson.courseId === newCourseObject?._id
                  )
                    .length}
                </p>
              </div>
              <i className="fas fa-check-circle text-orange-500 text-xl">
              </i>
            </div>
          </div>
        )}
      </div>

      {/* Progress Chart */}
      {isAdmin === "user" && (
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-4">
            Progreso del Curso
          </h3>
          <div className="w-full bg-gray-200 rounded-full h-4">
            {(() => {
              const completed = (currentUser?.currentLesson ?? []).filter(
                (lesson) =>
                  lesson.status === "done" &&
                  lesson.courseId === newCourseObject?._id,
              ).length;
              const total = newCourseObject?.modules.length ?? 0;
              const percent = total > 0 ? (completed / total) * 100 : 0;
              return (
                <div
                  className="h-4 rounded-full bg-gradient-to-r"
                  style={{
                    width: `${percent}%`,
                    backgroundImage:
                      `linear-gradient(to right, ${palette.primary}, ${palette.hover})`,
                  }}
                >
                </div>
              );
            })()}
          </div>
          <p className="text-sm text-gray-600 mt-2">
            {(currentUser?.currentLesson ?? []).filter((lesson) =>
              lesson.status === "done" &&
              lesson.courseId === newCourseObject?._id
            ).length} de {newCourseObject?.modules.length} módulos completados
          </p>
        </div>
      )}
    </div>
  );
};

export default OverviewCards;
