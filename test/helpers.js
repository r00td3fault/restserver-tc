const { Server } = require("../models");
const supertest = require("supertest");

/*
Por tiempo se usa la misma bd aunque no es buena practica para probar
*/
const server = new Server();

const api = supertest(server.server);

const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1aWQiOiI2MTY0NjZmYzRiMWZiZGYxNGY2ZGUyZDQiLCJpYXQiOjE2MzM5NzAyNjUsImV4cCI6MTYzMzk5OTA2NX0.qdHumGZZhS_t01DjHf5qEORr7OkhdBy7V9cpX3PSIb0';

const userInitial = [
    {
        nombre    : "Rodrigo",
        correo   : "prueba1@prueba.com",
        password  : "123456"
    },
    {
        nombre    : "Carlos",
        correo    : "prueba2@prueba.com",
        password  : "123456"
    }
];

const busquedaInicial = [
    {
        lat: '-33.8670522',
        lng: '151.1957362'
    },
    {
        lat: '-35.8670522',
        lng: '67.1957362'
    }
]

const getUsuarios = async() => {

    try {
        const response = await api.get('/api/usuarios');
        return response;
        
    } catch (error) {
        console.log(error);
    }

}


module.exports = {
    userInitial,
    getUsuarios,
    busquedaInicial,
    token
}