import palette from "../../assets/colors.ts";

const Footer = () => {
  return (
    <footer style={{ background: palette.active }} class=" text-white py-12">
      <div class="container mx-auto px-4">
        <div class="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div>
            <div class="flex items-center space-x-2 mb-4">
              <div class="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
                <i class="fas fa-code text-white text-xl"></i>
              </div>
              <span style={{ color: palette.white }} class="text-xl font-bold">
                CodeMaster
              </span>
            </div>
            <p class="text-gray-300 mb-4">
              The best platform to learn web development and advance your
              career.
            </p>
            <div class="flex space-x-4">
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-twitter text-xl"></i>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-facebook text-xl"></i>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-instagram text-xl"></i>
              </a>
              <a href="#" class="text-gray-300 hover:text-white">
                <i class="fab fa-linkedin text-xl"></i>
              </a>
            </div>
          </div>

          <div>
            <h3
              style={{ color: palette.white }}
              class="text-[#fff] font-bold mb-4"
            >
              Courses
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-300 hover:text-white">
                  HTML & CSS
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">
                  JavaScript
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">React</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">Node.js</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">
                  Full-Stack
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: palette.white }} class="text-lg font-bold mb-4">
              Company
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-300 hover:text-white">About Us</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">Careers</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">Blog</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">
                  Affiliates
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">Press</a>
              </li>
            </ul>
          </div>

          <div>
            <h3 style={{ color: palette.white }} class="text-lg font-bold mb-4">
              Support
            </h3>
            <ul class="space-y-2">
              <li>
                <a href="#" class="text-gray-300 hover:text-white">
                  Help Center
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">Community</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">Feedback</a>
              </li>
              <li>
                <a href="#" class="text-gray-300 hover:text-white">FAQ</a>
              </li>
            </ul>
          </div>
        </div>

        <div class="border-t border-gray-700 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
          <p class="text-gray-300 mb-4 md:mb-0">
            &copy; 2025 DavidRoman. All rights reserved.
          </p>
          <div class="flex space-x-6">
            <a href="#" class="text-gray-300 hover:text-white">Terms</a>
            <a href="#" class="text-gray-300 hover:text-white">Privacy</a>
            <a href="#" class="text-gray-300 hover:text-white">Cookies</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
