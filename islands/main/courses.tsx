import { manageTheme, palette } from "../../assets/colors.ts";

const Courses = () => {
  const courses = [
    {
      icon: <i class="fab fa-html5 text-white text-7xl"></i>,
      title: "HTML & CSS Fundamentals",
      level: "Beginner",
      description:
        "Learn the building blocks of web development with hands-on projects.",
      rating: 4.9,
      reviews: 1200,
      price: "Free",
    },
    {
      icon: <i class="fab fa-js text-white text-7xl"></i>,
      title: "Modern JavaScript",
      level: "Intermediate",
      description:
        "Master JavaScript with ES6+ features, async programming and more.",
      rating: 4.8,
      reviews: 890,
      price: "$29.99",
    },
    {
      icon: <i class="fab fa-react text-white text-7xl"></i>,
      title: "React Masterclass",
      level: "Advanced",
      description:
        "Build professional React applications with hooks, context and Redux.",
      rating: 4.9,
      reviews: 1500,
      price: "$49.99",
    },
  ];

  return (
    <section className={`py-16 ${manageTheme()}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primaryDarker mb-4">
            Popular Courses
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Start with our most popular courses and build your skills step by
            step
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map((course, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md overflow-hidden course-card transition duration-300"
            >
              <div
                style={{
                  background: palette.linearGradient,
                }}
                className="h-48 from-primary to-primaryDark flex items-center justify-center"
              >
                {course.icon}
              </div>
              <div className="p-6">
                <div className="flex justify-between items-start mb-3">
                  <h3 className="text-xl font-bold text-gray-800">
                    {course.title}
                  </h3>
                  <span
                    className={`bg-[#F77DA9] bg-opacity-10 text-[#ffff]  text-xs font-bold px-2 py-1 rounded`}
                  >
                    {course.level}
                  </span>
                </div>
                <p className="text-gray-600 mb-4">{course.description}</p>
                <div className="flex justify-between items-center">
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <button className="border-2 border-primary text-primary px-8 py-3 rounded-full font-bold hover:bg-primary hover:text-white transition duration-300">
            View All Courses
          </button>
        </div>
      </div>
    </section>
  );
};

export default Courses;
