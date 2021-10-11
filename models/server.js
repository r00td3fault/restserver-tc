const express = require('express');
const cors = require('cors');
const { dbConnection , dbDisconnection } = require('../database/config.js');



class Server {
    
    constructor(){
        this.app = express();
        //error en prueba se pone directamente
        this.port = 8080;
        // this.port = process.env.PORT;
        this.server = require('http').createServer( this.app );

        this.paths = {
            auth:       '/api/auth',
            buscar:     '/api/buscar',
            historial: '/api/historial',
            usuarios:   '/api/usuarios'
        };

        //Conexion a bd
        this.conectarDB();

        //Middlewares
        this.middlewares();

        //Rutas
        this.routes();
    }

    async conectarDB() {
        await dbConnection();
    }

    async desconectarDB() {
        await dbDisconnection();
    }

    middlewares() {

        //Cors
        this.app.use( cors() );

        // Lectura y parseo del body
        this.app.use( express.json() );

        //Directorio publico
        this.app.use( express.static('public') );
        
    }

    routes() {

        this.app.use( this.paths.auth, require('../routes/auth_routes'));
        this.app.use( this.paths.buscar, require('../routes/buscar_routes'));
        this.app.use( this.paths.historial, require('../routes/historial_routes'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios_routes'));
        
    }

    listen() {
        this.server.listen( this.port, () => {
            console.log(`Example app listening at http://localhost:${this.port}`);
        });
    }

}

module.exports = Server;