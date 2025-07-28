import { Dispatch, StateUpdater, useState } from "preact/hooks";
import CartItems from "../cart/index.tsx";

const Cart = (
  showSidebar: boolean,
  setShowSidebar: Dispatch<StateUpdater<boolean>>
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
        <span className="badge badge-sm indicator-item">8</span>
      </div>
    </div>

    {/* <div
      tabIndex={0}
      className="card card-compact dropdown-content bg-base-100 z-1 mt-3 w-52 shadow"
    >
      <div className="card-body">
        <span className="text-lg font-bold">8 Items</span>
        <span className="text-info">Subtotal: $999</span>
        <div className="card-actions">
          <button className="btn btn-primary btn-block">View cart</button>
        </div>
      </div>
    </div> */}
  </div>
);

const Navbar = () => {
  const [showSidebar, setShowSidebar] = useState(false);

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
    <>
      <div className="navbar bg-base-100 justify-between shadow-sm border-gray-600 border-b">
        <div style={sideBarsStyles}>
          <p class="p-4 border-b border-gray-600 w-screen mb-3">Cart(1)</p>
          <div>
            <CartItems />
          </div>
        </div>
        <div className="flex items-center ">
          <a href="/" className="btn btn-ghost text-xl">
            Ecommerce example
          </a>
          <div>
            <a href="/products" className="ml-6 mt-4">
              Products
            </a>
          </div>
        </div>

        <div className="flex-none">
          {Cart(showSidebar, setShowSidebar)}
          {/* <div className="dropdown dropdown-end">
          <div
            tabIndex={0}
            role="button"
            className="btn btn-ghost btn-circle avatar"
          >
            <div className="w-10 rounded-full">
              <img
                alt="Tailwind CSS Navbar component"
                src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
              />
            </div>
          </div>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content bg-base-100 rounded-box z-1 mt-3 w-52 p-2 shadow"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div> */}
        </div>
      </div>
      {showSidebar && (
        <div
          onClick={() => setShowSidebar(false)}
          class="fixed inset-0 bg-black opacity-20  z-50"
        ></div>
      )}
    </>
  );
};

export default Navbar;
