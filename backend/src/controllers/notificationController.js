const SubscriptionModel = require("../models/subscriptionModel");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { pushNotifications } = require("../helpers/push");

// save subscription
const saveSubscription = async (received, userToken) => {
  const { team, email } = jwt.decode(userToken);

  const alreadyFound = await SubscriptionModel.findOne({
    endpoint: received.endpoint,
  });

  if (alreadyFound) return;

  await SubscriptionModel.create({ ...received, team, userEmail: email });
};

const sendNotification = async (received, userToken) => {
  pushNotifications(userToken, received);
};

module.exports = {
  saveSubscription,
  sendNotification,
};
