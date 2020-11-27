
class WebSocketHandler {
    url = "";
    /** @type {WebSocket} */
    webSocket;
    /** @type {'INATIVO' | 'CONECTANDO' | 'CONECTADO'} */
    status = "INATIVO"

    constructor(url) {
        this.url = url;
        this.connect();
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.url);
            this.status = "CONECTANDO";
    
            this.webSocket.onopen = () => {
                this.status = "CONECTADO";
                resolve();
            }

            this.webSocket.onerror = () => {
                this.status = "INATIVO";
                reject("Erro ao conectar com o servidor de socket")
            }
        })
        
    }

    /**
     * @param {string} type tipo da mensagem
     * @param {string | object | any[]} message conteudo da mensagem em si
     */
    send(type, message) {
        if (this.status === "CONECTADO") {
            this.webSocket.send(JSON.stringify({
                type,
                message,
            }));
        }
    }

    /**
     * @param {string} type tipo da mensagem
     * @param {() => string | object | any[]} message conteudo da mensagem em si
     */
    on(type, handler) {
        if (this.status === "CONECTADO") {
            this.webSocket.onmessage = message => {
                const dataObject = JSON.parse(message.data);

                if (dataObject.type && dataObject.type === type) {
                    handler(dataObject.message);
                }
            };
        }
    }
}