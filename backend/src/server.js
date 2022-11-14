require("dotenv").config();

const tasksRoutes = require("./routes/tasks");
const dogsRoutes = require("./routes/dogs");
const eventsRoutes = require("./routes/events");
const peopleRoutes = require("./routes/people");

const express = require("express");
const mongoose = require("mongoose");

const cors = require("cors");

const http = require("http");
const { Server } = require("socket.io");

const app = express();

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000",
    methods: ["GET", "POST", "PATCH", "DELETE"],
  },
});

app.use(cors());

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

app.use("/api/dogs", dogsRoutes);
app.use("/api/events", eventsRoutes);
app.use("/api/people", peopleRoutes);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => {
    console.log("Connected to DB");

    // app listener
    app.listen(process.env.PORT, () => {
      console.log(`Listening on port ${process.env.PORT}`);
    });
  })
  .catch((error) => {
    console.log(error);
  });

io.on("connection", (socket) => {
  console.log(`User connected: ${socket.id}`);
  app.use("/api/tasks", tasksRoutes(io, socket));
});

server.listen(process.env.SOCKET_PORT, () => {
  console.log(`Listening socket on port ${process.env.SOCKET_PORT}`);
});

module.exports = { getIo: () => io };
