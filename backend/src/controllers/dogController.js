const DogModel = require("../models/dogModel");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

// get all dogs
const getAllDogs = async (callback, userToken) => {
  const { team } = jwt.decode(userToken);

  const dogs = await DogModel.find({ team }).sort({ createdAt: -1 });

  callback(dogs);
};

// get single dog
const getDogById = async (received, callback) => {
  const { _id } = received;

  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  const dog = await DogModel.findById(_id);

  callback(dog);
};

// create new dog
const createDog = async (received, callback, io, userToken) => {
  const { team } = jwt.decode(userToken);

  const { name } = received;

  const dog = await DogModel.create({ name, team });

  const allDogs = await DogModel.find({ team });

  callback("create_dog", dog);

  io.to(team).emit("dogs_updated", allDogs);
};

// delete dog
const deleteDogById = async (received, io, userToken) => {
  const { team } = jwt.decode(userToken);

  const { _id } = received;

  // TODO: WS handler for dog not found
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  await DogModel.findOneAndDelete({ _id });

  // TODO: WS handler for dog not found

  const allDogs = await DogModel.find({ team });

  io.to(team).emit("dogs_updated", allDogs);
};

// update dog
const updateDogById = async (received, callback, io, userToken) => {
  const { team } = jwt.decode(userToken);

  const { _id } = received;

  // TODO: WS handler for dog not found
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  const dog = await DogModel.findOneAndUpdate(
    { _id: _id },
    { ...received, team }
  );

  // TODO: WS handler for dog not found
  // if (!dog) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  const allDogs = await DogModel.find({ team });

  callback(dog);
  io.to(team).emit("dogs_updated", allDogs);
};

module.exports = {
  createDog,
  getAllDogs,
  getDogById,
  deleteDogById,
  updateDogById,
};
