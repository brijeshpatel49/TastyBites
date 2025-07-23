const { z } = require("zod");

const loginSchema = z.object({
  email: z
    .string({ required_error: "Email is required" })
    .trim()
    .email({ message: "Invalid email format" })
    .min(3, { message: "Username must be at least 3 characters long" })
    .max(255, { message: "Username must be less than 255 characters" }),

  password: z
    .string({ required_error: "password is required" })
    .min(8, { message: "Password must be at least 8 characters" })
    .max(255, { message: "Password must be less than 255 characters" }),
});

const signupSchema = loginSchema.extend({
  username: z
    .string({ required_error: "Username is required" })
    .trim()
    .min(3, { message: "Username must be at least 3 characters" })
    .max(255, { message: "Username must be less than 255 characters" }),
});

module.exports = { signupSchema, loginSchema };
