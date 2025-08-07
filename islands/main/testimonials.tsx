import { manageTheme, palette } from "../../assets/colors.ts";

const Testimonials = () => {
  const reviews = [
    {
      name: "Sarah Johnson",
      role: "Frontend Developer",
      testimonial:
        "The React course completely transformed my understanding of modern frontend development. I landed my first developer job thanks to this platform!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Full-Stack Developer",
      testimonial:
        "The learning paths are perfectly structured. I went from zero coding knowledge to building full applications in just 6 months.",
      rating: 5,
    },
    {
      name: "Emma Rodriguez",
      role: "UI/UX Designer",
      testimonial:
        "As a designer, I needed to understand frontend development. The HTML & CSS course was exactly what I needed to bridge that gap.",
      rating: 5,
    },
  ];

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
          {reviews.map((review, index) => (
            <div
              key={index}
              className="bg-white rounded-xl shadow-md p-6 transition duration-300 hover:shadow-lg"
            >
              <div className="flex items-center mb-4">
                <div
                  style={{ background: palette.backgroundSoft }}
                  className="w-12 h-12 rounded-full bg-opacity-10 flex items-center justify-center mr-4"
                >
                  <i className="fas fa-user text-[#C1275A]"></i>
                </div>
                <div>
                  <h4 className="font-bold text-gray-800">{review.name}</h4>
                  <p className="text-sm text-gray-500">{review.role}</p>
                </div>
              </div>
              <p className="text-gray-600 mb-4">{review.testimonial}</p>
              <div className="flex">
                {[...Array(review.rating)].map((_, i) => (
                  <i key={i} className="fas fa-star text-yellow-400"></i>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
