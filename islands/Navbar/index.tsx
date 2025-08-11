import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import CartItems from "../cart/index.tsx";
import { i18n } from "../../i18next.ts";
import ChangeToSpanish from "../changeLanguage/index.tsx";
import { palette } from "../../assets/colors.ts";

const Cart = (
  showSidebar: boolean,
  setShowSidebar: Dispatch<StateUpdater<boolean>>,
  cartProductsLength: number,
) => (
  <div onClick={() => setShowSidebar(true)} className="dropdown dropdown-end">
    <div tabIndex={0} role="button" className="btn btn-ghost btn-circle">
      <div className="indicator">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-5 w-5"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"
          />
        </svg>
        <span className="badge badge-sm indicator-item">
          {cartProductsLength}
        </span>
      </div>
    </div>
  </div>
);

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [cartProductsLength, setCartProductsLength] = useState(0);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState(null as any);
  const isAuth = localStorage.getItem("auth") || "false";
  const user = localStorage.getItem("user") || "user";

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

  const menuOptions = [
    { id: 1, label: "Dashboard", icon: "fa-gauge" },
    { id: 2, label: "Profile", icon: "fa-user" },
    { id: 6, label: "Logout", icon: "fa-right-from-bracket" },
  ];

  const handleOptionClick = (option: any) => {
    const logout = 6;

    setSelectedOption(option);
    setIsOpen(false);
    if (option.id === logout) {
      localStorage.removeItem("auth");
      localStorage.removeItem("user");
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

  return (
    // <>
    //   <div className="navbar bg-base-100 justify-between shadow-sm border-gray-600 border-b">
    //     <div style={sideBarsStyles}>
    //       <p class="p-4 border-b border-gray-600 w-screen mb-3">
    //         Cart({cartProductsLength})
    //       </p>
    //       <div>
    //         <CartItems />
    //       </div>
    //     </div>
    //     <div className="flex items-center ">
    //       <a href="/" className="btn btn-ghost text-xl">
    //         Ecommerce example
    //       </a>
    //       <div>
    //         <a href="/products" className="ml-6 mt-4">
    //           Products
    //         </a>
    //       </div>
    //       <div>
    //         <a href="/orders" className="ml-6 mt-4">
    //           Orders
    //         </a>
    //       </div>

    //       <div>
    //         <h1 class="text-4xl font-bold">{t("login.title")}</h1>
    //         <ChangeToSpanish />
    //       </div>
    //     </div>

    //     <div className="flex-none">
    //       {Cart(showSidebar, setShowSidebar, cartProductsLength)}
    //     </div>
    //   </div>
    //   {showSidebar && (
    //     <div
    //       onClick={() => setShowSidebar(false)}
    //       class="fixed inset-0 bg-black opacity-20  z-50"
    //     >
    //     </div>
    //   )}
    // </>

    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div class="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
        <div className="flex items-center space-x-2">
          <div
            style={{ background: palette.backgroundSoft }}
            className="w-15 h-15 rounded-full flex items-center justify-center"
          >
            <img
              src="https://res.cloudinary.com/dm8dxwvix/image/upload/v1754490890/learningplat/logo_qkfxhw.png"
              alt="logo"
            />
          </div>
        </div>

        <div
          className={isMobileMenuOpen
            ? "flex flex-col absolute top-16 left-0 right-0 bg-white p-4 shadow-md space-y-4 space-x-0"
            : "hidden md:flex space-x-8"}
        >
          <a href="/" className="text-gray-700 hover:text-primary font-medium">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Courses
          </a>
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Pricing
          </a>
          <a
            href="/work-with-me"
            className="text-gray-700 hover:text-primary font-medium"
          >
            Work with me!
          </a>
          <button
            onClick={() => {
              window.location.reload();
            }}
            data-toggle-theme="dark,light"
            data-act-class="ACTIVECLASS"
          >
            s
          </button>
        </div>

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
              <div className="">
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
                  <div
                    id="menu-container"
                    className="absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none menu-transition"
                  >
                    <div className="py-1">
                      {menuOptions.map((option) => (
                        <div
                          key={option.id}
                          onClick={() => handleOptionClick(option)}
                          className={`flex items-center px-4 py-2 text-sm cursor-pointer ${
                            selectedOption?.id === option.id
                              ? "bg-indigo-100 text-indigo-900"
                              : "text-gray-700 hover:bg-gray-100"
                          }`}
                        >
                          <i
                            className={`fas ${option.icon} mr-3 text-[${palette.primary}]`}
                          >
                          </i>
                          {option.label}
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            )}

          <button
            onClick={() =>
              setIsMobileMenuOpen(isMobileMenuOpen ? !isMobileMenuOpen : true)}
            className="md:hidden text-gray-700"
          >
            <i class="fas fa-bars text-xl"></i>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
