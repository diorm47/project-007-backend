import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import UserModel from "../models/users.js";

export const register = async (req, res) => {
  try {
    const password = req.body.password;
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);

    const doc = new UserModel({
      email: req.body.email,
      name: req.body.name,
      passwordHash: hash,
      website: req.body.website,
      portfolio: req.body.portfolio,
      about_me: req.body.about_me,
    });

    const user = await doc.save();

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "oblivion",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to register",
    });
  }
};

export const login = async (req, res) => {
  try {
    const user = await UserModel.findOne({ email: req.body.email });

    if (!user) {
      return res.status(404).json({
        message: "User not found!",
      });
    }

    const isValidPass = await bcrypt.compare(
      req.body.password,
      user._doc.passwordHash
    );

    if (!isValidPass) {
      return res.status(400).json({
        message: "Incorrect login or password!",
      });
    }

    const token = jwt.sign(
      {
        _id: user._id,
      },
      "oblivion",
      {
        expiresIn: "30d",
      }
    );
    const { passwordHash, ...userData } = user._doc;

    res.json({
      ...userData,
      token,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to authorize",
    });
  }
};

export const me = async (req, res) => {
  try {
    const user = await UserModel.findById(req.userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, __v, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Not authorized!",
    });
  }
};

export const updateProfile = async (req, res) => {
  try {
    const userId = req.userId; // Предполагается, что id пользователя передается в запросе или через аутентификацию

    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }

    if (req.body.name) {
      user.name = req.body.name;
    }
    if (req.body.email) {
      user.email = req.body.email;
    }
    if (req.body.website) {
      user.website = req.body.website;
    }
    if (req.body.portfolio) {
      user.portfolio = req.body.portfolio;
    }
    if (req.body.about_me) {
      user.about_me = req.body.about_me;
    }
    if (req.body.avatarUrl) {
      user.avatarUrl = req.body.avatarUrl;
    }
    if (req.body.facebook) {
      user.facebook = req.body.facebook;
    }
    if (req.body.twitter) {
      user.twitter = req.body.twitter;
    }
    if (req.body.whatsapp) {
      user.whatsapp = req.body.whatsapp;
    }
    if (req.body.messenger) {
      user.messenger = req.body.messenger;
    }
    if (req.body.linkedin) {
      user.linkedin = req.body.linkedin;
    }
    if (req.body.telegram) {
      user.telegram = req.body.telegram;
    }

    // Сохранить обновленный профиль
    const updatedUser = await user.save();

    // Вернуть обновленные данные профиля без хеша пароля
    const { passwordHash, ...userData } = updatedUser._doc;
    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Failed to update profile",
    });
  }
};

export const getUsers = async (req, res) => {
  try {
    const users = await UserModel.find();
    if (!users) {
      return res.status(404).json({
        message: "Users not found",
      });
    }

    const usersData = users.map((user) => {
      const { passwordHash, __v, ...userData } = user._doc;
      return userData;
    });

    res.json(usersData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error!",
    });
  }
};

export const getUserById = async (req, res) => {
  try {
    const userId = req.params.id;
    const user = await UserModel.findById(userId);
    if (!user) {
      return res.status(404).json({
        message: "User not found",
      });
    }
    const { passwordHash, __v, ...userData } = user._doc;

    res.json(userData);
  } catch (err) {
    console.log(err);
    res.status(500).json({
      error: "Error!",
    });
  }
};
