const express = require("express");
const adminController = require("../controllers/admin-controllers");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");

const router = express.Router();

router
  .route("/users")
  .get(authMiddleware, adminMiddleware, adminController.getAllUsers);

router
  .route("/users/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteUserById);

router
  .route("/recipes")
  .get(authMiddleware, adminMiddleware, adminController.getAllRecipes);

router
  .route("/recipes/delete/:id")
  .delete(authMiddleware, adminMiddleware, adminController.deleteRecipesById);

module.exports = router;
