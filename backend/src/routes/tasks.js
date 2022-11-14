const express = require("express");

const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  updateTasksOrder,
} = require("../controllers/taskController");

const outerRouter = (io, socket) => {
  const router = express.Router();

  router.patch("/update-order", updateTasksOrder(io, socket));

  router.get("/", getAllTasks);

  router.post("/", createTask(io, socket));

  router.get("/:id", getTaskById);

  router.delete("/:id", deleteTaskById(io, socket));

  router.patch("/:id", updateTaskById(io, socket));

  return router;
};

module.exports = outerRouter;
