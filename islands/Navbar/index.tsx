import { Dispatch, StateUpdater, useEffect, useState } from "preact/hooks";
import CartItems from "../cart/index.tsx";
import { i18n } from "../../i18next.ts";
import ChangeToSpanish from "../changeLanguage/index.tsx";

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

  useEffect(() => {
    const intervalId = setInterval(() => {
      const cartProducts = JSON.parse(
        localStorage.getItem("cartProducts") || "[]",
      );
      setCartProductsLength(cartProducts.length);
    }, 1000);
    return () => clearInterval(intervalId);
  }, []);

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

  // const mobileMenu = document.querySelector(".md\\:flex.space-x-8");
  // const mobileMenuButton = document.querySelector(".md\\:hidden.text-gray-700");
  // if (mobileMenuButton && mobileMenu) {
  //   const openMobileMenu = () => {
  //     mobileMenu.classList.toggle("hidden");
  //     mobileMenu.classList.toggle("flex");
  //     mobileMenu.classList.toggle("flex-col");
  //     mobileMenu.classList.toggle("absolute");
  //     mobileMenu.classList.toggle("top-16");
  //     mobileMenu.classList.toggle("left-0");
  //     mobileMenu.classList.toggle("right-0");
  //     mobileMenu.classList.toggle("bg-white");
  //     mobileMenu.classList.toggle("p-4");
  //     mobileMenu.classList.toggle("shadow-md");
  //     mobileMenu.classList.toggle("space-y-4");
  //     mobileMenu.classList.toggle("space-x-0");
  //   };
  // }
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
          <div className="w-10 h-10 rounded-full bg-primary flex items-center justify-center">
            {/* <FaCode className="text-white text-xl" /> */}
          </div>
          <span className="text-xl font-bold text-primaryDarker">
            CodeMaster
          </span>
        </div>

        <div
          className={isMobileMenuOpen
            ? "flex flex-col absolute top-16 left-0 right-0 bg-white p-4 shadow-md space-y-4 space-x-0"
            : "hidden md:flex space-x-8"}
        >
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Home
          </a>
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Courses
          </a>
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Paths
          </a>
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Community
          </a>
          <a href="#" className="text-gray-700 hover:text-primary font-medium">
            Pricing
          </a>
        </div>

        <div className="flex items-center space-x-4">
          <button className="hidden md:block text-primaryDark font-medium hover:text-primary">
            Login
          </button>
          <button className="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-full font-medium transition duration-300">
            Sign Up Free
          </button>
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
    // <div class="font-sans bg-gray-50">
    //   <nav class="bg-white shadow-md sticky top-0 z-50">
    //     <div class="flex items-center justify-between max-w-7xl mx-auto px-4 py-4">
    //       <div class="flex items-center space-x-2">
    //         <div class="w-10 h-10 rounded-full flex items-center justify-center">
    //           <i class="fas fa-code text-white text-xl"></i>
    //         </div>
    //         <span class="text-xl font-bold text-primaryDarker">CodeMaster</span>
    //       </div>

    //       <div class="hidden md:flex space-x-8">
    //         <a href="#" class="text-gray-700 hover:text-primary font-medium">
    //           Home
    //         </a>
    //         <a href="#" class="text-gray-700 hover:text-primary font-medium">
    //           Courses
    //         </a>
    //         <a href="#" class="text-gray-700 hover:text-primary font-medium">
    //           Paths
    //         </a>
    //         <a href="#" class="text-gray-700 hover:text-primary font-medium">
    //           Community
    //         </a>
    //         <a href="#" class="text-gray-700 hover:text-primary font-medium">
    //           Pricing
    //         </a>
    //       </div>

    //       <div class="flex items-center space-x-4">
    //         <button class="hidden md:block text-primaryDark font-medium hover:text-primary">
    //           Login
    //         </button>
    //         <button class="bg-primary hover:bg-primaryDark text-white px-4 py-2 rounded-full font-medium transition duration-300">
    //           Sign Up Free
    //         </button>
    //         <button class="md:hidden text-gray-700">
    //           <i class="fas fa-bars text-xl"></i>
    //         </button>
    //       </div>
    //     </div>
    //   </nav>
    // </div>
  );
};

export default Navbar;
