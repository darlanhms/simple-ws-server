const webSocket = require("./webSocket");

module.exports = () => {
    webSocket.send("trigger", "route was triggered")

    webSocket.on("messageInside", message => {
        console.log('inside', message);
    })
}