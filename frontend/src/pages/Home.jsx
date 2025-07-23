import React, { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";
import RecipeCard from "../components/RecipeCard";
import { FaUtensils } from "react-icons/fa";
import { FiSearch } from "react-icons/fi";
import { BiSad } from "react-icons/bi";
import { motion } from "framer-motion";
import { fadeInUp } from "../components/AnimateVarients";

export const Home = () => {
  const { API, token, authorizationToken, isLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [recipes, setRecipes] = useState([]);
  const [savedRecipes, setSavedRecipes] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    // Fetch all recipes

    fetch(`${API}/api/recipes`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((data) => {
        setRecipes(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes!", error);
      });

    // Fetch saved recipes if user is logged in
    if (isLoggedIn) {
      fetch(`${API}/api/recipes/savedRecipes/ids`, {
        headers: {
          Authorization: authorizationToken,
        },
      })
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch saved recipes");
          return res.json();
        })
        .then((data) => {
          setSavedRecipes(data.savedRecipes || []);
        })
        .catch((error) => {
          console.error("Error fetching saved recipes!", error);
        });
    }
  }, [isLoggedIn]);

  //search recipe
  const filteredRecipes = recipes.filter(
    (recipe) =>
      recipe.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      recipe.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  // Function to save a recipe
  const saveRecipe = async (recipeId) => {
    try {
      const response = await fetch(`${API}/api/recipes`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: authorizationToken,
        },
        body: JSON.stringify({ recipeId }),
      });

      if (!response.ok) throw new Error("Failed to save recipe");

      const data = await response.json();
      toast.success("Recipe saved successfully");
      setSavedRecipes((prev) => [...prev, recipeId]);
    } catch (error) {
      console.error("Error saving recipe!", error);
    }
  };

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

      if (!response.ok) throw new Error("Failed to unsave recipe");

      const data = await response.json();
      setSavedRecipes(data.savedRecipes);
      toast.success("Recipe Unsaved successfully");
    } catch (error) {
      console.error("Error unsaving recipe!", error);
    }
  };

  if (recipes.length === 0) {
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
      <section
        className="relative w-full h-[calc(100vh-4rem)] bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/pizza.webp')",
        }}
      >
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,0,0,0.6)_0%,_rgba(0,0,0,0.3)_40%,_transparent_80%)] pointer-events-none" />

        <div className="relative z-10 h-full flex flex-col justify-center items-center text-center text-white px-4">
          <h1 className="text-5xl md:text-6xl font-extrabold drop-shadow-lg mb-4 font-[Poppins]">
            Welcome to <span className="text-yellow-400">Tasty Bites</span>
          </h1>
          <p className="text-lg md:text-xl mb-8 drop-shadow-sm font-light max-w-xl">
            Explore mouth-watering recipes, handpicked for food lovers like you
            🍲
          </p>
          <button
            onClick={() => {
              const section = document.getElementById("recipes-section");
              section?.scrollIntoView({ behavior: "smooth" });
            }}
            className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold px-6 py-3 rounded-md hover:rounded-3xl transition-all duration-300 ease-in-out shadow-md"
          >
            Explore Now
          </button>
        </div>
      </section>

      <div
        id="recipes-section"
        className="px-6 py-8 sm:mx-8 md:mx-12 lg:mx-16 xl:mx-20"
      >
        <div className="flex flex-col md:flex-row justify-between items-center md:items-center mb-10 gap-4">
          <h1 className="text-3xl md:text-4xl font-semibold text-yellow-400 drop-shadow text-left w-full md:w-auto">
            Discover Delicious Recipes
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

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 place-items-center">
          {filteredRecipes.map((recipe) => (
            <motion.div
              key={recipe._id}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              className="w-full h-full flex flex-col"
            >
              <RecipeCard
                key={recipe._id}
                recipe={recipe}
                isLoggedIn={isLoggedIn}
                savedRecipes={savedRecipes}
                onSave={() => saveRecipe(recipe._id)}
                onUnsave={() => unsaveRecipe(recipe._id)}
                onClick={() =>
                  navigate(`/recipe/${recipe._id}`, { state: { recipe } })
                }
              />
            </motion.div>
          ))}
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
    </motion.div>
  );
};
