const DogModel = require("../models/dogModel");

const mongoose = require("mongoose");

// get all dogs
const getAllDogs = async (req, res) => {
  const dogs = await DogModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(dogs);
};

// get single dog
const getDogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "DOG_NOT_FOUND" });
  }

  const dog = await DogModel.findById(id);

  if (!dog) {
    return res.status(404).json({ error: "DOG_NOT_FOUND" });
  }

  res.status(200).json(dog);
};

// create new dog
const createDog = async (req, res) => {
  const { name } = req.body;

  try {
    const dog = await DogModel.create({ name });

    res.status(200).json(dog);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete dog
const deleteDogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "DOG_NOT_FOUND" });
  }

  const dog = await DogModel.findOneAndDelete({ _id: id });

  if (!dog) {
    return res.status(400).json({ error: "DOG_NOT_FOUND" });
  }

  res.status(200).json(dog);
};

// update dog
const updateDogById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "DOG_NOT_FOUND" });
  }

  const dog = await DogModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!dog) {
    return res.status(404).json({ error: "DOG_NOT_FOUND" });
  }

  res.status(200).json(dog);
};

module.exports = {
  createDog,
  getAllDogs,
  getDogById,
  deleteDogById,
  updateDogById,
};
