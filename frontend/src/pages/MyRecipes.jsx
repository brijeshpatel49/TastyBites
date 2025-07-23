import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { motion } from "framer-motion";

import {
  FaEdit,
  FaTrash,
  FaClock,
  FaUtensils,
  FaListUl,
  FaTags,
  FaRegSadTear,
  FaPlus,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

export const MyRecipes = () => {
  const [myRecipes, setMyRecipes] = useState([]);
  const { API, authorizationToken } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/api/recipes/myrecipes`, {
      headers: {
        Authorization: authorizationToken,
      },
    })
      .then((res) => {
        if (!res.ok) {
          throw new Error(`HTTP ${res.status}`);
        }
        return res.json();
      })
      .then((data) => {
        setMyRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching saved recipes:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const deleteRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${API}/api/recipes/delete/${recipeId}`, {
        method: "DELETE",
        headers: {
          authorization: authorizationToken,
        },
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Recipe deleted successfully!");
        setMyRecipes((prevRecipes) =>
          prevRecipes.filter((recipe) => recipe._id !== recipeId)
        );
      } else {
        toast.error(data.message || "Failed to delete recipe");
      }
    } catch (error) {
      console.error("Error unsaving recipe!", error);
    }
  };

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
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="px-6 py-10">
        <h1 className="text-4xl font-bold text-center text-yellow-400 mb-10">
          My Recipes
        </h1>

        {myRecipes.length === 0 ? (
          <>
            <div className="flex flex-col items-center justify-center text-center py-36 px-4 bg-gray-50 rounded-xl shadow-md">
              <FaRegSadTear className="text-6xl text-yellow-400 mb-4 animate-pulse" />
              <h2 className="text-2xl font-semibold text-gray-700 mb-2">
                No Recipes Found
              </h2>
              <p className="text-gray-500 text-md mb-6">
                Looks like you haven't added any recipes yet.
              </p>
              <button
                onClick={() => navigate("/create-recipe")}
                className="flex items-center gap-2 bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md hover:rounded-3xl transition-all duration-300 ease-in-out shadow-md"
              >
                <FaPlus className="text-sm" />
                Create Your First Recipe
              </button>
            </div>
          </>
        ) : (
          <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-3">
            {myRecipes.map((recipe) => (
              <div
                key={recipe._id}
                className="bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-shadow duration-300 ease-in-out overflow-hidden flex flex-col"
              >
                <img
                  src={recipe.imageUrl}
                  alt={recipe.name}
                  className="w-full h-56 object-cover  cursor-pointer"
                  onClick={() => navigate(`/recipe/${recipe._id}`)}
                />
                <div className="p-5 flex flex-col flex-grow">
                  <h2 className="text-xl font-bold text-gray-800 mb-2">
                    {recipe.name}
                  </h2>

                  <div className="text-sm text-gray-600 space-y-1">
                    <p className="flex items-center gap-2">
                      <FaClock className="text-yellow-500" />{" "}
                      {recipe.cookingTime} mins
                    </p>
                    <p className="flex items-center gap-2">
                      <FaListUl className="text-yellow-500" /> Category:{" "}
                      <span className="font-medium">
                        {recipe.category || "N/A"}
                      </span>
                    </p>
                    <p className="flex items-center gap-2">
                      <FaTags className="text-yellow-500" /> Type:{" "}
                      <span className="font-medium">
                        {recipe.type || "N/A"}
                      </span>
                    </p>
                  </div>

                  <p className="mt-3 text-gray-700 line-clamp-3 text-sm">
                    {recipe.description || "No description provided."}
                  </p>

                  <div className="mt-auto flex justify-between items-center gap-4 pt-4">
                    <button
                      onClick={() =>
                        navigate(`/myrecipes/update/${recipe._id}`)
                      }
                      className="cursor-pointer flex items-center gap-2 text-sm bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md transition"
                    >
                      <FaEdit /> Edit
                    </button>
                    <button
                      onClick={() => confirmDelete(recipe._id)}
                      className="cursor-pointer flex items-center gap-2 text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-md transition"
                    >
                      <FaTrash /> Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
