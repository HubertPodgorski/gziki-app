const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  updateTasksOrder,
} = require("../controllers/taskController");

const router = express.Router();

router.patch("/update-order", updateTasksOrder);

router.get("/", getAllTasks);

router.post("/", createTask);

router.get("/:id", getTaskById);

router.delete("/:id", deleteTaskById);

router.patch("/:id", updateTaskById);

module.exports = router;
