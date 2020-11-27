
document.addEventListener("DOMContentLoaded", async () => {
    const webScoket =  new WebSocketHandler(`ws://${window.location.hostname}:8080`);

    await webScoket.connect();

    webScoket.send("customMessage", {
        userId: 'uuid'
    })

    webScoket.on('customMessage', (data) => {
        console.log(data);
    })
})