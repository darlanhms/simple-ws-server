const express = require('express');
const webSocket = require("./webSocket");

const app = express();

app.use(express.static("src/static"))

const server = app.listen(3333, () => {
    console.log('Server listening');
});

webSocket.start(server);

webSocket.on("messageEntry", message => {
    console.log(message);
})

webSocket.server.on("disconnection", ws => {
    console.log("disconnection ", ws.userId);
})