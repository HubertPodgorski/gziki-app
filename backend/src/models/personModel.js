const mongoose = require("mongoose");

const DogModel = require("./dogModel");

const Schema = mongoose.Schema;

const personSchema = new Schema(
  {
    dogs: {
      type: [DogModel.schema],
    },
    name: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Person", personSchema);
