const express = require("express");
const chats = require("./Data/data");
const dotenv = require('dotenv').config();
const connectDB = require("./config/db");
const colors = require("colors");

const userRoutes = require("./routes/userRoutes");
const chatRoutes = require("./routes/chatRoutes");
const { notFound, errorHandler } = require("./middleware/errorMiddleware");

connectDB();

const App = express();
App.use(express.json());            //to accept the JSON data

App.get("/", (req, res) => {
    res.send("API is running Successfully");
});

App.get("/api/chat", (req, res) => {
    res.send(chats);
});

App.get("/api/chat/:id", (req, res) => {
    const singleChat = chats.find((c) => c._id === req.params.id);
    res.send(singleChat);
});

App.use('/api/user', userRoutes);
App.use('/api/chat', chatRoutes);
App.use(notFound);
App.use(errorHandler);

const PORT = process.env.PORT || 5000;

App.listen(PORT, console.log(`Server started at port ${PORT}`.yellow.bold));
