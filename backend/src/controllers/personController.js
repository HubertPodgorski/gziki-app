const PersonModel = require("../models/personModel");

const mongoose = require("mongoose");

// get all people
const getAllPeople = async (req, res) => {
  const people = await PersonModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(people);
};

// get single person
const getPersonById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  }

  const person = await PersonModel.findById(id);

  if (!person) {
    return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  }

  res.status(200).json(person);
};

// create new person
const createPerson = async (req, res) => {
  const { name, dogs } = req.body;

  try {
    const person = await PersonModel.create({ name, dogs });

    res.status(200).json(person);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete person
const deletePersonById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  }

  const person = await PersonModel.findOneAndDelete({ _id: id });

  if (!person) {
    return res.status(400).json({ error: "PERSON_NOT_FOUND" });
  }

  res.status(200).json(person);
};

// update person
const updatePersonById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  }

  const person = await PersonModel.findOneAndUpdate(
    { _id: id },
    { ...req.body }
  );

  if (!person) {
    return res.status(404).json({ error: "PERSON_NOT_FOUND" });
  }

  res.status(200).json(person);
};

module.exports = {
  createPerson,
  getAllPeople,
  getPersonById,
  deletePersonById,
  updatePersonById,
};
