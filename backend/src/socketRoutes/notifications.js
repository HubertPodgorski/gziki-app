const {
  saveSubscription,
  sendNotification,
} = require("../controllers/notificationController");

const routes = (io, socket) => {
  const userToken = socket.handshake.query.token;

  socket.on("save_subscription", (received) =>
    saveSubscription(received, userToken)
  );

  socket.on("send_notification", (received) =>
    sendNotification(received, userToken)
  );
};

module.exports = routes;
