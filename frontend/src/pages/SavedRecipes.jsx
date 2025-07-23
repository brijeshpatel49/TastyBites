import React, { useState, useEffect } from "react";
import { useAuth } from "../store/auth";
import { FaRegBookmark, FaUtensils } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import RecipeCard from "../components/RecipeCard";
import { toast } from "react-toastify";
import { motion } from "framer-motion";

export const SavedRecipes = () => {
  const navigate = useNavigate();
  const [savedRecipes, setSavedRecipes] = useState([]);
  const { API, authorizationToken, isLoggedIn } = useAuth();
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    fetch(`${API}/api/recipes/savedRecipes`, {
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
        setSavedRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching saved recipes:", error);
      })
      .finally(() => setIsLoading(false));
  }, []);

  const unsaveRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${API}/api/recipes/unsave`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          authorization: authorizationToken,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (!response.ok) {
        throw new Error(`Failed to unsave recipe: HTTP ${response.status}`);
      }

      const data = await response.json();
      toast.success("Recipe unsaved successfully");

      setSavedRecipes((prevRecipes) =>
        prevRecipes.filter((recipe) => recipe._id !== recipeId)
      );
    } catch (error) {
      console.error("Error unsaving recipe!", error);
    }
  };

  if (isLoading) {
    return (
      <div className="flex flex-col justify-center items-center h-[70vh]">
        <FaUtensils className="text-5xl text-yellow-500 animate-pulse mb-2" />
        <p className="text-xl text-gray-600">Cooking something delicious...</p>
      </div>
    );
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div id="recipes-section" className="px-6 py-8 mx-15">
        <h1 className="text-4xl font-bold mb-10 text-center text-yellow-400">
          Saved Recipes
        </h1>

        {savedRecipes.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-12 text-center text-gray-600">
            <FaRegBookmark className="text-5xl text-yellow-400 mb-4 drop-shadow-md" />
            <h2 className="text-xl font-semibold mb-2">No Saved Recipes</h2>
            <p className="text-sm mb-4">
              You haven't saved any recipes yet. Start exploring and save your
              favorites!
            </p>
            <button
              onClick={() => navigate("/")}
              className="bg-yellow-400 hover:bg-yellow-450 text-black font-semibold px-6 py-3 rounded-md hover:rounded-3xl transition-all duration-300 ease-in-out shadow-md"
            >
              Explore Now
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center w-full h-full">
            {savedRecipes.map((recipe) => (
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                isLoggedIn={isLoggedIn}
                savedRecipes={savedRecipes.map((r) => r._id)}
                onUnsave={() => unsaveRecipe(recipe._id)}
                onClick={() =>
                  navigate(`/recipe/${recipe._id}`, { state: { recipe } })
                }
              />
            ))}
          </div>
        )}
      </div>
    </motion.div>
  );
};
