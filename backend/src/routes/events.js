const express = require("express");

const {
  createEvent,
  getAllEvents,
  getEventById,
  deleteEventById,
  updateEventById,
} = require("../controllers/eventController");

const router = express.Router();

router.get("/", getAllEvents);

router.post("/", createEvent);

router.get("/:id", getEventById);

router.delete("/:id", deleteEventById);

router.patch("/:id", updateEventById);

module.exports = router;
