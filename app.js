import express from "express";
import mongoose from "mongoose";
import multer from "multer";
import * as GridsController from "./controllers/grids-controller.js";
import * as UserController from "./controllers/user-controller.js";
import checkAuth from "./utils/check-auth.js";
import cors from "cors";
import handleValidationError from "./utils/handleValidationError.js";
import {
  gridCreateValidation,
  loginValidation,
  registerValidation,
} from "./validations/validations.js";

const PORT = process.env.PORT || 3001;

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
app.use(cors());
app.use("/uploads", express.static("uploads"));

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads");
  },
  filename: (req, file, cb) => {
    cb(null, file.originalname);
  },
});

const upload = multer({ storage });

app.post("/upload", checkAuth, upload.single("image"), (req, res) => {
  res.json({
    url: `/uploads/${req.file.originalname}`,
  });
});

app.get("/", (req, res) => {
  res.json("Server is working");
});
// Login/registration
app.post(
  "/login",
  loginValidation,
  handleValidationError,
  UserController.login
);
app.post(
  "/register",
  registerValidation,
  handleValidationError,
  UserController.register
);
app.get("/me", checkAuth, UserController.me);

// Grids CRUD
app.get("/grids", GridsController.getAll);
app.get("/grids/:id", GridsController.getOne);
app.post(
  "/grids",
  checkAuth,
  gridCreateValidation,
  handleValidationError,
  GridsController.create
);
app.delete("/grids/:id", checkAuth, GridsController.remove);
app.patch(
  "/grids/:id",
  checkAuth,
  gridCreateValidation,
  handleValidationError,
  GridsController.update
);

app.listen(PORT, (err) => {
  if (err) {
    return console.log(err);
  }
  console.log("Server ok");
});
