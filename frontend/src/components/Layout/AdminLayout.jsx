import { NavLink, Outlet } from "react-router-dom";
import { FaUser, FaHome, FaUtensils } from "react-icons/fa";
import { IoFastFoodSharp } from "react-icons/io5";
import { useAuth } from "../../store/auth";

export const AdminLayout = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <FaUtensils className="text-4xl text-yellow-500 animate-spin" />
      </div>
    );
  }

  if (!user.isAdmin) {
    return <Navigate to="/" />;
  }
  return (
    <>
      {/* Header */}
      <header className="bg-blue-400 shadow-md sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <nav className="flex items-center justify-between">
            <h1 className="text-xl font-bold text-white tracking-wide">
              Admin Panel
            </h1>
            <ul className="flex gap-6 text-white font-medium">
              <li>
                <NavLink
                  to="/admin/users"
                  className={({ isActive }) =>
                    `flex items-center gap-2 hover:text-black transition ${
                      isActive ? "text-black" : ""
                    }`
                  }
                >
                  <FaUser /> Users
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/admin/recipes"
                  className={({ isActive }) =>
                    `flex items-center gap-2 hover:text-black transition ${
                      isActive ? "text-black" : ""
                    }`
                  }
                >
                  <IoFastFoodSharp /> Recipes
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `flex items-center gap-2 hover:text-black transition ${
                      isActive ? "text-black" : ""
                    }`
                  }
                >
                  <FaHome /> Home
                </NavLink>
              </li>
            </ul>
          </nav>
        </div>
      </header>

      {/* Page Content */}
      <main className="bg-gray-50 min-h-screen p-6 sm:p-8">
        <div className="max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </>
  );
};
