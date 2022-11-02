const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
} = require("../controllers/taskController");

const TaskModel = require("../models/taskModel");

const router = express.Router();

router.get("/", getAllTasks);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.delete("/:id", deleteTaskById);

router.patch("/:id", updateTaskById);

module.exports = router;
