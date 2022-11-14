const PersonModel = require("../models/personModel");

const mongoose = require("mongoose");

// get all people
const getAllPeople = async (callback) => {
  const people = await PersonModel.find({}).sort({ createdAt: -1 });

  callback(people);
};

// get single person
const getPersonById = async (received, callback) => {
  const { _id } = received;

  // TODO: handle that
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  // }

  const person = await PersonModel.findById(_id);

  // TODO: handle that
  // if (!person) {
  //   return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  // }

  callback(person);
};

// create new person
const createPerson = (received, callback, io) => async (req, res) => {
  const { name, dogs } = received;

  const person = await PersonModel.create({ name, dogs });

  const allPeople = await PersonModel.find({});

  callback(person);
  io.emit("people_updated", allPeople);
};

// delete person
const deletePersonById = async (received, io) => {
  const { _id } = received;

  // TODO: handle that
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  // }

  await PersonModel.findOneAndDelete({ _id });

  // TODO: handle that
  // if (!person) {
  //   return res.status(400).json({ error: "PERSON_NOT_FOUND" });
  // }

  const allPeople = await PersonModel.find({});

  io.emit("people_updated", allPeople);
};

// update person
const updatePersonById = async (received, callback, io) => {
  const { _id } = received;

  // TODO: handle that
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  // }

  const person = await PersonModel.findOneAndUpdate({ _id }, { ...received });

  // TODO: handle that
  // if (!person) {
  //   return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  // }

  const allPeople = await PersonModel.find({});

  callback(person);
  io.emit("people_updated", allPeople);
};

module.exports = {
  createPerson,
  getAllPeople,
  getPersonById,
  deletePersonById,
  updatePersonById,
};
