const UserModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const mongoose = require("mongoose");

const createToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: "3d" });
};

// get all users
const getAllUsers = async (callback) => {
  const users = await UserModel.find({}).sort({ createdAt: -1 });

  callback(users);
};

// get single user
const getUserById = async (received, callback) => {
  const { _id } = received;

  // TODO: handle that
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "USER_NOT_FOUND" });
  // }

  const user = await UserModel.findById(_id);

  // TODO: handle that
  // if (!user) {
  //   return res.status(404).json({ error: "USER_NOT_FOUND" });
  // }

  callback(user);
};

// create new user
const createUser = (received, callback, io) => async (req, res) => {
  const { name, dogs } = received;

  const user = await UserModel.create({ name, dogs });

  const allUsers = await UserModel.find({});

  callback(user);
  io.emit("users_updated", allUsers);
};

// delete user
const deleteUserById = async (received, io) => {
  const { _id } = received;

  // TODO: handle that
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "USER_NOT_FOUND" });
  // }

  await UserModel.findOneAndDelete({ _id });

  // TODO: handle that
  // if (!user) {
  //   return res.status(400).json({ error: "USER_NOT_FOUND" });
  // }

  const allUsers = await UserModel.find({});

  io.emit("users_updated", allUsers);
};

// update user
const updateUserById = async (received, callback, io) => {
  const { _id } = received;

  // TODO: handle that
  // if (!mongoose.Types.ObjectId.isValid(_id)) {
  //   return res.status(404).json({ error: "USER_NOT_FOUND" });
  // }

  const user = await UserModel.findOneAndUpdate({ _id }, { ...received });

  // TODO: handle that
  // if (!user) {
  //   return res.status(404).json({ error: "USER_NOT_FOUND" });
  // }

  const allUsers = await UserModel.find({});

  callback(user);
  io.emit("users_updated", allUsers);
};

const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await UserModel.login(email, password);
    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

const logout = async (req, res) => {};

const signup = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const user = await UserModel.signup(email, password, name);

    const token = createToken(user._id);

    res.status(200).json({ user, token });
  } catch (e) {
    res.status(400).json({ error: e.message });
  }
};

module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  deleteUserById,
  updateUserById,
  login,
  logout,
  signup,
};
