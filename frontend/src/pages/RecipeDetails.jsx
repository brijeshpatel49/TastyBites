import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { useAuth } from "../store/auth";
import { motion } from "framer-motion";

import {
  FaUserAlt,
  FaClock,
  FaListUl,
  FaInfoCircle,
  FaUtensils,
} from "react-icons/fa";

function RecipeDetails() {
  const { API } = useAuth();
  const { id } = useParams();
  const [recipe, setRecipe] = useState(null);

  useEffect(() => {
    fetch(`${API}/api/recipes/recipe/${id}`)
      .then((res) => {
        if (!res.ok) throw new Error("Failed to fetch recipes");
        return res.json();
      })
      .then((data) => {
        setRecipe(data);
      })
      .catch((error) => {
        console.error("Error fetching recipes!", error);
      });
  }, [id]);

  
  if (!recipe) {
    return (
      <div className="flex justify-center items-center h-64">
        <FaUtensils className="text-4xl text-yellow-500 animate-spin" />
      </div>
    );
  }
  
  const formattedSteps = recipe.instructions.split(/\d+\.\s/).filter(Boolean);
  return (
    <motion.div
      initial={{ opacity: 0, y: 50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="max-w-4xl mx-auto p-6 bg-white rounded-xl shadow-md mt-6 mb-10">
        {/* Image */}
        <img
          src={recipe.imageUrl || "https://via.placeholder.com/600"}
          alt={recipe.name}
          className="w-full h-64 object-cover rounded-lg mb-6 shadow-sm"
        />

        {/* Title */}
        <h1 className="text-4xl font-bold text-gray-800 mb-3">{recipe.name}</h1>

        {/* Author and Cooking Time */}
        <div className="flex flex-wrap items-center text-gray-600 gap-6 mb-6">
          <span className="flex items-center gap-2">
            <FaUserAlt className="text-blue-500" />
            <span className="text-sm">
              {recipe.userOwner?.username || "Unknown"}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <FaClock className="text-yellow-500" />
            <span className="text-sm">{recipe.cookingTime} min</span>
          </span>
        </div>

        <div className="flex flex-wrap items-center text-gray-600 gap-6 mb-6">
          <span className="flex items-center gap-2">
            <FaListUl className="text-pink-500" />
            <span className="text-sm font-medium">
              Category: {recipe.category || "N/A"}
            </span>
          </span>

          <span className="flex items-center gap-2">
            <FaUtensils className="text-orange-500" />
            <span className="text-sm font-medium">
              Type: {recipe.type || "N/A"}
            </span>
          </span>
        </div>

        {/* Description */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FaInfoCircle className="text-green-600" />
            Description
          </h3>
          <p className="text-gray-700">{recipe.description}</p>
        </div>

        {/* Instructions */}
        <div className="mb-4">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-1">
            <FaListUl className="text-purple-600" />
            Instructions
          </h3>
          <ol className="list-decimal ml-6 space-y-2">
            {formattedSteps.map((step, index) => (
              <li key={index} className="text-gray-700">
                {step.trim()}
              </li>
            ))}
          </ol>
        </div>

        {/* Ingredients */}
        <div className="mb-2">
          <h3 className="text-xl font-semibold text-gray-800 flex items-center gap-2 mb-2">
            <FaUtensils className="text-red-500" />
            Ingredients
          </h3>
          <ul className="list-disc list-inside text-gray-700 space-y-1">
            {recipe.ingredients.map((ing, i) => (
              <li key={i}>{ing}</li>
            ))}
          </ul>
        </div>
      </div>
    </motion.div>
  );
}

export default RecipeDetails;
