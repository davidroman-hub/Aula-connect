import { palette } from "../../assets/colors.ts";

const Head = () => {
  return (
    <section
      style={{
        background: palette.linearGradient,
      }}
      className="hero-gradient text-white"
    >
      <div className="container mx-auto px-4 py-20 md:py-28">
        <div className="flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-10 md:mb-0">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Web Development From Scratch
            </h1>
            <p className="text-xl mb-8 opacity-90">
              Interactive courses and projects to help you become a professional
              web developer. Learn HTML, CSS, JavaScript, React and more.
            </p>
            <div className="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button className="bg-white text-primaryDark px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300">
                Start Learning Free
              </button>
              <button className="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primaryDark transition duration-300">
                Explore Courses
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center">
            <div className="relative w-full max-w-md">
              <div className="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white bg-opacity-10" />

              <div className="absolute -bottom-10 -right-5 w-40 h-40 rounded-full bg-white bg-opacity-10" />

              <img
                src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754493093/learningplat/main_cg2fqy.png"
                alt="Coding illustration"
                className="relative rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Head;
