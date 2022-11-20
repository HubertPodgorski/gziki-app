const mongoose = require("mongoose");
const DogModel = require("./dogModel");
const UserModel = require("./userModel");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    date: { type: String, required: true },
    name: { type: String, required: true },
    dogs: {
      type: [DogModel.schema],
      required: false,
    },
    users: {
      type: [UserModel.schema],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
