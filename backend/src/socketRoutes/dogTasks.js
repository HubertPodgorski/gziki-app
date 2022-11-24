const {
  createDogTask,
  getAllDogTasks,
  getDogTaskById,
  deleteDogTaskById,
  updateDogTaskById,
} = require("../controllers/dogTaskController");

const routes = (io, socket) => {
  socket.on("get_all_dog_tasks", (callback) => getAllDogTasks(callback));

  socket.on("add_dog_task", (received, callback) =>
    createDogTask(received, callback, io)
  );

  socket.on("get_dog_task", (received, callback) =>
    getDogTaskById(received, callback)
  );

  socket.on("delete_dog_task", (received) => deleteDogTaskById(received, io));

  socket.on("update_dog_task", (received, callback) =>
    updateDogTaskById(received, callback, io)
  );
};

module.exports = routes;
