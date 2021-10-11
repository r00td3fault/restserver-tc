const supertest = require("supertest");
const { dbDisconnection } = require("../database/config");
const {  Usuario } = require("../models/usuario");
const { Server } = require("../models/server");
const { userInitial, getUsuarios, token } = require("./helpers");


const server = new Server();

const api = supertest(server.server);

beforeEach( async() => {
    
    await Usuario.deleteMany({});

    //Para hacero secuencial dependen del iniciausers

    for (const user of userInitial ){
        const userObj = new Usuario(user);
        await userObj.save();
    }

    // const user1 = new Usuario(userInitial[0]);
    // await user1.save();
    // const user2 = new Usuario(userInitial[1]);
    // await user2.save();

});



test('Usuarios retornand un json', async() => {
    await api
    .get('/api/usuarios')
    .expect(200)
    .expect('Content-type', /application\/json/)
});

test('Nos retorna el numero de usuarios', async() => {
    const response = await getUsuarios();
    expect(response.body.usuarios).toHaveLength(userInitial.length);
});

test('El primer usuario tiene correo prueba1', async() => {
    const response = await getUsuarios();
    expect(response.body.usuarios[0].correo).toBe('prueba1@prueba.com');
});


test('Algun usuario tiene ese correo', async() => {
    const response = await getUsuarios();
    const contents = response.body.usuarios.map( user => user.correo )
    expect(contents).toContain('prueba1@prueba.com');
});


test('Crear un nuevo usuario y longitud de caracteres en contrasena', async( ) => {

    const nuevoUsuario = {
        nombre    : "Prueba 3",
        correo    : "prueba3@prueba.com",
        password  : "1256"
    };

    const resp = await api
            .post('/api/usuarios')
            //.set('Accept', 'application/json')
            .send( nuevoUsuario )
            .expect(200)
            .expect('Content-type', /application\/json/);
            

    const response = await getUsuarios();
    const nombres = response.body.usuarios.map( user => user.correo );

    expect(response.body.usuarios).toHaveLength( userInitial.length+1)
    expect(nombres).toContain('prueba3@prueba.com');
    
});

test('Crear un nuevo usuario sin datos obligatorios', async( ) => {

    const nuevoUsuario = {
        nombre    : "Prueba 4",
        correo    : "prueba4@prueba.com"
    };

    const resp = await api
            .post('/api/usuarios')
            //.set('Accept', 'application/json')
            .send( nuevoUsuario )
            .expect(400);
            

    const response = await getUsuarios();
    const nombres = response.body.usuarios.map( user => user.correo );

    expect(response.body.usuarios).toHaveLength( userInitial.length+1)
    expect(nombres).toContain('prueba4@prueba.com');
    
});


afterAll( async() => {
    await dbDisconnection();
})
