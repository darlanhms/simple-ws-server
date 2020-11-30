const express = require('express');
const webSocket = require("./webSocket");

const app = express();

webSocket.start();

webSocket.on("messageEntry", message => {
    console.log(message);
})

webSocket.server.on("disconnection", ws => {
    console.log("disconnection ", ws.userId);
})

app.use(express.static("src/static"))

app.listen(3333, () => {
    console.log('Server listening');
});