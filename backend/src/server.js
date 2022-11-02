require("dotenv").config();

const tasksRoutes = require("./routes/tasks");

const express = require("express");
const mongoose = require("mongoose");

const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);

  next();
});

app.use("/api/tasks", tasksRoutes);

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
