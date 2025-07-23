const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = async (req, res) => {
  const { username, email, password } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "Email already exists" });
    }

    const userCreated = await User.create({ username, email, password });
    if (userCreated) {
      res.status(201).json({
        msg: "Registation Successful",
        userId: userCreated._id.toString(),
      });
    }
  } catch (error) {
    const status = 400;
    const message = error.message;
    const err = {
      status,
      message,
    };
    next(err);
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const userExist = await User.findOne({ email });

    if (!userExist) {
      return res.status(400).json({ message: "Invalid Credentials" });
    }

    const user = await userExist.comparePassword(password);

    if (user) {
      res.status(200).json({
        msg: "Login Successful",
        token: await userExist.generateToken(),
        userId: userExist._id.toString(),
      });
    } else {
      res.status(401).json({ message: "Invalid Credentials" });
    }
  } catch (error) {
    const status = 400;
    const message = "login failed";
    const extraDetails=error.message;
    const err = {
      status,
      message,
      extraDetails
    };
    next(err);
  }
};

const user = async (req, res) => {
  try {
    const userData = req.user;
    return res.status(200).json({ userData });
  } catch (error) {
    console.error("error from user route", error);
  }
};

module.exports = { register, login, user };
