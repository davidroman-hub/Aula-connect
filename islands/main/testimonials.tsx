import { manageTheme } from "../../assets/colors.ts";

const Testimonials = () => {
  return (
    <section className={`py-16 ${manageTheme()}`}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primaryDarker mb-4">
            What Our Students Say
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Don't just take our word for it - hear from our community
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* <!-- Testimonial 1 --> */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                <i className="fas fa-user text-primary"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Sarah Johnson</h4>
                <p className="text-sm text-gray-500">Frontend Developer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              "The React course completely transformed my understanding of
              modern frontend development. I landed my first developer job
              thanks to this platform!"
            </p>
            <div className="flex">
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
            </div>
          </div>

          {/* <!-- Testimonial 2 --> */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                <i className="fas fa-user text-primary"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Michael Chen</h4>
                <p className="text-sm text-gray-500">Full-Stack Developer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              "The learning paths are perfectly structured. I went from zero
              coding knowledge to building full applications in just 6 months."
            </p>
            <div className="flex">
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
            </div>
          </div>

          {/* <!-- Testimonial 3 --> */}
          <div className="bg-gray-50 p-6 rounded-xl">
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mr-4">
                <i className="fas fa-user text-primary"></i>
              </div>
              <div>
                <h4 className="font-bold text-gray-800">Emma Rodriguez</h4>
                <p className="text-sm text-gray-500">UI/UX Designer</p>
              </div>
            </div>
            <p className="text-gray-600 mb-4">
              "As a designer, I needed to understand frontend development. The
              HTML & CSS course was exactly what I needed to bridge that gap."
            </p>
            <div className="flex">
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
              <i className="fas fa-star text-yellow-400"></i>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
