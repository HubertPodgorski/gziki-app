const socketIo = require("socket.io");
let io = null;

module.exports = {
  io: () => io,
  initialize: (server) => {
    return (io = socketIo(server));
  },
};
