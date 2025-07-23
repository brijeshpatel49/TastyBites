const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");


const userSchema = new mongoose.Schema({
  username: { type: String, require: true, unique: true },
  email: { type: String, require: true },
  password: { type: String, require: true }, 
  isAdmin: {
    type: Boolean,
    default: false,
  },
  savedRecipes: [{ type: mongoose.Schema.Types.ObjectId, ref: "Recipes" }],
});

userSchema.pre("save", async function (next) {
  const user = this;

  if (!user.isModified("password")) {
    next();
  }

  try {
    const salRound = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(user.password, salRound);
    user.password = hash;
  } catch (error) {
    next(error);
  }
});

userSchema.methods.comparePassword = async function (password) {
  console.log(this);
  return bcrypt.compare(password, this.password);
};

userSchema.methods.generateToken = async function () {
  try {
    return jwt.sign(
      {
        userId: this._id.toString(),
        email: this.email,
        isAdmin: this.isAdmin,
      },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "30d" }
    );
  } catch (error) {
    console.log(error);
  }
};

const User = mongoose.model("User", userSchema);
module.exports = User;
