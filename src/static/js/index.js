
document.addEventListener("DOMContentLoaded", async () => {
    const webSocket =  new WebSocketHandler(`ws://${window.location.hostname}:8080`);

    await webSocket.connect();

    webSocket.send("customMessage", {
        message: 123
    })

    webSocket.on('customMessage', (data) => {
        console.log(data);
    })

    webSocket.on('trigger', data => {
        console.log('trigger', data);
    })

    document.getElementById("sendMessage").addEventListener("click", () => {
        const message = document.getElementById("message").value

        webSocket.send("messageInside", message)
    })
})