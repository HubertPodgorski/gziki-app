const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const eventSchema = new Schema(
  {
    date: { type: String, required: true },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Event", eventSchema);
