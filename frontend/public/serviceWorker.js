self.addEventListener("install", (event) => {
  console.log("Service worker installed");
});

self.addEventListener("activate", (event) => {
  console.log("Service worker activated");
});

self.addEventListener("push", (event) => {
  const notificationData = JSON.parse(event.data.text());

  const options = {
    body: notificationData.body ?? "",
    icon: "./favicon.ico",
    vibrate: [100, 50, 100],
    data: {
      dateOfArrival: Date.now(),
      primaryKey: 1,
    },
  };
  event.waitUntil(
    self.registration.showNotification(notificationData.title, options)
  );
});
