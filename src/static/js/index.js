
document.addEventListener("DOMContentLoaded", async () => {
    WebSocketHandler.init(`ws://${window.location.hostname}:8080`);

    document.getElementById("sendMessage").addEventListener("click", () => {
        const message = document.getElementById("message").value

        WebSocketHandler.send("messageEntry", message)
    })
})
