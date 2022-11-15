const {
  createDog,
  getAllDogs,
  getDogById,
  deleteDogById,
  updateDogById,
} = require("../controllers/dogController");

const routes = (io, socket) => {
  socket.on("get_all_dogs", (callback) => getAllDogs(callback));

  socket.on("add_dog", (received, callback) =>
    createDog(received, callback, io)
  );

  socket.on("get_dog", (received, callback) => getDogById(received, callback));

  socket.on("delete_dog", (received) => deleteDogById(received, io));

  socket.on("update_dog", (received, callback) =>
    updateDogById(received, callback, io)
  );
};

module.exports = routes;
