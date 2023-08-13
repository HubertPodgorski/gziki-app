const webpush = require("web-push");
const jwt = require("jsonwebtoken");

const SubscriptionModel = require("../models/subscriptionModel");

const vapidKeys = {
  publicKey: process.env.VAPID_PUBLIC_KEY,
  privateKey: process.env.VAPID_PRIVATE_KEY,
};

webpush.setVapidDetails(
  "mailto:kontakt@podgorski.tech",
  vapidKeys.publicKey,
  vapidKeys.privateKey
);

const pushNotifications = async (userToken, data) => {
  const { team } = jwt.decode(userToken);

  const allSubscriptions = await SubscriptionModel.find({ team });

  console.log("allSubscriptions => ", allSubscriptions);

  for await (const singleSubscription of allSubscriptions) {
    console.log("sending notifications to: ", singleSubscription._doc.userId);
    const {
      _doc: { team, userId, ...subscription },
    } = singleSubscription;

    await webpush.sendNotification(subscription, JSON.stringify(data));
  }
};

module.exports = {
  pushNotifications,
};
