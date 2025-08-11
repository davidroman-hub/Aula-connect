import { useEffect, useState } from "preact/hooks";
import { palette } from "../../assets/colors.ts";
import { selectSuperProfLink } from "../helpers/index.tsx";

//  .gradient-text {
//         background: linear-gradient(90deg, #3b82f6, #8b5cf6, #ec4899);
//         -webkit-background-clip: text;
//         background-clip: text;
//         color: transparent;
//     }
//     .card-hover-effect {
//         transition: all 0.3s ease;
//     }
//     .card-hover-effect:hover {
//         transform: translateY(-5px);
//         box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
//     }
//     .skill-pill {
//         transition: all 0.2s ease;
//     }
//     .skill-pill:hover {
//         transform: scale(1.05);
//     }
//     .nav-link {
//         position: relative;
//     }
//     .nav-link::after {
//         content: '';
//         position: absolute;
//         width: 0;
//         height: 2px;
//         bottom: -2px;
//         left: 0;
//         background: linear-gradient(90deg, #3b82f6, #8b5cf6);
//         transition: width 0.3s ease;
//     }
//     .nav-link:hover::after {
//         width: 100%;
//     }
//     .project-image {
//         transition: all 0.5s cubic-bezier(0.4, 0, 0.2, 1);
//     }
//     .project-card:hover .project-image {
//         transform: scale(1.03);
//     }

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
      title: "Inarix Portal",
      description:
        "Since 5 years I engineered the end-to-end development of the Inarix portal , leading French agritech company, rigorously implementing pixel-perfect Figma designs to ensure UI consistency and ergonomics. Developed complex functionalities including user and device management, sample visualization, and location editing through interactive Mapbox maps. Utilized MUI tables extensively for data management tasks such as user and device editing, simple and advanced sample visualization, and real-time location updates. Ensured application reliability and performance through comprehensive automated testing with Jest and Cypress.",
      technologies: [
        "React",
        "Redux",
        "Typescript",
        "Axios",
        "React Router",
        "React Hooks",
        "Mapbox",
        "MUI",
        "JEST",
        "Cypress io",
        "i18next",
        "Sass",
      ],
      image:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754828954/learningplat/Captura_de_pantalla_2025-08-10_a_la_s_14.28.12_lpdsfy.png",
      link: "https://inarix.com/",
      github: null,
    },
    {
      title: "Learning platform with Deno Fresh",
      description:
        "Learning platform built with Deno Fresh that allows students to register and access a personalized dashboard to track their course progress. As an admin, I can manage and monitor the learning modules, enabling efficient oversight of student progress and engagement.",
      technologies: [
        "Deno Fresh",
        "MongoDB",
        "React",
        "Tailwind CSS",
        "Daisy UI",
        "i18next",
        "JWT",
        "Axiod (Deno Axios)",
      ],
      image:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754830405/learningplat/leargningpltss/Captura_de_pantalla_2025-08-10_a_la_s_14.52.16_wutcse.png",
      link: "https://codewithdavid.davidroman-hub.deno.net/",
      github:
        "https://github.com/davidroman-hub/Learning-platform-with-deno-fresh",
    },
  ];

  const skills = [
    { name: "React", icon: "fab fa-react", level: 95, color: "text-blue-400" },
    {
      name: "Redux",
      icon: "fas fa-cubes",
      level: 85,
      color: "text-purple-500",
    },
    {
      name: "TypeScript",
      icon: "fas fa-code",
      level: 80,
      color: "text-blue-500",
    },

    {
      name: "Deno Fresh",
      icon: null,
      src:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754824434/learningplat/fresh-seeklogo_pcoivz.svg",
      level: 85,
      color: "text-purple-600",
    },
    {
      name: "Material UI",
      icon: null,
      src:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754825073/learningplat/Material_UI_hudhto.svg",
      level: 85,
      color: "text-purple-600",
    },
    {
      name: "Tailwind CSS",
      icon: "fas fa-paint-brush",
      level: 90,
      color: "text-cyan-400",
    },
    {
      name: "MongoDB",
      icon: "fas fa-database",
      level: 85,
      color: "text-green-400",
    },

    {
      name: "Jest",
      icon: null,
      src:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754824275/learningplat/Jest_zuvwop.svg",
      level: 85,
      color: "text-purple-600",
    },
    {
      name: "Cypress io",
      icon: null,
      level: 85,
      src:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754824299/learningplat/Cypress_rzw9yb.svg",
      color: "text-white-600",
    },
    {
      name: "MapBox",
      icon: null,
      src:
        "https://res.cloudinary.com/dm8dxwvix/image/upload/v1754825048/learningplat/mapbox-seeklogo_wf9yro.svg",
      level: 85,
      color: "text-purple-600",
    },

    {
      name: "JavaScript",
      icon: "fab fa-js",
      level: 95,
      color: "text-yellow-400",
    },
    {
      name: "Git",
      icon: "fab fa-git-alt",
      level: 85,
      color: "text-orange-600",
    },
    {
      name: "Node.js",
      icon: "fab fa-node-js",
      level: 90,
      color: "text-green-500",
    },

    {
      name: "Express",
      icon: "fas fa-server",
      level: 85,
      color: "text-gray-400",
    },

    {
      name: "Html 5",
      icon: "fa-brands fa-html5",
      level: 85,
      color: "text-orange-600",
    },
    {
      name: "Sass",
      icon: "fa-brands fa-sass",
      level: 85,
      color: "text-pink-600",
    },
    {
      name: "CSS 3",
      icon: "fa-brands fa-css3",
      level: 85,
      color: "text-blue-600",
    },
    {
      name: "Bootstrap",
      icon: "fa-brands fa-bootstrap",
      level: 85,
      color: "text-purple-600",
    },
  ];

  const education = [
    {
      degree: "Engineering in Aquaculture",
      description: "Instituto Tecnologico de Boca del Rio, 2012-2017",
    },
    {
      degree: "Full Stack Web Development ",
      description: "Mexico city, 2019-2020",
    },
  ];

  const experience = [{
    title: "Private web trainer",
    company: "Freelance - Via Superprof platform, France",
    duration: "2025-Present",
    description:
      `I provide personalized lessons for students and professionals, covering modern
      and high-demand technologies such as React, Redux, JavaScript, Tailwind,
      Deno Fresh (server rendering and database), MUI, Mapbox, Node.js, SCSS, and
      HTML.
      I developed a custom platform using Deno Fresh and MongoDB to deliver my
      Superprof classes, where students can track the progress of topics covered in
      lessons through a dashboard, and the admin panel allows me to monitor each
      student’s learning progress.
      I adapt the content and methodology to the student’s level and goals, fostering
      practical learning and a focus on real-world projects. `,
    link: "https://codewithdavid.davidroman-hub.deno.net/",
  }, {
    title: "Front end Developer",
    company: "Inarix Paris, France",
    duration: "2020-Present",
    description:
      `Pioneered the development of the Inarix portal, playing a central role in creating
      an innovative platform for this leading French agritech company. I designed and
      developed the portal from A to Z, ensuring a smooth user experience and highlevel technical execution, using modern technologies such as React, TypeScript,
      Redux, MUI and Mapbox.
      • Throughout the process, I rigorously followed the mockups designed in
      Figma, ensuring visual consistency and user interface ergonomics.
      • I implemented advanced features such as sample visualization, user
      management and interactive silo mapping, while ensuring the application's
      reliability and performance through a comprehensive test suite with Jest and
      Cypress.`,
    link: "https://inarix.com/",
  }, {
    title: "Fullstack Developer Freelance",
    company: "Independent, France",
    duration: "2019-2020",
    description:
      `• Complete creation of web pages for individuals, including component development, web design, and E-commerce application creation, utilizing the MERN Stack (MongoDB, Express.js, React, and Node.js) for full-stack JavaScript development. Tasks include front-end UI design with React, RESTful API development with Express and Node.js, and data management using MongoDB.`,

    link: "",
  }, {
    title: "Production Manager",
    company: "Rol-man S.A. de C.V., Mexico",
    duration: "2013-2019",
    description:
      `• Complete administration of a fish and seafood sales company, including raw
        material management, sales, staff training, payment management, and
        supervision of 6 employees.
        • Contact with suppliers and internal relations.
      • Order management for different clients.`,
    link: "",
  }, {
    title: "Production Manager",
    company: "CIBAC Mexico, CDMX",
    duration: "2018-2018",
    description:
      `• Responsible for the production of live food for feeding 'Ambystoma
        mexicanum' at the juvenile stage.
      • Studies on the reproduction of 'Ambystoma mexicanum'`,
    link: "",
  }, {
    title: "Project Manager",
    company: "Sagarpa, Veracruz, Mexico",
    duration: "2017-2018",
    description:
      `Consultation and review of documents for semi-intensive aquaculture
       projects in the state of Veracruz.`,
    link: "",
  }];

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
        className={`fixed w-full mt-15 z-5 transition-all duration-300 ${
          darkMode
            ? "bg-gray-900/80 backdrop-blur-md"
            : "bg-white/80 backdrop-blur-md"
        } border-b ${darkMode ? "border-gray-800" : "border-gray-200"}`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center">
              <span className="text-xl font-bold gradient-text">
                D<span className="font-normal">R</span>
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
              </div>
            </div>

            {/* Mobile menu button */}
            <div className="md:hidden flex items-center">
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
        style={{ backgroundColor: palette.darkThemeBackground }}
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
              Hi, I'm <span className="gradient-text">David</span>
            </h1>
            <h2 className="text-2xl md:text-4xl font-semibold mb-6 text-[#F43374]">
              Web Developer
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
                className="z-2 px-6 py-3 bg-[#F43374] rounded-full transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl"
              >
                View My Work
              </button>
              <button
                onClick={() => {
                  console.log("Contact Me Clicked");
                  scrollToSection("contact");
                }}
                className={`z-2 px-6 py-3 rounded-full font-medium border ${
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
              <div className="relative w-full h-full rounded-full overflow-hidden border-4 border-[#8F1E45] animate-float">
                <img
                  src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754651138/learningplat/david_acqkkq.png"
                  alt="Developer"
                  className="w-full h-full object-cover object-top"
                />
              </div>
              <div className="absolute -bottom-5 -right-5 bg-gray-800 p-4 rounded-lg shadow-xl animate-float-reverse">
                <div className="text-2xl font-bold gradient-text">6+ Years</div>
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
              <div
                style={{ background: palette.backgroundSoft }}
                className="relative w-64 h-64 rounded-full overflow-hidden border-4 border-blue-500/20 shadow-xl"
              >
                <img
                  src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754490890/learningplat/logo_qkfxhw.png"
                  alt="Developer at work"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/80 to-transparent">
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
                I'm a passionate Web Developer specializing in the Front end
                stack(React Js, Figma, Redux, Tailwind, bootstrap, Mapbox, MUI
                components,and more...), but also in the back end stack
                (MongoDB, Express.js, Node.js) & Finally the best of two worlds
                the server render (Deno Fresh). With over 6 years of
                professional experience, I've helped startups and established
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

                  {education.map((edu, index) => (
                    <div key={index}>
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {edu.degree}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {edu.description}
                      </p>
                    </div>
                  ))}
                </div>
                <div>
                  <h4 className="font-semibold text-blue-400 mb-2">
                    Experience
                  </h4>

                  {experience.map((exp, index) => (
                    <div key={index} className="mb-4">
                      <p
                        className={`${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        } font-semibold`}
                      >
                        {exp.title}
                      </p>
                      <p
                        className={`text-sm ${
                          darkMode ? "text-gray-400" : "text-gray-500"
                        }`}
                      >
                        {exp.company}, {exp.duration}
                      </p>
                      <p
                        className={`mt-2 text-sm ${
                          darkMode ? "text-gray-300" : "text-gray-600"
                        }`}
                      >
                        {exp.description}
                      </p>

                      <a
                        href={exp.link}
                        target="_blank"
                        className="text-blue-400 hover:underline mt-2 inline-block"
                      >
                        {exp.link.length > 25
                          ? exp.link.slice(0, 21)
                          : exp.link}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
              <div className="flex flex-wrap gap-4">
                <a
                  target="_blank"
                  href="https://github.com/davidroman-hub/"
                  className="flex items-center px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 transition-colors"
                >
                  <i className="fab fa-github mr-2" /> GitHub
                </a>
                <a
                  target="_blank"
                  href="https://www.linkedin.com/in/jobdavidroman/"
                  className="flex items-center px-4 py-2 bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  <i className="fab fa-linkedin mr-2" /> LinkedIn
                </a>
                <a
                  href="../assets/davidRomanF.pdf"
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
      <section id="skills" className="py-20 bg-[#8F1E45]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              <span className="gradient-text2">My Skills</span>
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
                  {skill.icon !== null
                    ? (
                      <i
                        className={`${skill.icon} ${skill.color} text-2xl mr-3`}
                      >
                      </i>
                    )
                    : (
                      <img
                        style={{ width: "24px" }}
                        className="mr-4"
                        src={skill.src}
                      />
                    )}
                  <h3 className="font-semibold">{skill.name}</h3>
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
              <span className="gradient-text">Big Projects</span>
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
                      target="_blank"
                      href={project.link}
                      className="text-blue-400 hover:text-blue-300 flex items-center"
                    >
                      View Project <i className="fas fa-arrow-right ml-2"></i>
                    </a>
                    {project.github
                      ? (
                        <a
                          target="_blank"
                          href={project.github ? project.github : ""}
                          className="text-gray-400 hover:text-white"
                          title="View Code"
                        >
                          <i className="fab fa-github"></i>
                        </a>
                      )
                      : ""}
                  </div>
                </div>
              </div>
            ))}
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
                        href="mailto:jobroman83@gmail.com"
                        className="text-blue-400 hover:underline"
                      >
                        jobroman83@gmail.com
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
                        href="tel:+33744409662"
                        className="text-blue-400 hover:underline"
                      >
                        +33 7 44 40 96 62
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
                        Paris, France
                      </p>
                    </div>
                  </div>
                </div>

                <div className="mt-12">
                  <h4 className="font-semibold mb-4">Connect with me</h4>
                  <div className="flex space-x-4">
                    <a
                      target="_blank"
                      href="https://www.linkedin.com/in/jobdavidroman/"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <i className="fab fa-linkedin-in"></i>
                    </a>
                    <a
                      target="_blank"
                      href="https://github.com/davidroman-hub/"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-gray-800 transition-colors"
                    >
                      <i className="fab fa-github"></i>
                    </a>

                    <a
                      target="_blank"
                      href={selectSuperProfLink()}
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-white transition-colors"
                    >
                      <img
                        style={{ width: "24px" }}
                        src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754826402/learningplat/ss_rvpyqv.png"
                        alt="superprof"
                      />
                    </a>

                    <a
                      target="_blank"
                      href="https://discord.gg/8K99PkyW"
                      className="w-10 h-10 rounded-full bg-gray-600 flex items-center justify-center hover:bg-blue-600 transition-colors"
                    >
                      <i className="fab fa-discord"></i>
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
            <div
              className={`text-sm ${
                darkMode ? "text-gray-400" : "text-gray-600"
              }`}
            >
              &copy; {new Date().getFullYear()}{" "}
              David Roman. All rights reserved.
            </div>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <a
                target="_blank"
                href="https://github.com/davidroman-hub/"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fab fa-github"></i>
              </a>
              <a
                target="_blank"
                href="https://www.linkedin.com/in/jobdavidroman/"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fab fa-linkedin-in"></i>
              </a>

              <a
                target="_blank"
                href="mailto:jobroman83@gmail.com"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fas fa-envelope"></i>
              </a>

              <a
                target="_blank"
                href="https://discord.gg/8K99PkyW"
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <i className="fab fa-discord"></i>
              </a>
              <a
                target="_blank"
                href={selectSuperProfLink()}
                className={`${
                  darkMode
                    ? "text-gray-400 hover:text-white"
                    : "text-gray-600 hover:text-gray-900"
                } transition-colors`}
              >
                <img
                  style={{ width: "24px" }}
                  src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754826402/learningplat/ss_rvpyqv.png"
                  alt="superprof"
                />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Portfolio;
