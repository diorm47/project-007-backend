import { body } from "express-validator";

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must contain minimum 6 symbols").isLength({
    min: 6,
  }),
  body("name", "Name must contain minimum 3 words").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];
