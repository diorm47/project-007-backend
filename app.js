import express from "express";
import mongoose from "mongoose";
import * as UserController from "./controllers/user-controller.js";
import checkAuth from "./utils/check-auth.js";
import { registerValidation } from "./validations/auth.js";
const PORT = 3001;

mongoose
  .connect(
    "mongodb+srv://oblivion:acdc2004@cluster0.gp6ufjo.mongodb.net/matchmove"
  )
  .then(() => {
    console.log("db ok");
  })
  .catch((err) => console.log("db error", err));

const app = express();
app.use(express.json());

app.post("/login", UserController.login);
app.post("/register", registerValidation, UserController.register);
app.get("/me", checkAuth, UserController.me);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }

  console.log("Server ok");
});
