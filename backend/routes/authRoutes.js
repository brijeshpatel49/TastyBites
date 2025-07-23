const express = require("express");
const authController = require("../controllers/authControllers.js");
const authMiddleware = require("../middleware/auth-middleware.js");
const validate=require("../middleware/validate-middleware");
const { loginSchema, signupSchema } = require("../validators/auth-validator.js");
const router = express.Router();

// Register Route
router.route("/register").post(validate(signupSchema),authController.register);

// Login Route
router.route("/login").post(validate(loginSchema),authController.login);

router.route("/user").get(authMiddleware,authController.user);

module.exports = router;
