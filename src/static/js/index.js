
document.addEventListener("DOMContentLoaded", async () => {
    const webSocket =  new WebSocketHandler(`ws://${window.location.hostname}:8080`);

    await webSocket.connect();

    document.getElementById("sendMessage").addEventListener("click", () => {
        const message = document.getElementById("message").value

        webSocket.send("messageInside", message)
    })
})