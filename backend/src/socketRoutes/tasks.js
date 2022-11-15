const {
  createTask,
  getAllTasks,
  getTaskById,
  deleteTaskById,
  updateTaskById,
  updateTasksOrder,
} = require("../controllers/taskController");

const routes = (io, socket) => {
  socket.on("get_all_tasks", (callback) => getAllTasks(callback));

  socket.on("add_task", (received, callback) =>
    createTask(received, callback, io)
  );

  socket.on("get_task", (received, callback) =>
    getTaskById(received, callback)
  );

  socket.on("delete_task", (received) => deleteTaskById(received, io));

  socket.on("update_task", (received, callback) => {
    return updateTaskById(received, callback, io);
  });

  socket.on("update_tasks_order", (received) => updateTasksOrder(received, io));
};

module.exports = routes;
