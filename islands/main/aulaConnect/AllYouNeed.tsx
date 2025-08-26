import { palette } from "../../../assets/colors.ts";
import { MainComponentsProps } from "../index.tsx";

const AllYouNeed = ({ t }: MainComponentsProps) => {
  return (
    <section id="features" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl font-bold mb-4">
            {t("main.allYouNeed.title")}
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            {t("main.allYouNeed.sub")}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i
                className={`fas fa-user-friends text-[${palette.hover}] text-2xl`}
              >
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("main.allYouNeed.list.item1.title")}
            </h3>
            <p className="text-gray-600">
              {t("main.allYouNeed.list.item1.desc")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i className={`fas fa-file-alt text-[${palette.hover}] text-2xl`}>
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("main.allYouNeed.list.item2.title")}
            </h3>
            <p className="text-gray-600">
              {t("main.allYouNeed.list.item2.desc")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i className={`fas fa-tasks text-[${palette.hover}] text-2xl`}>
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("main.allYouNeed.list.item3.title")}
            </h3>
            <p className="text-gray-600">
              {t("main.allYouNeed.list.item3.desc")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i
                className={`fas fa-chart-line text-[${palette.hover}] text-2xl`}
              >
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("main.allYouNeed.list.item4.title")}
            </h3>
            <p className="text-gray-600">
              {t("main.allYouNeed.list.item4.desc")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i className={`fas fa-comments text-[${palette.hover}] text-2xl`}>
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("main.allYouNeed.list.item5.title")}
            </h3>
            <p className="text-gray-600">
              {t("main.allYouNeed.list.item5.desc")}
            </p>
          </div>

          <div className="bg-white rounded-xl p-8 shadow-md transition duration-300 feature-card">
            <div
              className={`w-14 h-14 bg-[${palette.backgroundSoft}] rounded-lg flex items-center justify-center mb-6`}
            >
              <i
                className={`fas fa-calendar-alt text-[${palette.hover}] text-2xl`}
              >
              </i>
            </div>
            <h3 className="text-xl font-bold mb-3">
              {t("main.allYouNeed.list.item6.title")}
            </h3>
            <p className="text-gray-600">
              {t("main.allYouNeed.list.item6.desc")}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default AllYouNeed;
