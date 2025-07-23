import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../store/auth";
import { toast } from "react-toastify";

export const EditRecipe = () => {
  const { API, authorizationToken, user } = useAuth();

  const userID = user._id;
  const navigate = useNavigate();

  const [recipe, setRecipe] = useState({
    name: "",
    description: "",
    ingredients: [],
    instructions: "",
    imageUrl: "",
    cookingTime: 0,
    userOwner: userID,
  });

  const params = useParams();

  const getsingleRecipeData = async (id) => {
    try {
      const response = await fetch(
        `${API}/api/recipes/myrecipes/${params.id}`,
        {
          method: "GET",
          headers: {
            Authorization: authorizationToken,
          },
        }
      );
      const data = await response.json();
      setRecipe(data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getsingleRecipeData();
  }, []);

  const handleChange = (event) => {
    const { name, value } = event.target;
    setRecipe({ ...recipe, [name]: value });
  };

  const handleIngredientChange = (event, index) => {
    const { value } = event.target;
    const newIngredients = [...recipe.ingredients];
    newIngredients[index] = value;
    setRecipe({ ...recipe, ingredients: newIngredients });
  };

  const handleAddIngredient = () => {
    setRecipe({ ...recipe, ingredients: [...recipe.ingredients, ""] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(
        `${API}/api/recipes/myrecipes/update/${params.id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            Authorization: authorizationToken,
          },
          body: JSON.stringify(recipe),
        }
      );
      if (response.ok) {
        toast.success("Updated Successfully");
        navigate("/my-recipe");
      } else {
        toast.error("Not Updated");
      }
    } catch (error) {
      console.error("Failed to Update recipe", error);
      toast.error("Failed to Update recipe");
    }
  };

  return (
    <div className="max-w-2xl mx-auto mt-10 bg-white shadow-lg rounded-xl p-8">
      <h2 className="text-3xl font-bold text-center mb-6 text-yellow-500">
        Edit this Recipe
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="name" className="block text-sm font-semibold">
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={recipe.name}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="description" className="block text-sm font-semibold">
            Description
          </label>
          <textarea
            id="description"
            name="description"
            value={recipe.description}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label className="block text-sm font-semibold">Ingredients</label>
          {recipe.ingredients.map((ingredient, index) => (
            <input
              key={index}
              type="text"
              name="ingredients"
              value={ingredient}
              onChange={(event) => handleIngredientChange(event, index)}
              required
              className="w-full mt-1 mb-2 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
            />
          ))}
          <button
            type="button"
            onClick={handleAddIngredient}
            className="text-sm font-medium text-yellow-600 hover:underline"
          >
            + Add Ingredient
          </button>
        </div>

        <div>
          <label htmlFor="instructions" className="block text-sm font-semibold">
            Instructions
          </label>
          <textarea
            id="instructions"
            name="instructions"
            value={recipe.instructions}
            onChange={handleChange}
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="imageUrl" className="block text-sm font-semibold">
            Image URL
          </label>
          <input
            type="text"
            id="imageUrl"
            name="imageUrl"
            value={recipe.imageUrl}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="cookingTime" className="block text-sm font-semibold">
            Cooking Time (minutes)
          </label>
          <input
            type="number"
            id="cookingTime"
            name="cookingTime"
            value={recipe.cookingTime}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          />
        </div>

        <div>
          <label htmlFor="category" className="block text-sm font-semibold">
            Category
          </label>
          <select
            id="category"
            name="category"
            value={recipe.category}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Category</option>
            <option value="Breakfast">Breakfast</option>
            <option value="Lunch">Lunch</option>
            <option value="Dinner">Dinner</option>
            <option value="Snacks">Snacks</option>
            <option value="Dessert">Dessert</option>
          </select>
        </div>

        <div>
          <label htmlFor="type" className="block text-sm font-semibold">
            Food Type
          </label>
          <select
            id="type"
            name="type"
            value={recipe.type}
            onChange={handleChange}
            required
            className="w-full mt-1 p-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-yellow-400"
          >
            <option value="">Select Food Type</option>
            <option value="South Indian">South Indian</option>
            <option value="North Indian">North Indian</option>
            <option value="North Indian">Indian</option>
            <option value="Chinese">Chinese</option>
            <option value="Italian">Italian</option>
            <option value="Continental">Continental</option>
          </select>
        </div>

        <button
          type="submit"
          className="cursor-pointer w-full mt-4 bg-yellow-500 text-black font-semibold py-2 rounded-md shadow-md hover:bg-yellow-600 transition"
        >
          Update Recipe
        </button>
      </form>
    </div>
  );
};
