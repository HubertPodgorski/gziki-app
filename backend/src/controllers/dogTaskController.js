const DogTaskModel = require("../models/dogTaskModel");

const mongoose = require("mongoose");

// get all dogTasks
const getAllDogTasks = async (callback) => {
  const dogTasks = await DogTaskModel.find({}).sort({ createdAt: -1 });

  callback(dogTasks);
};

// get single dog task
const getDogTaskById = async (received, callback) => {
  const { _id } = received;

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    return res.status(404).json({ error: "DOG_TASK_NOT_FOUND" });
  }

  const dogTask = await DogTaskModel.findById(_id);

  callback(dogTask);
};

// create new dog task
const createDogTask = async (received, callback, io) => {
  const { name } = received;

  const dogTask = await DogTaskModel.create({ name });

  const allDogTasks = await DogTaskModel.find({});

  callback("create_dog_task", dogTask);
  io.emit("dog_tasks_updated", allDogTasks);
};

// delete dog task
const deleteDogTaskById = async (received, io) => {
  const { _id } = received;

  // TODO: WS handler for dog not found
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  await DogTaskModel.findOneAndDelete({ _id });

  // TODO: WS handler for dog not found

  const allDogTasks = await DogTaskModel.find({});
  io.emit("dog_tasks_updated", allDogTasks);
};

// update dog
const updateDogTaskById = async (received, callback, io) => {
  const { _id } = received;

  // TODO: WS handler for dog not found
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  const dogTask = await DogTaskModel.findOneAndUpdate(
    { _id: _id },
    { ...received }
  );

  // TODO: WS handler for dog not found
  // if (!dog) {
  //   return res.status(404).json({ error: "DOG_NOT_FOUND" });
  // }

  const allDogTasks = await DogTaskModel.find({});

  callback(dogTask);
  io.emit("dog_tasks_updated", allDogTasks);
};

module.exports = {
  createDogTask,
  getAllDogTasks,
  getDogTaskById,
  deleteDogTaskById,
  updateDogTaskById,
};
