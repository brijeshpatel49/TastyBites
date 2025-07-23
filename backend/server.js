const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db.js");
const authRoutes = require("./routes/authRoutes");
const recipesRouter = require("./routes/recipesRoutes");
const adminRouter = require("./routes/adminRouter");
const errorMiddleware = require("./middleware/error-middleware");

dotenv.config();
const app = express();
const PORT = process.env.PORT || 4000;

const allowedOrigins = [
  "http://localhost:5173", // Dev
  "https://tasty-bites-iota.vercel.app", // Your Vercel frontend domain
];

// Middleware
app.use(express.json());
app.use(
  cors({
    origin: allowedOrigins,
    credentials: true, // Needed if you're using cookies or auth headers
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/recipes", recipesRouter);
app.use("/api/admin", adminRouter);
app.use(errorMiddleware);
// Connect to Database
connectDB();

// Start Server
app.listen(PORT, () => {
  // console.log(`Server is running on port: ${PORT}`);
  console.info(`Server is running ...`);
});
