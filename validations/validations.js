import { body } from "express-validator";

export const loginValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must contain minimum 6 symbols").isLength({
    min: 6,
  }),
];

export const registerValidation = [
  body("email", "Invalid email").isEmail(),
  body("password", "Password must contain minimum 6 symbols").isLength({
    min: 6,
  }),
  body("name", "Name must contain minimum 3 words").isLength({ min: 3 }),
  body("avatarUrl").optional().isURL(),
];

export const gridCreateValidation = [
  body("camera", "Invalid camera name").isLength({
    min: 2,
  }),
  body("camera_manufacturer", "Invalid camera manufacturer").isLength({
    min: 2,
  }),
  body("lens_model", "Invalid lens model").isLength({
    min: 2,
  }),
];
