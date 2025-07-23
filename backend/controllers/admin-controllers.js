const User = require("../models/User");
const Recipe = require("../models/Recipes");

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find().select("username email");
    const usersWithRecipeCount = await Promise.all(
      users.map(async (user) => {
        const recipeCount = await Recipe.countDocuments({
          userOwner: user._id,
        });
        return {
          _id: user._id,
          username: user.username,
          email: user.email,
          recipeCount,
        };
      })
    );
    if (!users || users.length === 0) {
      return res.status(404).json({ message: "No Users found" });
    }
    return res.status(200).json(usersWithRecipeCount);
  } catch (error) {
    console.error(error);
  }
};

// user delete logic
const deleteUserById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await User.deleteOne({ _id: id });
    return res.status(200).json({ message: "User Deleted Successfully" });
  } catch (error) {
    next(error);
  }
};

const getAllRecipes = async (req, res) => {
  try {
    const recipe = await Recipe.find().populate("userOwner", "username email");
    if (!recipe || recipe.length === 0) {
      return res.status(404).json({ message: "No Contacts found" });
    }
    return res.status(200).json(recipe);
  } catch (error) {
    console.error(error);
  }
};

// Recipe delete logic
const deleteRecipesById = async (req, res) => {
  try {
    const id = req.params.id;
    const response = await Recipe.deleteOne({ _id: id });
    return res.status(200).json(response);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getAllUsers,
  deleteUserById,
  getAllRecipes,
  deleteRecipesById,
};
