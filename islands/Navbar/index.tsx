import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import CartItems from "../cart/index.tsx";
import { i18n } from "../../i18next.ts";
import ChangeToSpanish from "../changeLanguage/index.tsx";
import { manageTheme, manageTheme2, palette } from "../../assets/colors.ts";
import { selectSuperProfLink } from "../helpers/index.tsx";

const Navbar = () => {
  const activeSectionLocal = localStorage.getItem("section") || "home";
  const isAuth = localStorage.getItem("auth") || "false";
  const user = localStorage.getItem("user") || "user";
  const theme = localStorage.getItem("theme") || "light";
  const userInfo = JSON.parse(localStorage.getItem("userInfo") || "{}");

  const [showSidebar, setShowSidebar] = useState(false);
  const [cartProductsLength, setCartProductsLength] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null as any);

  const [activeSection, setActiveSection] = useState(
    activeSectionLocal || "home",
  );

  //  const { userId }: TokenPayload = jwt.decode(token) as TokenPayload;

  const handleSectionChange = (section: string) => {
    setActiveSection(section);
    localStorage.setItem("section", section);
  };

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cartProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]",
      );
      setCartProductsLength(cartProducts.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

  useEffect(() => {
    const handleClickOutside = (event: any) => {
      const menu = document.getElementById("menu-container");
      const button = document.getElementById("menu-button");

      if (
        menu && button && !menu.contains(event.target) &&
        !button.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  useEffect(() => {
    localStorage.setItem("section", activeSection);
  }, [selectedOption]);

  const menuOptions = [
    {
      id: 1,
      label: "Dashboard",
      link: userInfo.type === "admin" ? "admin-dash" : "user-dash",
      icon: "fa-gauge",
    },
    {
      id: 3,
      label: "Student Dashboard",
      link: "user-dash",
      icon: "fa-gauge",
    },

    { id: 6, label: "Logout", link: null, icon: "fa-right-from-bracket" },
  ];

  const handleOptionClick = (option: any) => {
    const logout = 6;

    setSelectedOption(option);
    setIsOpen(false);
    if (option.id === logout) {
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
      localStorage.removeItem("userInfo");
      localStorage.removeItem("jwtToken");
      window.location.href = "/login";
    }
  };

  const { t } = i18n;

  const sideBarsStyles = {
    width: "370px",
    position: "fixed",
    top: 0,
    right: 0,
    height: "100vh",
    backgroundColor: "#2e356d",
    zIndex: 999,
    padding: "1rem",
    transform: showSidebar ? "translateX(0)" : "translateX(100%)",
    transition: "transform 0.3s ease-in-out",
    display: "flex",
    flexDirection: "column",
    justifyContent: "flex-start",
    alignItems: "flex-start",
  };

  const sections = [
    { id: "home", label: "Home", link: "" },
    { id: "work-with-me", label: " Work with me!", link: "work-with-me" },
  ];

  const buttonLog = () => {
    const menuToshow = () => {
      if (userInfo.type === "admin") {
        return menuOptions;
      } else {
        return menuOptions.filter((option) => option.id !== 3);
      }
    };
    return (
      <div className="flex items-center space-x-4">
        {isAuth === "false"
          ? (
            <div
              style={{ background: palette.backgroundSoft }}
              className="hover:bg-primaryDark text-white px-4 py-2 rounded-full font-medium transition duration-300"
            >
              <a href="/login">
                Login
              </a>
            </div>
          )
          : (
            <div>
              <button
                id="menu-button"
                style={{ background: palette.backgroundSoft }}
                onClick={() => setIsOpen(!isOpen)}
                className="flex items-center cursor-pointer justify-between px-6 py-3 bg-indigo-600 text-white rounded-full shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-200"
              >
                <span className="font-medium uppercase">
                  {user.substring(0, 1)}
                </span>
                <span className="ml-2">
                  <i
                    className={`fas fa-chevron-${
                      isOpen ? "up" : "down"
                    } transition-transform duration-200`}
                  >
                  </i>
                </span>
              </button>
              {isOpen && (
                <div className="absolute  mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none menu-transition">
                  <div className="py-1">
                    {menuToshow().map((option) => {
                      if (option.link) {
                        if (option.id === 3 && userInfo.type === "admin") {
                          return (
                            <a
                              key={option.id}
                              type="button"
                              href={`/${option.link.toLowerCase()}`}
                              onClick={() => handleOptionClick(option)}
                              className={`flex items-center w-full text-left px-4 py-2 text-sm cursor-pointer ${
                                selectedOption?.id === option.id
                                  ? "bg-indigo-100 text-indigo-900"
                                  : "text-gray-700 hover:bg-gray-100"
                              }`}
                              role="menuitem"
                              tabIndex={0}
                              onKeyDown={(e) => {
                                if (e.key === "Enter" || e.key === " ") {
                                  handleOptionClick(option);
                                }
                              }}
                            >
                              <i
                                className={`fas ${option.icon} mr-3 text-[${palette.primary}]`}
                              >
                              </i>
                              {option.label}
                            </a>
                          );
                        }

                        return (
                          <a
                            key={option.id}
                            type="button"
                            href={`/${option.link.toLowerCase()}`}
                            onClick={() => handleOptionClick(option)}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm cursor-pointer ${
                              selectedOption?.id === option.id
                                ? "bg-indigo-100 text-indigo-900"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleOptionClick(option);
                              }
                            }}
                          >
                            <i
                              className={`fas ${option.icon} mr-3 text-[${palette.primary}]`}
                            >
                            </i>
                            {option.label}
                          </a>
                        );
                      } else {
                        return (
                          <button
                            key={option.id}
                            type="button"
                            onClick={() => handleOptionClick(option)}
                            className={`flex items-center w-full text-left px-4 py-2 text-sm cursor-pointer ${
                              selectedOption?.id === option.id
                                ? "bg-indigo-100 text-indigo-900"
                                : "text-gray-700 hover:bg-gray-100"
                            }`}
                            role="menuitem"
                            tabIndex={0}
                            onKeyDown={(e) => {
                              if (e.key === "Enter" || e.key === " ") {
                                handleOptionClick(option);
                              }
                            }}
                          >
                            <i
                              className={`fas ${option.icon} mr-3 text-[${palette.primary}]`}
                            >
                            </i>
                            {option.label}
                          </button>
                        );
                      }
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
      </div>
    );
  };

  return (
    <nav
      className={`fixed w-full z-40 transition-all duration-300 ${manageTheme2()} backdrop-blur-md border-b border-gray-200`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-2">
            <a
              href="/"
              onClick={() => handleSectionChange("home")}
              className="block"
            >
              <div //style={{ background: palette.backgroundSoft }}
               className="w-20 h-20 rounded-full flex items-center p-1 justify-center">
                <img
                  src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1756059641/learningplat/aulaconnect_pfphcz.png"
                  alt="logo"
                  className="cursor-pointer"
                />
              </div>
            </a>

            <ChangeToSpanish />

            {
              /* <button
              onClick={() => {
                window.location.reload();
              }}
              className="cursor-pointer pt-2 ml-10 rounded-full focus:outline-none -mt-2"
              data-toggle-theme="dark,light"
              data-act-class="ACTIVECLASS"
            >
              {theme === "dark"
                ? <i className="fas fa-sun text-yellow-400"></i>
                : <i className="fas fa-moon text-gray-700"></i>}
            </button> */
            }
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:block">
            <div className="ml-10 flex items-center space-x-8">
              {sections.map((option) => (
                <a
                  href={option.id !== "pricing"
                    ? `/${option.link}`
                    : selectSuperProfLink()}
                  target={option.id === "pricing" ? "_blank" : "_self"}
                  onClick={() => handleSectionChange(option.id)}
                  className={`nav-link px-3 py-2 text-sm font-medium ${
                    activeSection === option.id
                      ? `text-[${palette.primary}]`
                      : ""
                  }`}
                >
                  {option.label}
                </a>
              ))}
              {buttonLog()}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden  flex items-center">
            {buttonLog()}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="inline-flex items-center justify-center p-2 rounded-md focus:outline-none"
            >
              {isMobileMenuOpen
                ? <i className="fas fa-times text-xl"></i>
                : <i className="fas fa-bars text-xl"></i>}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div
        className={`md:hidden transition-all duration-300 ease-in-out overflow-hidden ${
          isMobileMenuOpen ? "max-h-96 py-4" : "max-h-0"
        }`}
      >
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3 flex flex-col">
          {sections.map((sections) => {
            return (
              <a
                onClick={() => setActiveSection(sections.id)}
                href={`/${sections.link}`}
                className={`block px-3 py-2 rounded-md text-base font-medium ${
                  activeSection === sections.id
                    ? `bg-gray-800 text-[${palette.primary}]`
                    : "hover:text-blue-400"
                }`}
              >
                {sections.label}
              </a>
            );
          })}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
