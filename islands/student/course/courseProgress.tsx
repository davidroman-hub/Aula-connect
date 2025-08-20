import { StateUpdater } from "preact/hooks";
import { Course } from "../../../types/course.ts";
import { palette } from "../../../assets/colors.ts";
import OverviewCards from "../../admin/courses/partsOfCourseDetails/overviewCards.tsx";
import { formatDuration } from "../../admin/courses/courseDetails.tsx";
import { CurrentLesson } from "../../../types/users.ts";

type CourseDetailsProps = {
  newCourseObject: Course;
  setActiveTab: (value: StateUpdater<"modules" | "overview">) => void;
  activeTab: "modules" | "overview";
  courseName: string;
  currentUser: {
    _id: string;
    username: string;
    password: string;
    courses: Array<string>;
    type: string;
    updatedAt: string;
    currentLesson: Array<CurrentLesson> | null;
  };
};

const CourseDetails = (
  { newCourseObject, setActiveTab, activeTab, courseName, currentUser }:
    CourseDetailsProps,
) => {
  console.log("Course Details Rendered", newCourseObject);
  console.log("Current User:", currentUser);
  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-6">
      {/* Header */}
      <div className="bg-white rounded-xl shadow-md p-4 md:p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          <div className="flex items-center gap-4">
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-gray-800">
                {newCourseObject?.name}
              </h1>
              <p className="text-gray-600">ID: {newCourseObject?._id}</p>
            </div>
          </div>

          {/* Course Stats */}
          <div className="flex gap-4 md:gap-6">
            <div className="text-center">
              <div className={`text-2xl font-bold text-[${palette.primary}]`}>
                {newCourseObject?.modules.length}
              </div>
              <p className="text-sm text-gray-600">Módulos</p>
            </div>
          </div>
        </div>
      </div>

      <div className="bg-white rounded-xl shadow-md mb-6">
        <div className="flex border-b">
          <button
            type="button"
            onClick={() => setActiveTab("overview")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "overview"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-chart-line mr-2"></i>
            <span className="hidden sm:inline">Resumen</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab("modules")}
            className={`cursor-pointer flex-1 px-4 py-3 text-sm md:text-base font-medium transition-colors ${
              activeTab === "modules"
                ? `text-[${palette.primary}] border-b-2 border-[${palette.primary}]`
                : "text-gray-600 hover:text-gray-800"
            }`}
          >
            <i className="fas fa-book mr-2"></i>
            <span className="hidden sm:inline">Módulos</span>
          </button>
        </div>

        <div className="p-4 md:p-6">
          {/* Overview Tab */}
          {activeTab === "overview" && (
            <OverviewCards
              newCourseObject={newCourseObject}
              formatDuration={formatDuration}
              isAdmin="user"
              currentUser={currentUser}
            />
          )}

          {/* Modules Tab */}

          {activeTab === "modules" && (
            <div className="overflow-x-auto rounded-box border border-base-content/5 bg-base-100">
              <table className="table">
                {/* head */}
                <thead>
                  <tr>
                    <th></th>
                    <th>Nombre de la clase activada</th>
                    <th>Curso</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {/* row 1 */}
                  {currentUser.currentLesson &&
                      currentUser?.currentLesson?.length > 0
                    ? (
                      currentUser?.currentLesson?.map((userInfo, index) => (
                        <tr key={userInfo?.moduleId || `module-${index}`}>
                          <th>{index + 1}</th>
                          <td>{userInfo.moduleName}</td>
                          <td>{courseName}</td>
                          <td>
                            {userInfo.status ? userInfo.status : "No iniciado"}
                          </td>
                        </tr>
                      ))
                    )
                    : (
                      <tr key={`no-lesson-${courseName}`}>
                        <th>{1}</th>
                        <td>{"Curso no iniciado"}</td>
                        <td>{courseName}</td>
                        <td>
                          {"No iniciado"}
                        </td>
                      </tr>
                    )}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default CourseDetails;
