const express = require("express");
const mongoose = require("mongoose");
const { RecipesModel } = require("../models/Recipes.js");
const { User } = require("../models/User.js");
const authMiddleware = require("../middleware/auth-middleware.js");
const recipesController = require("../controllers/recipeControllers.js");

const router = express.Router();

// Route: Create a New Recipe
router.post("/create", authMiddleware, recipesController.createRecipe);

// Route: Fetch All Recipes
router.get("/", recipesController.fetchAll);

//single recipe
router.get("/recipe/:id", recipesController.getSingleRecipe);

// Route: Save a Recipe for a User
router.put("/", authMiddleware, recipesController.saveRecipe);

// Route: Get Saved Recipe IDs for a User
router.get(
  "/savedRecipes/ids",
  authMiddleware,
  recipesController.getSavedRecipes
);

// Route: Get Full Saved Recipes
router.get(
  "/savedRecipes",
  authMiddleware,
  recipesController.getAllsavedRecipes
);

router.put("/unsave", authMiddleware, recipesController.unsaveRecipe);

router.get("/myrecipes", authMiddleware, recipesController.myRecipes);
router.delete("/delete/:id", authMiddleware, recipesController.deleteRecipe);

router.get("/myrecipes/:id", authMiddleware, recipesController.getRecipeById);
router.patch(
  "/myrecipes/update/:id",
  authMiddleware,
  recipesController.updateRecipeById
);
module.exports = router;
