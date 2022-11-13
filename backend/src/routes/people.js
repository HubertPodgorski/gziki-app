const express = require("express");

const {
  createPerson,
  getAllPeople,
  getPersonById,
  deletePersonById,
  updatePersonById,
} = require("../controllers/personController");

const router = express.Router();

router.get("/", getAllPeople);

router.post("/", createPerson);

router.get("/:id", getPersonById);

router.delete("/:id", deletePersonById);

router.patch("/:id", updatePersonById);

module.exports = router;
