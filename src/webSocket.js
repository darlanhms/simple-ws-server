const WebSocket = require("ws");

/**
 * @type {Array<{ 
 *  type: string; 
 *  handler(string | object | any[]): void
 * }>}
 */
const typeHandlers = [];
/** @type {Set<WebSocket>} */
let previousCheckedClients = new Set();

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
    ws.isAlive = true;

    ws.on('pong', function() {
      this.isAlive = true;
    });
  
    ws.on("message", stringfiedMessage => {
      try {
        const { type: messageType, message } = JSON.parse(stringfiedMessage)
        const allHandlers = typeHandlers.filter(h => h.type === messageType);

        if (messageType === "login" && message && typeof message === "object" && message.userId) {
          ws.userId = message.userId
        }

        if (allHandlers && allHandlers.length) {
          allHandlers.forEach(({ handler }) => handler(message))
        }
      } catch (err) {}
    })
  });

  const checkConnectionInterval = setInterval(() => {
    WebSocketServer.clients.forEach(function each(ws) {
      if (ws.isAlive === false) {
        WebSocketServer.emit("disconnection", ws)
        return ws.terminate();
      }

      ws.isAlive = false;
      ws.ping("isAlive");
    });

    if (previousCheckedClients && previousCheckedClients.size) {
      previousCheckedClients.forEach(ws => {
        if (ws.userId) {
          let existentClient = false;

          WebSocketServer.clients.forEach(ws2 => {
            if (ws2.userId === ws.userId) {
              existentClient = true;
            }
          });

          if (!existentClient) {
            WebSocketServer.emit("disconnection", ws)
          }
        }
      })
    }

    previousCheckedClients = new Set(WebSocketServer.clients);
  }, 5000);
  
  WebSocketServer.on('close', function close() {
    clearInterval(checkConnectionInterval);
  });
}

module.exports = {
  start: initServer,
  server: WebSocketServer,
  on,
  send,
}
