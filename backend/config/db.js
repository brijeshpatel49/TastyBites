const mongoose = require("mongoose");
const dotenv = require("dotenv");
dotenv.config();
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        });
        console.info("Database connected successfully");
    } catch (err) {
        console.error("Database connection failed", err);
        process.exit(1); 
    }
};

module.exports = connectDB;
