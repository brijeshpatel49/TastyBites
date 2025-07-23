import { NavLink } from "react-router-dom";

export const NotFound = () => {
  return (
    <section className="flex items-center justify-center min-h-[calc(100vh-4rem)] bg-white px-6 text-center">
      <div className="max-w-lg">
        <h1 className="text-9xl font-extrabold text-indigo-600 mb-4">404</h1>
        <h2 className="text-2xl md:text-3xl font-semibold text-gray-800 mb-2">
          Oops! Page not found.
        </h2>
        <p className="text-gray-600 mb-6">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <NavLink
          to="/"
          className="inline-block px-6 py-3 bg-indigo-600 text-white rounded-md text-sm font-medium hover:rounded-3xl transition-all duration-500 ease-in-out shadow-md"
        >
          Return Home
        </NavLink>
      </div>
    </section>
  );
};
