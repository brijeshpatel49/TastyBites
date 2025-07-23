import React, { useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import { FaBars, FaTimes } from "react-icons/fa";

function Navbar() {
  const navigate = useNavigate();
  const { isLoggedIn } = useAuth();
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen(!menuOpen);

  const handleProtectedNavigation = (e, path) => {
    if (!isLoggedIn) {
      e.preventDefault();
      toast.error("You must register first to access this page!");
      navigate("/register");
    }
  };
  const linkClasses =
    "relative text-gray-700 font-medium transition-colors duration-300 hover:text-indigo-600 after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-0 after:bg-indigo-600 after:transition-all after:duration-300 hover:after:w-full";
  const activeLink =
    "relative text-indigo-600 font-semibold after:absolute after:left-0 after:-bottom-1 after:h-[2px] after:w-full after:bg-indigo-600 after:transition-all after:duration-300";

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <div className="container mx-auto flex justify-between items-center py-4 px-6">
        <NavLink
          to="/"
          className="text-2xl font-extrabold text-indigo-600 tracking-tight"
        >
          Tasty<span className="text-yellow-500">Bites</span>
        </NavLink>

        {/* Hamburger Icon for Mobile */}
        <div className="md:hidden text-2xl cursor-pointer" onClick={toggleMenu}>
          {menuOpen ? <FaTimes /> : <FaBars />}
        </div>

        {/* Desktop Nav */}
        <nav className="hidden md:flex">
          <ul className="flex items-center space-x-6">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-recipe"
                onClick={(e) => handleProtectedNavigation(e, "/create-recipe")}
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
              >
                Create Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-recipes"
                onClick={(e) => handleProtectedNavigation(e, "/saved-recipes")}
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
              >
                Saved Recipes
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/my-recipe"
                onClick={(e) => handleProtectedNavigation(e, "/my-recipe")}
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
              >
                My Recipes
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink
                  to="/logout"
                  className="relative text-red-500 font-medium px-2 py-1 transition duration-300 
             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
             hover:after:w-full after:bg-red-500 after:transition-all after:duration-300"
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `font-semibold relative pb-1 transition-all duration-300 ${
                      isActive
                        ? 'text-yellow-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-600'
                        : 'text-yellow-500 hover:text-yellow-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-500 hover:after:w-full after:transition-all after:duration-300'
                    }`
                  }
                >
                  Register
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      </div>

      {/* Mobile Dropdown Nav */}
      {menuOpen && (
        <nav className="md:hidden absolute top-20 right-4 w-56 bg-white rounded-lg shadow-lg border border-gray-200 z-50">
          <ul className="flex flex-col items-start px-4 py-4 gap-3 text-gray-800">
            <li>
              <NavLink
                to="/"
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
                onClick={toggleMenu}
              >
                Home
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/create-recipe"
                onClick={(e) => {
                  toggleMenu();
                  handleProtectedNavigation(e, "/create-recipe");
                }}
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
              >
                Create Recipe
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/saved-recipes"
                onClick={(e) => {
                  toggleMenu();
                  handleProtectedNavigation(e, "/saved-recipes");
                }}
                className={({ isActive }) =>
                  isActive ? activeLink : linkClasses
                }
              >
                Saved Recipes
              </NavLink>
            </li>
            <li>
              {isLoggedIn ? (
                <NavLink
                  to="/logout"
                  className="relative text-red-500 font-medium py-1 transition duration-300 
             after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 
             hover:after:w-full after:bg-red-500 after:transition-all after:duration-300"
                  onClick={toggleMenu}
                >
                  Logout
                </NavLink>
              ) : (
                <NavLink
                  to="/register"
                  className={({ isActive }) =>
                    `font-semibold relative pb-1 transition-all duration-300 ${
                      isActive
                        ? 'text-yellow-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-yellow-600'
                        : 'text-yellow-500 hover:text-yellow-600 after:content-[""] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-0 after:bg-yellow-500 hover:after:w-full after:transition-all after:duration-300'
                    }`
                  }
                  onClick={toggleMenu}
                >
                  Register
                </NavLink>
              )}
            </li>
          </ul>
        </nav>
      )}
    </header>
  );
}

export default Navbar;
