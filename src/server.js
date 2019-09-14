const mongoose = require("mongoose");
const express = require("express");
const routes = require("./routes")
const cors = require("cors");

const server = express();

const SERVER_PORT = process.env.PORT || 3333;

const mongooseConnection = `mongodb+srv://zaccaron1:amyO6TGuT1It5ntp@clusterevent-sbmbf.mongodb.net/eventapi?retryWrites=true&w=majority`;

mongoose.connect(mongooseConnection, { useNewUrlParser: true, useCreateIndex: true });

server.use(cors());
server.use(express.json());
server.use(routes);

server.listen(SERVER_PORT, () => {
  console.log(`Server started on Port ${SERVER_PORT}`);
});