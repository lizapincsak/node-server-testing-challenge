const express = require("express");

const FruitRouter = require("./fruits/fruits-router.js")

const server = express();

server.use(express.json());

server.use('/fruits', FruitRouter)

server.get("/", (req, res) => {
    res.status(200).json({api: "up"})
});

module.exports = server;






