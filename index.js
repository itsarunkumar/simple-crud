const express = require("express");
const app = express();
const mongoose = require("mongoose");
const bodyParser = require("body-parser");

//routes
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");

//middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

//routes middleware
app.use("/api/task", taskRoutes);
app.use("/api/user", userRoutes);

//server starting
app.listen(3000, () => {
  mongoose
    .connect(
      "mongodb+srv://zapit:zapit-backend@zapit.fm1ijqg.mongodb.net/?retryWrites=true&w=majority"
    )
    .then(() => {
      console.log("Connected to DB");
    });
  console.log("Server is running on port 3000");
});
