import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    passwordHash: {
      type: String,
      required: true,
    },
    avatarUrl: String,
    website: {
      type: String,
      required: false,
    },
    portfolio: {
      type: String,
      required: false,
    },
    about_me: {
      type: String,
      required: false,
    },

    facebook: {
      type: String,
      required: false,
    },
    twitter: {
      type: String,
      required: false,
    },
    whatsapp: {
      type: String,
      required: false,
    },
    telegram: {
      type: String,
      required: false,
    },
    messenger: {
      type: String,
      required: false,
    },
    linkedin: {
      type: String,
      required: false,
    },
  },
  { timestamp: true }
);

export default mongoose.model("User", UserSchema);
