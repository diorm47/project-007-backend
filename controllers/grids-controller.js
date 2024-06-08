import GridsModel from "../models/grids.js";

export const getAll = async (req, res) => {
  try {
    const grids = await GridsModel.find().populate("user").exec();
    res.json(grids);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Error while getting grids!",
    });
  }
};
export const getOne = async (req, res) => {
  try {
    const gridId = req.params.id;
    const doc = await GridsModel.findById(gridId).populate("user");

    if (!doc) {
      return res.status(404).json({
        message: "Grid not found!",
      });
    }

    res.json(doc);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Error while getting grid!",
    });
  }
};
export const create = async (req, res) => {
  try {
    const doc = new GridsModel({
      camera: req.body.camera,
      camera_manufacturer: req.body.camera_manufacturer,
      lens_model: req.body.lens_model,
      user: req.userId,
    });

    const grid = await doc.save();
    res.json(grid);
  } catch (err) {
    console.log(err);
    res.status(400).json({
      error: "Error while saving grid!",
    });
  }
};
export const remove = async (req, res) => {
  try {
    const gridId = req.params.id;
    const doc = await GridsModel.findByIdAndDelete(gridId);

    if (!doc) {
      return res.status(404).json({
        message: "Grid not found!",
      });
    }

    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Error while removing grid!",
    });
  }
};
export const update = async (req, res) => {
  try {
    const gridId = req.params.id;

    await GridsModel.updateOne(
      {
        _id: gridId,
      },
      {
        camera: req.body.camera,
        camera_manufacturer: req.body.camera_manufacturer,
        lens_model: req.body.lens_model,
        user: req.userId,
      }
    );
    res.json({
      success: true,
    });
  } catch (err) {
    console.error(err);
    res.status(400).json({
      error: "Error while updating grid!",
    });
  }
};
