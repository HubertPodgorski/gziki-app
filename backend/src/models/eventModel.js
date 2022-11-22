const mongoose = require("mongoose");
const DogModel = require("./dogModel");
const UserModel = require("./userModel");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    date: { type: String, required: true },
    name: { type: String, required: true },
    dogs: {
      type: [
        {
          status: { type: String },
          _id: { type: String },
        },
      ],
      required: false,
    },
    users: {
      type: [
        {
          status: { type: String },
          _id: { type: String },
        },
      ],
      required: false,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
