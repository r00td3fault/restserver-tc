const supertest = require("supertest");
const { dbDisconnection } = require("../database/config");
const { Server } = require("../models");
const { busquedaInicial, token } = require("./helpers");


const server = new Server();

const api = supertest(server.server);

//TODO: recorrer el arreglo y generar pruebas por cada item


test('Busqueda por localizacion retorna un json', async() => {
    await api
    .get(`/api/buscar/ ${busquedaInicial[0].lat},${busquedaInicial[0].lng}`)
    .set('x-token', token)
    .expect(200)
    .expect('Content-type', /application\/json/)
});

test('Busqueda por ciudad retorna un json', async() => {
    await api
    .get(`/api/buscar/cali`)
    .set('x-token', token)
    .expect(200)
    .expect('Content-type', /application\/json/)
});

test('Busqueda si parametro', async() => {
    await api
    .get(`/api/buscar/`)
    .expect(200)
    .expect('Content-type', /application\/json/)
});


afterAll( async() => {
    await dbDisconnection();
})
