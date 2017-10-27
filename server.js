//Get dependencies
const express = require('express');
const app = express();

const path = require('path');
const http = require('http');

//Point static path to dist
app.use(express.static(path.join(__dirname, './')));
//Catch all other routes and return the index file
app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, './index.html'));
});
/**
 * Get port from environment add store in Express
 **/
const port = process.env.port  || '8080';
app.set('port', port);

/**
 * Creat HTTP server
 * **/
const server = http.createServer(app);

server.listen(port, ()=> console.log('Node Server running on: ', port));
server.on('error', onError);

function onError(error) {
    if (error.syscall !== 'listen') {
        throw error;
    }

    const bind = typeof port === 'string'
        ? 'Pipe ' + port
        : 'Port ' + port;

    // handle specific listen errors with friendly messages
    switch (error.code) {
        case 'EACCES':
            console.error(bind + ' requires elevated privileges');
            process.exit(1);
            break;
        case 'EADDRINUSE':
            console.error(bind + ' is already in use');
            process.exit(1);
            break;
        default:
            throw error;
    }
}
