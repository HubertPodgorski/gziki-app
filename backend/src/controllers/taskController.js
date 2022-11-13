const TaskModel = require("../models/taskModel");

const mongoose = require("mongoose");

// get all tasks
const getAllTasks = async (req, res) => {
  const tasks = await TaskModel.find({}).sort({ createdAt: -1 });

  res.status(200).json(tasks);
};

// get single task
const getTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "TASK_NOT_FOUND" });
  }

  const task = await TaskModel.findById(id);

  if (!task) {
    return res.status(404).json({ error: "TASK_NOT_FOUND" });
  }

  res.status(200).json(task);
};

// create new task
const createTask = async (req, res) => {
  const { dogs, description, position } = req.body;

  try {
    const task = await TaskModel.create({ dogs, description, position });

    res.status(200).json(task);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete task
const deleteTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "TASK_NOT_FOUND" });
  }

  const task = await TaskModel.findOneAndDelete({ _id: id });

  if (!task) {
    return res.status(400).json({ error: "TASK_NOT_FOUND" });
  }

  res.status(200).json(task);
};

// update task
const updateTaskById = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "TASK_NOT_FOUND" });
  }

  const task = await TaskModel.findOneAndUpdate({ _id: id }, { ...req.body });

  if (!task) {
    return res.status(404).json({ error: "TASK_NOT_FOUND" });
  }

  res.status(200).json(task);
};

// update tasks order // body = {tasks: [{_id: xx, position: {...}}, {_id: xx2, position: {...}}]}
const updateTasksOrder = async (req, res) => {
  console.log("req.body => ", req.body);
  console.log("req.body.tasks => ", req.body.tasks);
  if (!req.body.tasks || !req.body.tasks.length) {
    return res.status(400).json({ error: "TASK_LIST_CANNOT_BE_EMPTY" });
  }

  let updatedTasks = [];

  for (const task of req.body.tasks) {
    const updatedTask = await TaskModel.findOneAndUpdate(
      { _id: task._id },
      { ...task }
    );

    if (updatedTask) {
      updatedTasks = [...updatedTasks, updatedTask];
    }
  }

  res.status(200).json(updatedTasks);
};

module.exports = {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  updateTasksOrder,
};
