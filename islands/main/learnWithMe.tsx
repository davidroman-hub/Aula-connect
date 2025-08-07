const LearnWithMe = () => {
  return (
    <section className={`py-16 bg-[#C1275A] `}>
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold text-primaryDarker mb-4">
            Why Learn With Us?
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Our platform is designed to help you learn effectively and
            efficiently
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* <!-- Feature 1 --> */}
          <div className="feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
              <i className="fas fa-laptop-code feature-icon text-primary text-2xl">
              </i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Interactive Coding
            </h3>
            <p className="text-gray-600">
              Learn by coding directly in the browser with our interactive
              exercises and challenges.
            </p>
          </div>

          {/* <!-- Feature 2 --> */}
          <div className="feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
              <i className="fas fa-project-diagram feature-icon text-primary text-2xl">
              </i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Real Projects
            </h3>
            <p className="text-gray-600">
              Build portfolio-worthy projects that demonstrate your skills to
              potential employers.
            </p>
          </div>

          {/* <!-- Feature 3 --> */}
          <div className="feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
              <i className="fas fa-users feature-icon text-primary text-2xl">
              </i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Community Support
            </h3>
            <p className="text-gray-600">
              Get help from our community of learners and mentors when you're
              stuck.
            </p>
          </div>

          {/* <!-- Feature 4 --> */}
          <div className="feature-card bg-white p-6 rounded-xl shadow-sm hover:shadow-md transition duration-300">
            <div className="w-16 h-16 rounded-full bg-primary bg-opacity-10 flex items-center justify-center mb-4">
              <i className="fas fa-certificate feature-icon text-primary text-2xl">
              </i>
            </div>
            <h3 className="text-xl font-bold text-gray-800 mb-3">
              Certificates
            </h3>
            <p className="text-gray-600">
              Earn certificates to showcase your achievements and skills to
              employers.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LearnWithMe;
