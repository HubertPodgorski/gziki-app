const EventModel = require("../models/eventModel");

const mongoose = require("mongoose");

// get all events
const getAllEvents = async (req, res) => {
  const events = await EventModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(events);
};

// get single event
const getEventById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "EVENT_NOT_FOUND" });
  }

  const event = await EventModel.findById(id);

  if (!event) {
    return res.status(404).json({ error: "EVENT_NOT_FOUND" });
  }

  res.status(200).json(event);
};

// create new event
const createEvent = async (req, res) => {
  const { name, date } = req.body;

  try {
    const event = await EventModel.create({ name, date });

    res.status(200).json(event);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete event
const deleteEventById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "EVENT_NOT_FOUND" });
  }

  const event = await EventModel.findOneAndDelete({ _id: id });

  if (!event) {
    return res.status(400).json({ error: "EVENT_NOT_FOUND" });
  }

  res.status(200).json(event);
};

// update event
const updateEventById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "EVENT_NOT_FOUND" });
  }

  const event = await EventModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!event) {
    return res.status(404).json({ error: "EVENT_NOT_FOUND" });
  }

  res.status(200).json(event);
};

module.exports = {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  updateEventById,
};
