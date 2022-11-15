const {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
} = require("../controllers/userController");

const routes = (io, socket) => {
  socket.on("get_all_users", (callback) => getAllUsers(callback));

  socket.on("add_user", (received, callback) =>
    createUser(received, callback, io)
  );

  socket.on("get_user", (received, callback) =>
    getUserById(received, callback)
  );

  socket.on("delete_user", (received) => deleteUserById(received, io));

  socket.on("update_user", (received, callback) =>
    updateUserById(received, callback, io)
  );
};

module.exports = routes;
