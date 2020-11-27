const WebSocket = require("ws");

module.exports = () => {
  const WebSocketServer = new WebSocket.Server({ port: 8080 });

  WebSocketServer.on('connection', ws => {
    ws.on('message', message => {
      console.log('received: %s', message);
    });

    ws.send(JSON.stringify({ type: 'customMessage', message: { conectado: true } }))
  });
  
}
