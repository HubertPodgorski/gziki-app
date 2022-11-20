const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  updateEventById,
  toggleEventDog,
  toggleEventUserId,
} = require("../controllers/eventController");

const routes = (io, socket) => {
  socket.on("get_all_events", (callback) => getAllEvents(callback));

  socket.on("add_event", (received, callback) =>
    createEvent(received, callback, io)
  );

  socket.on("get_event", (received, callback) =>
    getEventById(received, callback)
  );

  socket.on("delete_event", (received) => deleteEventById(received, io));

  socket.on("update_event", (received, callback) =>
    updateEventById(received, callback, io)
  );

  socket.on("toggle_event_dog", (received) => toggleEventDog(received, io));

  socket.on("toggle_event_user", (received) => toggleEventUserId(received, io));
};

module.exports = routes;
