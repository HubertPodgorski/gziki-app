const {
  saveSubscription,
  sendNotification,
  getSubscriptionDetails,
} = require("../controllers/notificationController");

const routes = (io, socket) => {
  const userToken = socket.handshake.query.token;

  socket.on("save_subscription", (received, callback) =>
    saveSubscription(received, callback, userToken)
  );

  socket.on("send_notification", (received) =>
    sendNotification(received, userToken)
  );

  socket.on("get_subscription_details", (callback) =>
    getSubscriptionDetails(callback, userToken)
  );
};

module.exports = routes;
