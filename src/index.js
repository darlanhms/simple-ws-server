const express = require('express');
const webSocket = require("./webSocket");

const addIntegration = require("./addIntegration");

const app = express();

webSocket.start();

webSocket.on("messageInside", message => {
    console.log(message);
})

app.post("/trigger", (req, res) => {
    addIntegration()
    return res.json({
        ok: "123"
    })
})

app.use(express.static("src/static"))


app.listen(3333, () => {
    console.log('Server listening');
});