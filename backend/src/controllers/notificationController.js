const SubscriptionModel = require("../models/subscriptionModel");

const mongoose = require("mongoose");
const jwt = require("jsonwebtoken");

const { pushNotifications } = require("../helpers/push");

// save subscription
const saveSubscription = async (received, callback, userToken) => {
  const { team, _id } = jwt.decode(userToken);

  await SubscriptionModel.findOneAndDelete({
    userId: _id,
  });

  const createdSubscription = await SubscriptionModel.create({
    ...received,
    team: team,
    userId: _id,
  });

  callback(createdSubscription);
};

const getSubscriptionDetails = async (callback, userToken) => {
  const { _id } = jwt.decode(userToken);

  const foundSubscription = await SubscriptionModel.findOne({
    userId: _id,
  });

  callback(foundSubscription);
};

const sendNotification = async (received, userToken) => {
  await pushNotifications(userToken, received);
};

module.exports = {
  saveSubscription,
  sendNotification,
  getSubscriptionDetails,
};
