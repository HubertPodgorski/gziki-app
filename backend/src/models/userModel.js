const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const DogModel = require("./dogModel");

const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    dogs: {
      type: [DogModel.schema],
    },
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    roles: { type: [{ type: String }] },
  },
  {
    timestamps: true,
  }
);

userSchema.statics.signup = async function (email, password, name) {
  if (!email || !password) {
    throw Error("ALL_FIELDS_MUST_BE_FILLED");
  }

  const exists = await this.findOne({ email });

  if (exists) {
    throw Error("EMAIL_ALREADY_IN_USE");
  }

  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);

  const user = await this.create({
    email,
    password: hash,
    name,
    roles: [],
  });

  return user;
};

userSchema.statics.login = async function (email, password) {
  if (!email || !password) {
    throw Error("ALL_FIELDS_MUST_BE_FILLED");
  }

  const user = await this.findOne({ email });

  if (!user) {
    throw Error("INCORRECT_EMAIL");
  }

  const match = await bcrypt.compare(password, user.password);

  if (!match) {
    throw Error("INCORRECT_PASSWORD");
  }

  return user;
};

module.exports = mongoose.model("User", userSchema);
