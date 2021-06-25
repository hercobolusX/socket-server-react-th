//servidor de express
const express  = require('express');
const http     = require('http');
const socketio = require('socket.io');
const path     = require('path');

const Socket   = require('./sockets');

class Server {
    constructor(){
        this.app = express();
        this.port = process.env.PORT;

        //Http server
        this.server = http.createServer( this.app );

        //configuraciones sockets
        this.io = socketio( this.server, { /* configuracion */});
    }
    middlewares(){
        //desplegar el diectiorio public
        this.app.use( express.static( path.resolve( __dirname, '../public' ) ) );
    }

    configurarSockets(){
        new Socket( this.io );
    }

    execute() {
        //inicializar middelwares
        this.middlewares();

        //inicializar sockets
        this.configurarSockets();

        //inicializar el server
        this.server.listen( this.port, () => {
            console.log('Server corriendo en puerto:', this.port);
        });
    }   
}


module.exports = Server;
