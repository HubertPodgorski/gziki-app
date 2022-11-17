const mongoose = require("mongoose");
const DogModel = require("./dogModel");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    date: { type: String, required: true },
    name: { type: String, required: true },
    dogs: {
      type: [DogModel.schema],
      unique: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
