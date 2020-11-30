
document.addEventListener("DOMContentLoaded", async () => {
    const webSocket =  new WebSocketHandler(`ws://${window.location.hostname}:8080`);

    document.getElementById("sendMessage").addEventListener("click", () => {
        const message = document.getElementById("message").value

        webSocket.send("messageEntry", message)
    })
})