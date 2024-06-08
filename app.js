import express from "express";
import mongoose from "mongoose";
import * as UserController from "./controllers/user-controller.js";
import * as GridsController from "./controllers/grids-controller.js";
import checkAuth from "./utils/check-auth.js";
import {
  registerValidation,
  loginValidation,
  gridCreateValidation,
} from "./validations/validations.js";
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

app.get("/", (req, res) => {
  res.json("Server is working");
});
// Login/registration
app.post("/login", loginValidation, UserController.login);
app.post("/register", registerValidation, UserController.register);
app.get("/me", checkAuth, UserController.me);

// Grids CRUD
app.get("/grids", GridsController.getAll);
app.get("/grids/:id", GridsController.getOne);
app.post("/grids", checkAuth, gridCreateValidation, GridsController.create);
app.delete("/grids/:id", checkAuth, GridsController.remove);
app.patch("/grids/:id", checkAuth, GridsController.update);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
