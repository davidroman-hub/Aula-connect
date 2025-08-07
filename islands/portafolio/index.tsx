import { useEffect, useState } from "preact/hooks";

const Portfolio = () => {
  const [activeSection, setActiveSection] = useState("home");
  const [darkMode, setDarkMode] = useState(true);
  const [menuOpen, setMenuOpen] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["home", "about", "skills", "projects", "contact"];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 100 && rect.bottom >= 100) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    const handleMouseMove = (e: any) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  const scrollToSection = (sectionId: any) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setActiveSection(sectionId);
      setMenuOpen(false);
    }
  };

  const toggleDarkMode = () => {
    setDarkMode(!darkMode);
  };

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  const projects = [
    {
      title: "E-commerce Platform",
      description:
        "Full-featured online store with payment integration, admin dashboard, and real-time inventory management.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Stripe API"],
      image:
        "https://images.unsplash.com/photo-1555529669-e69e7aa0ba9a?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "#",
    },
    {
      title: "Social Media Dashboard",
      description:
        "Interactive dashboard with real-time analytics, user management, and content moderation tools.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "Socket.io"],
      image:
        "https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "#",
    },
    {
      title: "Task Management App",
      description:
        "Collaborative task management solution with drag-and-drop interface and team collaboration features.",
      technologies: ["MongoDB", "Express", "React", "Node.js", "D3.js"],
      image:
        "https://images.unsplash.com/photo-1579389083078-4e7018379f7e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1000&q=80",
      link: "#",
    },
  ];

  const skills = [
    { name: "React", icon: "fab fa-react", level: 95, color: "text-blue-400" },
    {
      name: "Node.js",
      icon: "fab fa-node-js",
      level: 90,
      color: "text-green-500",
    },
    {
      name: "MongoDB",
      icon: "fas fa-database",
      level: 85,
      color: "text-green-400",
    },
    {
      name: "Express",
      icon: "fas fa-server",
      level: 85,
      color: "text-gray-400",
    },
    {
      name: "JavaScript",
      icon: "fab fa-js",
      level: 95,
      color: "text-yellow-400",
    },
    {
      name: "TypeScript",
      icon: "fas fa-code",
      level: 80,
      color: "text-blue-500",
    },
    {
      name: "GraphQL",
      icon: "fas fa-project-diagram",
      level: 75,
      color: "text-pink-500",
    },
    {
      name: "Redux",
      icon: "fas fa-cubes",
      level: 85,
      color: "text-purple-500",
    },
    {
      name: "Tailwind CSS",
      icon: "fas fa-paint-brush",
      level: 90,
      color: "text-cyan-400",
    },
    {
      name: "Docker",
      icon: "fab fa-docker",
      level: 70,
      color: "text-blue-300",
    },
    { name: "AWS", icon: "fab fa-aws", level: 65, color: "text-orange-500" },
    {
      name: "Git",
      icon: "fab fa-git-alt",
      level: 85,
      color: "text-orange-600",
    },
  ];

  return (
    <div
      className={`min-h-screen ${
        darkMode ? "bg-gray-900 text-gray-100" : "bg-gray-50 text-gray-900"
      }`}
    >
      {/* Custom cursor */}
      <div
        className="fixed w-8 h-8 rounded-full bg-blue-500 opacity-20 pointer-events-none z-50 transform -translate-x-1/2 -translate-y-1/2 mix-blend-difference"
        style={{
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          transition: "transform 0.1s ease-out",
        }}
      >
      </div>

      {/* Floating background elements */}
      <div className="fixed top-20 left-10 w-16 h-16 rounded-full bg-blue-500 opacity-10 blur-xl animate-float -z-10">
      </div>
      <div className="fixed bottom-40 right-20 w-24 h-24 rounded-full bg-purple-500 opacity-10 blur-xl animate-float-reverse -z-10">
      </div>
      <div className="fixed top-1/3 right-1/4 w-20 h-20 rounded-full bg-pink-500 opacity-10 blur-xl animate-spin-slow -z-10">
      </div>

      {/* Navigation */}
      <nav
        className={`fixed w-full z-40 transition-all duration-300 ${
          darkMode
            ? "bg-gray-900/80 backdrop-blur-md"
            : "bg-white/80 backdrop-blur-md"
        } border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold gradient-text">
                MERN<span className="font-normal">DEV</span>
              </span>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:block">
              <div className="ml-10 flex items-center space-x-8">
                <button
                  onClick={() => scrollToSection("home")}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    activeSection === "home" ? "text-blue-400" : ""
                  }`}
                >
                  Home
                </button>
                <button
                  onClick={() => scrollToSection("about")}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    activeSection === "about" ? "text-blue-400" : ""
                  }`}
                >
                  About
                </button>
                <button
                  onClick={() => scrollToSection("skills")}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    activeSection === "skills" ? "text-blue-400" : ""
                  }`}
                >
                  Skills
                </button>
                <button
                  onClick={() => scrollToSection("projects")}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    activeSection === "projects" ? "text-blue-400" : ""
                  }`}
                >
                  Projects
                </button>
                <button
                  onClick={() => scrollToSection("contact")}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    activeSection === "contact" ? "text-blue-400" : ""
                  }`}
                >
                  Contact
                </button>
                <button
                  onClick={toggleDarkMode}
                  className="p-2 rounded-full focus:outline-none"
                >
                  {darkMode
                    ? <i className="fas fa-sun text-yellow-400"></i>
                    : <i className="fas fa-moon text-gray-700"></i>}
                </button>
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
              <button
                onClick={toggleDarkMode}
                className="p-2 rounded-full mr-4 focus:outline-none"
              >
                {darkMode
                  ? <i className="fas fa-sun text-yellow-400"></i>
                  : <i className="fas fa-moon text-gray-700"></i>}
              </button>
              <button
                onClick={toggleMenu}
                className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
              >
                {menuOpen
                  ? <i className="fas fa-times text-xl"></i>
                  : <i className="fas fa-bars text-xl"></i>}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
            menuOpen ? "max-h-96 py-4" : "max-h-0"
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
            <button
              onClick={() => scrollToSection("home")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === "home"
                  ? "bg-gray-800 text-blue-400"
                  : "hover:bg-gray-800 hover:text-blue-400"
              }`}
            >
              Home
            </button>
            <button
              onClick={() => scrollToSection("about")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === "about"
                  ? "bg-gray-800 text-blue-400"
                  : "hover:bg-gray-800 hover:text-blue-400"
              }`}
            >
              About
            </button>
            <button
              onClick={() => scrollToSection("skills")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === "skills"
                  ? "bg-gray-800 text-blue-400"
                  : "hover:bg-gray-800 hover:text-blue-400"
              }`}
            >
              Skills
            </button>
            <button
              onClick={() => scrollToSection("projects")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === "projects"
                  ? "bg-gray-800 text-blue-400"
                  : "hover:bg-gray-800 hover:text-blue-400"
              }`}
            >
              Projects
            </button>
            <button
              onClick={() => scrollToSection("contact")}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                activeSection === "contact"
                  ? "bg-gray-800 text-blue-400"
                  : "hover:bg-gray-800 hover:text-blue-400"
              }`}
            >
              Contact
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        id="home"
        className="min-h-screen flex items-center justify-center relative overflow-hidden pt-16"
      >
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-1/4 left-1/4 w-32 h-32 rounded-full bg-blue-500 opacity-10 blur-3xl animate-pulse-slow">
          </div>
          <div className="absolute bottom-1/3 right-1/3 w-40 h-40 rounded-full bg-purple-500 opacity-10 blur-3xl animate-pulse-slow delay-1000">
          </div>
          <div className="absolute top-2/3 left-1/2 w-28 h-28 rounded-full bg-pink-500 opacity-10 blur-3xl animate-pulse-slow delay-1500">
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 md:py-32 flex flex-col md:flex-row items-center">
          <div className="md:w-1/2 mb-12 md:mb-0">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Hi, I'm <span className="gradient-text">Alex</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-blue-400">
              MERN Stack Developer
            </h2>
            <p
              className={`text-lg mb-8 max-w-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              I build scalable, performant web applications with modern
              technologies. Passionate about creating seamless user experiences
              with clean, efficient code.
            </p>
            <div className="flex flex-wrap gap-4">
              <button
                onClick={() => scrollToSection("projects")}
                className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button
                onClick={() => scrollToSection("contact")}
                className={`px-6 py-3 rounded-lg font-medium border ${
                  darkMode
                    ? "border-gray-700 hover:bg-gray-800"
                    : "border-gray-300 hover:bg-gray-100"
                } transition-all duration-300 transform hover:-translate-y-1`}
              >
                Contact Me
              </button>
            </div>
          </div>
          <div className="md:w-1/2 flex justify-center relative">
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-20 blur-xl animate-pulse-slow">
              </div>
              <div className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500 to-purple-600 opacity-10 blur-xl animate-spin-slow">
              </div>
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-blue-500/30 animate-float">
                <img
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Developer"
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gray-800 p-4 rounded-lg shadow-xl animate-float-reverse">
                <div className="text-2xl font-bold gradient-text">3+ Years</div>
                <div className="text-sm text-gray-400">Experience</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section
        id="about"
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">About Me</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6">
            </div>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Get to know more about who I am and what I do
            </p>
          </div>

          <div className="flex flex-col md:flex-row gap-12 items-center">
            <div className="md:w-1/3 flex justify-center">
              <div className="relative w-64 h-64 rounded-2xl overflow-hidden border-4 border-blue-500/20 shadow-xl">
                <img
                  src="https://images.unsplash.com/photo-1571171637578-41bc2dd41cd8?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=800&q=80"
                  alt="Developer at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent">
                </div>
                <div className="absolute bottom-0 left-0 p-6">
                  <h3 className="text-xl font-bold text-white">Alex Johnson</h3>
                  <p className="text-blue-400">MERN Stack Developer</p>
                </div>
              </div>
            </div>

            <div className="md:w-2/3">
              <h3 className="text-2xl font-bold mb-6">Who am I?</h3>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                I'm a passionate Full Stack Developer specializing in the MERN
                stack (MongoDB, Express.js, React, Node.js). With over 3 years
                of professional experience, I've helped startups and established
                companies build robust, scalable web applications.
              </p>
              <p
                className={`text-lg mb-6 ${
                  darkMode ? "text-gray-300" : "text-gray-600"
                }`}
              >
                My journey in web development began when I built my first
                website at 16. Since then, I've been obsessed with creating
                digital experiences that are both beautiful and functional. I
                believe in writing clean, maintainable code and staying
                up-to-date with the latest industry trends.
              </p>
              <div className="grid grid-cols-2 gap-6 mb-8">
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">
                    Education
                  </h4>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    B.Sc. in Computer Science
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    Stanford University, 2018
                  </p>
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">
                    Experience
                  </h4>
                  <p
                    className={`${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    Senior MERN Developer
                  </p>
                  <p
                    className={`text-sm ${
                      darkMode ? "text-gray-400" : "text-gray-500"
                    }`}
                  >
                    TechSolutions Inc., 2020-Present
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  href="#"
                  className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <i className="fab fa-github mr-2"></i> GitHub
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="fab fa-linkedin mr-2"></i> LinkedIn
                </a>
                <a
                  href="#"
                  className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <i className="fas fa-file-alt mr-2"></i> Resume
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Skills Section */}
      <section id="skills" className="py-20 bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">My Skills</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6">
            </div>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              The technologies I work with to bring ideas to life
            </p>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mb-12">
            {skills.map((skill, index) => (
              <div
                key={index}
                className={`p-6 rounded-xl bg-gray-700/50 backdrop-blur-sm border border-gray-700 card-hover-effect transition-all duration-300 ${
                  index % 4 === 0
                    ? "hover:border-blue-500"
                    : index % 4 === 1
                    ? "hover:border-purple-500"
                    : index % 4 === 2
                    ? "hover:border-pink-500"
                    : "hover:border-cyan-500"
                }`}
              >
                <div className="flex items-center mb-3">
                  <i className={`${skill.icon} ${skill.color} text-2xl mr-3`}>
                  </i>
                  <h3 className="font-semibold">{skill.name}</h3>
                </div>
                <div className="w-full bg-gray-700 rounded-full h-2.5">
                  <div
                    className={`h-2.5 rounded-full ${
                      index % 4 === 0
                        ? "bg-blue-500"
                        : index % 4 === 1
                        ? "bg-purple-500"
                        : index % 4 === 2
                        ? "bg-pink-500"
                        : "bg-cyan-500"
                    }`}
                    style={{ width: `${skill.level}%` }}
                  >
                  </div>
                </div>
                <div className="text-right mt-1 text-sm text-gray-400">
                  {skill.level}%
                </div>
              </div>
            ))}
          </div>

          <div className="bg-gray-700/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm">
            <h3 className="text-xl font-bold mb-4">My Development Approach</h3>
            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <div className="flex items-start mb-4">
                  <div className="bg-blue-500/20 p-2 rounded-lg mr-4">
                    <i className="fas fa-code text-blue-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      Clean & Efficient Code
                    </h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      I prioritize writing clean, maintainable code with proper
                      documentation. Performance optimization is always in mind.
                    </p>
                  </div>
                </div>
                <div className="flex items-start mb-4">
                  <div className="bg-purple-500/20 p-2 rounded-lg mr-4">
                    <i className="fas fa-mobile-alt text-purple-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Responsive Design</h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      All my projects are built with mobile-first approach,
                      ensuring seamless experience across all devices.
                    </p>
                  </div>
                </div>
              </div>
              <div>
                <div className="flex items-start mb-4">
                  <div className="bg-pink-500/20 p-2 rounded-lg mr-4">
                    <i className="fas fa-shield-alt text-pink-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">Security Focused</h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Implementing best security practices is crucial. I ensure
                      data protection and secure authentication in all
                      applications.
                    </p>
                  </div>
                </div>
                <div className="flex items-start">
                  <div className="bg-cyan-500/20 p-2 rounded-lg mr-4">
                    <i className="fas fa-rocket text-cyan-400"></i>
                  </div>
                  <div>
                    <h4 className="font-semibold mb-2">
                      Scalable Architecture
                    </h4>
                    <p
                      className={`${
                        darkMode ? "text-gray-300" : "text-gray-600"
                      }`}
                    >
                      Building applications with scalability in mind from day
                      one, using microservices when appropriate.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="py-20 bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">My Projects</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6">
            </div>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Some of my recent work that I'm proud of
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            {projects.map((project, index) => (
              <div
                key={index}
                className="project-card rounded-xl overflow-hidden border border-gray-800 bg-gray-800/50 backdrop-blur-sm transition-all duration-300 hover:shadow-xl"
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="project-image w-full h-full object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent">
                  </div>
                  <div className="absolute bottom-0 left-0 p-4">
                    <h3 className="text-xl font-bold text-white">
                      {project.title}
                    </h3>
                  </div>
                </div>
                <div className="p-6">
                  <p
                    className={`mb-4 ${
                      darkMode ? "text-gray-300" : "text-gray-600"
                    }`}
                  >
                    {project.description}
                  </p>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="skill-pill text-xs px-3 py-1 rounded-full bg-gray-700 text-blue-400"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                  <div className="flex justify-between items-center">
                    <a
                      href={project.link}
                      className="text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      View Project <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                    <a
                      href="#"
                      className="text-gray-400 hover:text-white"
                      title="View Code"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center">
            <button className="px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 rounded-lg font-medium hover:from-blue-600 hover:to-purple-700 transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl">
              View All Projects
            </button>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section
        id="contact"
        className="py-20 bg-gradient-to-b from-gray-900 to-gray-800"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text">Get In Touch</span>
            </h2>
            <div className="w-20 h-1 bg-gradient-to-r from-blue-500 to-purple-600 mx-auto mb-6">
            </div>
            <p
              className={`max-w-2xl mx-auto text-lg ${
                darkMode ? "text-gray-300" : "text-gray-600"
              }`}
            >
              Have a project in mind or want to discuss potential opportunities?
            </p>
          </div>

          <div className="flex flex-col items-center gap-12">
            <div className="lg:w-1/2">
              <div className="bg-gray-700/50 rounded-xl p-8 border border-gray-700 backdrop-blur-sm h-full">
                <h3 className="text-xl font-bold mb-6">Contact Information</h3>
                <div className="space-y-6">
                  <div className="flex items-start">
                    <div className="bg-blue-500/20 p-3 rounded-lg mr-4">
                      <i className="fas fa-envelope text-blue-400"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Email</h4>
                      <a
                        href="mailto:alex@example.com"
                        className="text-blue-400 hover:underline"
                      >
                        alex@example.com
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-purple-500/20 p-3 rounded-lg mr-4">
                      <i className="fas fa-phone-alt text-purple-400"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Phone</h4>
                      <a
                        href="tel:+1234567890"
                        className="text-blue-400 hover:underline"
                      >
                        +1 (234) 567-890
                      </a>
                    </div>
                  </div>
                  <div className="flex items-start">
                    <div className="bg-pink-500/20 p-3 rounded-lg mr-4">
                      <i className="fas fa-map-marker-alt text-pink-400"></i>
                    </div>
                    <div>
                      <h4 className="font-semibold mb-1">Location</h4>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        San Francisco, CA
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-semibold mb-4">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <i className="fab fa-github"></i>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-blue-400 transition-colors"
                    >
                      <i className="fab fa-twitter"></i>
                    </a>
                    <a
                      href="#"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-red-500 transition-colors"
                    >
                      <i className="fab fa-youtube"></i>
                    </a>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="mb-4 md:mb-0">
              <span className="text-xl font-bold gradient-text">
                MERN<span className="font-normal">DEV</span>
              </span>
            </div>
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              &copy; {new Date().getFullYear()}{" "}
              Alex Johnson. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                href="#"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                href="#"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>
              <a
                href="#"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fab fa-twitter"></i>
              </a>
              <a
                href="#"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fas fa-envelope"></i>
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
