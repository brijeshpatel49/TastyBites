const Recipe = require("../models/Recipes");
const User = require("../models/User");

const createRecipe = async (req, res) => {
  try {
    const {
      name,
      description,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      category,
      type,
    } = req.body;

    const recipeCreated = await Recipe.create({
      name,
      description,
      ingredients,
      instructions,
      imageUrl,
      cookingTime,
      category,
      type,
      userOwner: req.user.id,
    });
    if (recipeCreated) {
      res.status(201).json(recipeCreated);
    }
  } catch (err) {
    res
      .status(500)
      .json({ message: "Failed to Create recipe", error: err.message });
  }
};

const fetchAll = async (req, res) => {
  try {
    const recipes = await Recipe.find().populate("userOwner", "username");
    res.status(200).json(recipes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching recipes", error: err.message });
  }
};

const getSingleRecipe = async (req, res) => {
  try {
    const recipe = await Recipe.findById(req.params.id).populate(
      "userOwner",
      "username"
    );
    res.json(recipe);
  } catch (err) {
    res.status(500).json({ error: "Recipe not found" });
  }
};

const saveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;

    const user = await User.findById(userId);
    if (!user) return res.status(404).json({ message: "User not found" });

    if (!user.savedRecipes.includes(recipeId)) {
      user.savedRecipes.push(recipeId);
      await user.save();
    }

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error saving recipe", error: err.message });
  }
};

const getSavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    res.json({ savedRecipes: user.savedRecipes || [] });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching saved recipes", error: err.message });
  }
};

const getAllsavedRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const savedRecipes = await Recipe.find({
      _id: { $in: user.savedRecipes },
    }).populate("userOwner", "username");
    res.json(savedRecipes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching saved recipes", error: err.message });
  }
};

const unsaveRecipe = async (req, res) => {
  try {
    const { recipeId } = req.body;
    const userId = req.user.id;

    console.log(` User ${userId} is unsaving recipe ${recipeId}`);

    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    user.savedRecipes = user.savedRecipes.filter(
      (id) => id.toString() !== recipeId
    );
    await user.save();

    res.json({ savedRecipes: user.savedRecipes });
  } catch (err) {
    console.error(" Error unsaving recipe:", err);
    res
      .status(500)
      .json({ message: "Error unsaving recipe", error: err.message });
  }
};

const myRecipes = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    const myRecipes = await Recipe.find({ userOwner: req.user.id }).populate(
      "userOwner",
      "username"
    );
    res.json(myRecipes);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error fetching my recipes", error: err.message });
  }
};
const deleteRecipe = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;

    const recipe = await Recipe.findById(recipeId);

    if (!recipe) {
      return res.status(404).json({ message: "Recipe not found" });
    }

    if (recipe.userOwner.toString() == userId) {
      await Recipe.findByIdAndDelete(recipeId);
      return res.status(200).json({ message: "Recipe deleted successfully" });
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to delete this recipe" });
    }
  } catch (error) {
    console.error("error while deleting recipe", error);
    return res.status(500).json({
      message: "Failed to delete recipe",
      error: err.message,
    });
  }
};

const getRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;

    const recipe = await Recipe.findById(recipeId);

    if (recipe.userOwner.toString() == userId) {
      return res.status(200).json(recipe);
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to Update this recipe" });
    }
  } catch (error) {
    console.error("Error While getting recipe by id ", error);
  }
};
const updateRecipeById = async (req, res) => {
  try {
    const recipeId = req.params.id;
    const userId = req.user.id;
    const updatedRecipe = req.body;

    const recipe = await Recipe.findById(recipeId);
    if (recipe.userOwner.toString() == userId) {
      const updatedData = await Recipe.updateOne(
        { _id: recipeId },
        { $set: updatedRecipe }
      );
      return res.status(200).json(updatedData);
    } else {
      return res
        .status(403)
        .json({ message: "You are not authorized to Update this recipe" });
    }
  } catch (error) {
    console.error("error while updating recipe".error);
  }
};
module.exports = {
  createRecipe,
  fetchAll,
  getSingleRecipe,
  saveRecipe,
  getSavedRecipes,
  getAllsavedRecipes,
  unsaveRecipe,
  myRecipes,
  deleteRecipe,
  getRecipeById,
  updateRecipeById,
};
