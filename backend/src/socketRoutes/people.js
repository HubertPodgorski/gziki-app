const express = require("express");

const {
  createPerson,
  getAllPeople,
  getPersonById,
  deletePersonById,
  updatePersonById,
} = require("../controllers/personController");

const routes = (io, socket) => {
  socket.on("get_all_people", (callback) => getAllPeople(callback));

  socket.on("add_person", (received, callback) =>
    createPerson(received, callback, io)
  );

  socket.on("get_person", (received, callback) =>
    getPersonById(received, callback)
  );

  socket.on("delete_person", (received) => deletePersonById(received, io));

  socket.on("update_person", (received, callback) =>
    updatePersonById(received, callback, io)
  );
};

module.exports = routes;
