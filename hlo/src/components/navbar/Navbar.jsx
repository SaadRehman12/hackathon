import  { useState } from "react";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <nav className="bg-gradient-to-r from-gray-800 via-gray-900 to-black text-white">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <div className="text-2xl font-bold">Dev Infinity</div>

        {/* Hamburger Button */}
        <button
          onClick={() => setIsOpen(!isOpen)}
          className="lg:hidden focus:outline-none"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M4 6h16M4 12h16M4 18h16"
            />
          </svg>
        </button>

        {/* Links */}
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } absolute top-16 left-0 w-full bg-gradient-to-r from-gray-800 via-gray-900 to-black lg:static lg:flex lg:space-x-6 lg:w-auto lg:items-center`}
        >
          <a
            href="#"
            className="block py-2 px-4 text-center hover:bg-gray-700 lg:hover:bg-transparent lg:hover:underline"
          >
            Home
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-center hover:bg-gray-700 lg:hover:bg-transparent lg:hover:underline"
          >
            About
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-center hover:bg-gray-700 lg:hover:bg-transparent lg:hover:underline"
          >
            Services
          </a>
          <a
            href="#"
            className="block py-2 px-4 text-center hover:bg-gray-700 lg:hover:bg-transparent lg:hover:underline"
          >
            Contact
          </a>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
