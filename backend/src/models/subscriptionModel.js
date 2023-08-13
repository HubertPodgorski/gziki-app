const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const subscriptionSchema = new Schema({
  endpoint: { type: String, unique: true },
  expirationTime: Number,
  keys: {
    p256dh: String,
    auth: String,
  },
  team: String,
  userId: String,
});

module.exports = mongoose.model("Subscription", subscriptionSchema);
