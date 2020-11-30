
class WebSocketHandler {
    url = "";
    /** @type {WebSocket} */
    webSocket;

    constructor(url) {
        this.url = url;
        this.connect();
    }

    async connect() {
        return new Promise((resolve, reject) => {
            this.webSocket = new WebSocket(this.url);
    
            this.webSocket.onopen = () => {
                resolve();
            }

            this.webSocket.onerror = () => {
                reject("Erro ao conectar com o servidor de socket")
            }
        })
        
    }

    /**
     * @param {string} type tipo da mensagem
     * @param {string | object | any[]} message conteudo da mensagem em si
     */
    async send(type, message) {
        if (this.checkConnection()) {
            this.webSocket.send(JSON.stringify({
                type,
                message,
            }));
        } else {
            await this.connect();
            this.send(type, message)
        }
    }

    /**
     * @param {string} type tipo da mensagem
     * @param {(string | object | any[]) => any} message conteudo da mensagem em si
     */
    on(type, handler) {
        this.webSocket.onmessage = message => {
            const dataObject = JSON.parse(message.data);

            if (dataObject.type && dataObject.type === type) {
                handler(dataObject.message);
            }
        };
    }

    /**
     *  0	CONNECTING	Socket has been created. The connection is not yet open.
     *  1	OPEN	    The connection is open and ready to communicate.
     *  2	CLOSING	    The connection is in the process of closing.
     *  3	CLOSED	    The connection is closed or couldn't be opened.
     * 
     * @returns {boolean}
     */
    checkConnection() {
        if (this.webSocket.readyState === 1) {
            return true;
        }

        return false;
    }
}