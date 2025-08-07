import { palette } from "../../assets/colors.ts";

const Footer = () => {
  return (
    <footer
      style={{ background: palette.active }}
      className=" text-white py-12"
    >
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div
              style={{ background: palette.backgroundSoft }}
              className="w-10 h-10 rounded-full flex items-center justify-center"
            >
              <img
                src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754490890/learningplat/logo_qkfxhw.png"
                alt="logo"
              />
            </div>
            <p className="text-gray-300 mb-4">
              The best platform to learn web development and advance your
              career.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" className="text-gray-300 hover:text-white">
                <i className="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3
              style={{ color: palette.white }}
              className="text-[#fff] font-bold mb-4"
            >
              Courses
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  HTML & CSS
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  JavaScript
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">React</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Node.js
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Full-Stack
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{ color: palette.white }}
              className="text-lg font-bold mb-4"
            >
              Company
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Careers
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Affiliates
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">Press</a>
              </li>
            </ul>
          </div>

          <div>
            <h3
              style={{ color: palette.white }}
              className="text-lg font-bold mb-4"
            >
              Support
            </h3>
            <ul className="space-y-2">
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Community
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">
                  Feedback
                </a>
              </li>
              <li>
                <a href="#" className="text-gray-300 hover:text-white">FAQ</a>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p className="text-gray-300 mb-4 md:mb-0">
            &copy; 2025 DavidRoman. All rights reserved.
          </p>
          <div className="flex space-x-6">
            <a href="#" className="text-gray-300 hover:text-white">Terms</a>
            <a href="#" className="text-gray-300 hover:text-white">Privacy</a>
            <a href="#" className="text-gray-300 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
