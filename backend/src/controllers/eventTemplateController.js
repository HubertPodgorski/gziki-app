const EventTemplateModel = require("../models/eventTemplateModel");
const TaskModel = require("../models/taskModel");

const mongoose = require("mongoose");

// get all event templates
const getAllEventTemplates = async (callback) => {
  const eventTemplates = await EventTemplateModel.find({}).sort({
    createdAt: -1,
  });

  callback(eventTemplates);
};

// get single eventTemplate
const getEventTemplateById = async (received, callback) => {
  const { _id } = received;

  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "EVENT_TEMPLATE_NOT_FOUND" });
  // }

  const eventTemplate = await EventTemplateModel.findById(_id);

  callback(eventTemplate);
};

// create new eventTemplate
const createEventTemplate = async (received, callback, io) => {
  const tasks = await TaskModel.find({});

  const eventTemplate = await EventTemplateModel.create({ ...received, tasks });

  const allEventTemplates = await EventTemplateModel.find({});

  callback("create_event_template", eventTemplate);
  io.emit("event_templates_updated", allEventTemplates);
};

// delete eventTemplate
const deleteEventTemplateById = async (received, io) => {
  const { _id } = received;

  // TODO: WS handler for eventTemplate not found
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "EVENT_TEMPLATE_NOT_FOUND" });
  // }

  await EventTemplateModel.findOneAndDelete({ _id });

  // TODO: WS handler for eventTemplate not found

  const allEventTemplates = await EventTemplateModel.find({});
  io.emit("event_templates_updated", allEventTemplates);
};

// update eventTemplate
const updateEventTemplateById = async (received, callback, io) => {
  const { _id } = received;

  // TODO: WS handler for eventTemplate not found
  // if (!mongoose.Types.ObjectId.isValid(id)) {
  //   return res.status(404).json({ error: "EVENT_TEMPLATE_NOT_FOUND" });
  // }

  const eventTemplate = await EventTemplateModel.findOneAndUpdate(
    { _id: _id },
    { ...received }
  );

  // TODO: WS handler for event template not found
  // if (!eventTemplate) {
  //   return res.status(404).json({ error: "EVENT_TEMPLATE_NOT_FOUND" });
  // }

  const allEventTemplates = await EventTemplateModel.find({});

  callback(eventTemplate);
  io.emit("event_templates_updated", allEventTemplates);
};

module.exports = {
  createEventTemplate,
  getAllEventTemplates,
  getEventTemplateById,
  deleteEventTemplateById,
  updateEventTemplateById,
};
