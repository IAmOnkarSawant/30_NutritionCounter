require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const chatRoutes = require("./Routes/chat");
const userRoutes = require("./Routes/userControl");

// express app
const app = express();

// middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/chat", chatRoutes);
app.use("/api/user", userRoutes);

//mongoose connection
mongoose
  .connect("mongodb://127.0.0.1:27017/ChatGpt", {
    useUnifiedTopology: true,
    useNewUrlParser: true,
  })
  .then(() => {
    // listen to port
    app.listen(process.env.PORT, () => {
      console.log("listening for requests on port", process.env.PORT);
    });
  })
  .catch((err) => {
    console.log(err);
  });
