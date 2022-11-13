const express = require("express");

const {
  createDog,
  getAllDogs,
  getDogById,
  deleteDogById,
  updateDogById,
} = require("../controllers/dogController");

const router = express.Router();

router.get("/", getAllDogs);

router.post("/", createDog);

router.get("/:id", getDogById);

router.delete("/:id", deleteDogById);

router.patch("/:id", updateDogById);

module.exports = router;
