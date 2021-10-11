require('dotenv').config();
const Server = require('./models/server');


//se instancia clase del servidor para ponerlo
const server = new Server();




server.listen();