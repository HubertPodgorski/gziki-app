const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  updateEventById,
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
};

module.exports = routes;
