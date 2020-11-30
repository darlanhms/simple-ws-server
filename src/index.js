const express = require('express');
const webSocket = require("./webSocket");

const server = express();

webSocket.start();

server.use(express.static("src/static"))

server.listen(3333, () => {
    console.log('Server listening');
});