const WebSocket = require("ws");
class EventHandler {
  /** @type {WebSocket} */
  ws;
  
  /**
   * @param {WebSocket} ws instancia de conexao do websocket
   */
  constructor(ws) {
    this.ws = ws;
  }

  /**
   * recebe mensagens do cliente no type definido
   * @param {string} type tipo da mensagem desejada
   * @param {(message: string | object | any[]) => void} handler funcao que recebe como parametro a mensagem quando ela for enviada
   */
  on(type, handler) {
    this.ws.on('message', stringfiedMessage => {
      try {
        const { type: messageType, message } = JSON.parse(stringfiedMessage)

        if (messageType === type) {
          handler(message);
        }
      } catch (err) {}
    })
  }

  /**
   * envia uma mensagem pro cliente que não necesseriamente precisar ser uma string
   * @param {string} type tipo da mensagem
   * @param {string | object | any[]} message mensagem que será enviada
   */
  send(type, message) {
    this.ws.send(JSON.stringify({ type, message }))
  }
}

const WebSocketServer = new WebSocket.Server({ port: 8080 });

const initServer = () => {
  WebSocketServer.on('connection', ws => {
    const wse = new EventHandler(ws);

    wse.on("customMessage", message => {
      console.log("recebeu de custom message ", message);
    })

    wse.send("customMessage", {
      message: "ok"
    })
  });
}

module.exports = {
  start: initServer,
  server: WebSocketServer,
  EventHandler,
}
