import { useState } from "preact/hooks";
import { palette } from "../../assets/colors.ts";
import { CoursesProps } from "./courses.tsx";
import { ErrorAlert, SuccessAlert } from "../alerts/index.tsx";

// Simple icon components to replace react-icons
const FaChevronDown = ({ className }: { className?: string }) => (
  <span className={className}>▼</span>
);
const FaFileAlt = ({ className }: { className?: string }) => (
  <span className={className}>📄</span>
);
const FaGraduationCap = ({ className }: { className?: string }) => (
  <span className={className}>🎓</span>
);

const FaPlusCircle = ({ className }: { className?: string }) => (
  <span className={className}>➕</span>
);
const FaSave = ({ className }: { className?: string }) => (
  <span className={className}>💾</span>
);

const FaTimes = ({ className }: { className?: string }) => (
  <span className={className}>✕</span>
);

const ModuleModal = (
  { createModule, isModuleCreated, courses, isModuleError }: CoursesProps,
) => {
  const [isOpen, setIsOpen] = useState(false);

  const [formData, setFormData] = useState({
    moduleName: "",
    course: "",
  });

  const openModal = () => setIsOpen(true);
  const closeModal = () => {
    setIsOpen(false);
    setFormData({
      moduleName: "",
      course: "",
    });
  };

  const handleChange = (
    e: preact.JSX.TargetedEvent<HTMLInputElement | HTMLSelectElement, Event>,
  ) => {
    const { name, value } = e.target as HTMLInputElement | HTMLSelectElement;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "progress" ? parseInt(value) : value,
    }));
  };

  const handleSubmit = (
    e: preact.JSX.TargetedEvent<HTMLFormElement, Event>,
  ) => {
    e.preventDefault();
    createModule({
      name: formData.moduleName,
      course: formData.course,
    });
    // alert(`Module "${formData.moduleName}" created successfully!`);
    // closeModal();
  };

  if (isModuleCreated) {
    setTimeout(() => {
      setFormData({ moduleName: "", course: "" });
    }, 500);
  }

  return (
    <div className="flex items-center justify-center p-4">
      {/* Button to trigger modal */}
      <button
        type="button"
        onClick={openModal}
        className={`bg-[${palette.primary}] hover:bg-[${palette.active}] text-white font-medium py-2 px-6 rounded-lg shadow-md transition-all duration-300 transform hover:scale-105 flex items-center`}
      >
        <FaPlusCircle className="mr-2" /> Create New Module
      </button>

      {/* Modal Backdrop */}
      {isOpen && (
        <div className="fixed inset-0  backdrop-blur-[3px] bg-opacity-50 z-50 flex items-center justify-center p-4">
          <button
            type="button"
            className="absolute inset-0 w-full h-full"
            onClick={closeModal}
            onKeyDown={(e) => e.key === "Escape" && closeModal()}
            aria-label="Close modal"
          />
          {/* Modal Container */}
          <div className="bg-white rounded-xl shadow-2xl w-full max-w-md animate-[modalFadeIn_0.3s_ease-out_forwards] overflow-hidden relative z-10">
            {/* Modal Header */}
            <div
              className={`bg-[${palette.primary}]  p-5 flex justify-between items-center`}
            >
              <h3 className="text-xl font-bold text-white">
                <FaGraduationCap className="mr-2 inline" /> Create New Module
              </h3>
              <button
                type="button"
                onClick={closeModal}
                className="text-white hover:text-gray-200 focus:outline-none"
              >
                <FaTimes className="text-xl" />
              </button>
            </div>

            {/* Modal Body (Form) */}
            <div className="p-6">
              {isModuleCreated && (
                <SuccessAlert message="Module created successfully!" />
              )}
              {isModuleError && <ErrorAlert message={isModuleError} />}
              <form onSubmit={handleSubmit} className="space-y-4">
                {/* Module Name Field */}
                <div>
                  <label
                    htmlFor="moduleName"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <FaFileAlt className="mr-1 text-blue-500 inline" />{" "}
                    Module Name
                  </label>
                  <div className="relative">
                    <input
                      type="text"
                      id="moduleName"
                      name="moduleName"
                      value={formData.moduleName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition text-black"
                      placeholder="Enter module name"
                      required
                    />
                  </div>
                </div>

                {/* Course Selection */}
                <div>
                  <label
                    htmlFor="course"
                    className="block text-sm font-medium text-gray-700 mb-1"
                  >
                    <FaGraduationCap className="mr-1 text-blue-500 inline" />
                    {" "}
                    Course
                  </label>
                  <div className="relative">
                    <select
                      id="course"
                      name="course"
                      value={formData.course}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 appearance-none transition pr-8 text-black"
                      required
                    >
                      {courses.map((course) => (
                        <option key={course._id} value={course._id}>
                          {course.name}
                        </option>
                      ))}
                    </select>
                    <FaChevronDown className="absolute right-3 top-2 text-gray-400 pointer-events-none" />
                  </div>
                </div>

                {/* Progress Slider */}

                {/* Form Actions */}
                <div className="flex justify-end space-x-3 pt-4">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-100 transition"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className={`px-4 py-2 bg-[${palette.primary}] text-white rounded-lg hover:bg-[${palette.hover}] focus:ring-2 focus:ring-${palette.hover}] focus:ring-offset-2 transition flex items-center`}
                  >
                    <FaSave className="mr-2" /> Create Module
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ModuleModal;
