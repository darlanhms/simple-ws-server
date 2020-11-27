const express = require('express');

const server = express();

require('./webSocket')();

server.use(express.static("src/static"))

server.listen(3333, () => {
    console.log('Server listening');
});