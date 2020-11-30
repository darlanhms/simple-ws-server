
document.addEventListener("DOMContentLoaded", async () => {
    const webScoket =  new WebSocketHandler(`ws://${window.location.hostname}:8080`);

    await webScoket.connect();

    webScoket.send("customMessage", {
        message: 123
    })

    webScoket.on('customMessage', (data) => {
        console.log(data);
    })
})