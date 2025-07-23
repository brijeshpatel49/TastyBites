import { useAuth } from "../store/auth";
import { useEffect, useState } from "react";
import { BiSad } from "react-icons/bi";
import { FaUtensils } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { toast } from "react-toastify";

export const AdminRecipes = () => {
  const [recipes, setRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const { authorizationToken, API } = useAuth();
  const [isLoading, setIsLoading] = useState(true);

  const getAllRecipesData = async () => {
    try {
      const response = await fetch(`${API}/api/admin/recipes`, {
        method: "GET",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();
      setRecipes(data);
      setIsLoading(false);
    } catch (error) {}
  };

  const deleteRecipe = async (id) => {
    try {
      const response = await fetch(`${API}/api/admin/recipes/delete/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: authorizationToken,
        },
      });
      const data = await response.json();

      if (response.ok) {
        getAllRecipesData();
        toast.success("Recipe Deleted Successfully");
      } else {
        toast.error("Failed to delete Recipe");
      }
    } catch (error) {}
  };
  useEffect(() => {
    getAllRecipesData();
  }, []);

  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const confirmDelete = (recipeId) => {
    if (window.confirm("Are you sure you want to delete this recipe?")) {
      deleteRecipe(recipeId);
    }
  };
  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <FaUtensils className="text-5xl text-yellow-500 animate-pulse mb-2" />
        <p className="text-xl text-gray-600">Cooking Your Recipes...</p>
      </div>
    );
  }
  return (
    <div className="px-4 sm:px-6 lg:px-8 py-10 min-h-screen">
      <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 gap-4">
        <h1 className="text-3xl font-bold text-yellow-500 mb-8 drop-shadow">
          All Recipes
        </h1>
        <div className="w-full md:w-1/2 relative">
          <FiSearch className="absolute top-1/2 left-4 transform -translate-y-1/2 text-yellow-400 text-xl" />
          <input
            type="text"
            placeholder="Search recipes..."
            className="w-full pl-12 pr-4 py-2 rounded-2xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-yellow-400 shadow-sm"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
        {recipes.length === 0 ? (
          <div className="col-span-full text-center text-gray-600 text-xl">
            Recipes Not Found
          </div>
        ) : (
          filteredRecipes.map((recipe) => (
            <div
              key={recipe._id}
              className="bg-white shadow-md rounded-xl overflow-hidden hover:shadow-lg transition flex flex-col"
            >
              <img
                src={recipe.imageUrl || "https://via.placeholder.com/300"}
                alt={recipe.name}
                className="w-full h-48 object-cover"
              />

              <div className="p-5 flex-grow flex flex-col">
                <h2 className="text-xl font-semibold mb-2 text-gray-800">
                  {recipe.name}
                </h2>

                <div className="mb-3 text-sm text-gray-600 space-y-1">
                  <p>
                    <strong>Description:</strong> {recipe.description}
                  </p>
                  <p>
                    <strong>Cooking Time:</strong> {recipe.cookingTime} minutes
                  </p>
                </div>

                <div className="text-sm text-gray-700 mb-4">
                  <p>
                    <strong>Posted by:</strong>{" "}
                    {recipe.userOwner?.username || "Unknown"}
                  </p>
                  <p>
                    <strong>Email:</strong>{" "}
                    {recipe.userOwner?.email || "Unknown"}
                  </p>
                </div>

                <div className="mt-auto">
                  <button
                    className="w-full bg-red-500 hover:bg-red-600 text-white py-2 px-4 rounded-md transition"
                    onClick={() => confirmDelete(recipe._id)}
                  >
                    Delete Recipe
                  </button>
                  <a
                    href={`/recipe/${recipe._id}`} // Adjust the URL based on your route
                    className="block text-center text-blue-600 mt-2 hover:underline"
                  >
                    View More
                  </a>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
      {filteredRecipes.length === 0 && (
        <div className="text-center text-gray-500 mt-10 flex flex-col items-center gap-4">
          <BiSad className="text-6xl text-yellow-400" />
          <p className="text-xl">No recipes found.</p>
          <NavLink
            to="/create-recipe"
            className="px-6 py-2 bg-yellow-400 hover:bg-yellow-500 text-white rounded-full shadow-md transition duration-200"
          >
            Create a Recipe
          </NavLink>
        </div>
      )}
    </div>
  );
};
