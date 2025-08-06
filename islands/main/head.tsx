const Head = () => {
  return (
    <section
      style={{
        background:
          "linear-gradient(90deg, rgba(244, 51, 116, 1) 0%, rgba(143, 30, 69, 1) 50%, rgba(237, 221, 83, 1) 100%)",
      }}
      class="hero-gradient text-white"
    >
      <div class="container mx-auto px-4 py-20 md:py-28">
        <div class="flex flex-col md:flex-row items-center">
          <div class="md:w-1/2 mb-10 md:mb-0">
            <h1 class="text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
              Master Web Development From Scratch
            </h1>
            <p class="text-xl mb-8 opacity-90">
              Interactive courses and projects to help you become a professional
              web developer. Learn HTML, CSS, JavaScript, React and more.
            </p>
            <div class="flex flex-col sm:flex-row space-y-4 sm:space-y-0 sm:space-x-4">
              <button class="bg-white text-primaryDark px-8 py-3 rounded-full font-bold hover:bg-gray-100 transition duration-300">
                Start Learning Free
              </button>
              <button class="border-2 border-white px-8 py-3 rounded-full font-bold hover:bg-white hover:text-primaryDark transition duration-300">
                Explore Courses
              </button>
            </div>
          </div>
          <div class="md:w-1/2 flex justify-center">
            <div class="relative w-full max-w-md">
              <div class="absolute -top-10 -left-10 w-32 h-32 rounded-full bg-white bg-opacity-10" />

              <div class="absolute -bottom-10 -right-5 w-40 h-40 rounded-full bg-white bg-opacity-10" />

              <img
                src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754493093/learningplat/main_cg2fqy.png"
                alt="Coding illustration"
                class="relative rounded-xl shadow-2xl w-full"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
export default Head;
