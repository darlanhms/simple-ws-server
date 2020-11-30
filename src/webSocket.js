const WebSocket = require("ws");

/**
 * @type {Array<{ 
 *  type: string; 
 *  handler(string | object | any[]): void
 * }>}
 */
const typeHandlers = [];

/**
 * recebe mensagens do cliente no type definido
 * @param {string} type tipo da mensagem desejada
 * @param {(message: string | object | any[]) => void} handler funcao que recebe como parametro a mensagem quando ela for enviada
 */
const on = (type, handler) => {
  typeHandlers.push({
    type,
    handler
  })
}

/**
 * envia uma mensagem pro cliente que não necesseriamente precisar ser uma string
 * @param {string} type tipo da mensagem
 * @param {string | object | any[]} message mensagem que será enviada
 */
const send = (type, message) => {
  WebSocketServer.clients.forEach(ws => {
    ws.send(JSON.stringify({ type, message }))
  })
}

const WebSocketServer = new WebSocket.Server({ port: 8080 });

const initServer = () => {
  WebSocketServer.on('connection', ws => {
    ws.on("message", stringfiedMessage => {
      try {
        const { type: messageType, message } = JSON.parse(stringfiedMessage)
        const allHandlers = typeHandlers.filter(h => h.type === messageType);

        if (allHandlers && allHandlers.length) {
          allHandlers.forEach(({ handler }) => handler(message))
        }
      } catch (err) {}
    })
  });
}

module.exports = {
  start: initServer,
  server: WebSocketServer,
  on,
  send,
}
