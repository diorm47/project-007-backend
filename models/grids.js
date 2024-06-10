import mongoose from "mongoose";

const GridSchema = new mongoose.Schema(
  {
    camera: {
      type: String,
      required: true,
    },
    camera_manufacturer: {
      type: String,
      required: true,
    },
    lens_model: {
      type: String,
      required: true,
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    file: {
      type: String,
      required: true,
    },
  },
  { timestamp: true }
);

export default mongoose.model("Grids", GridSchema);
