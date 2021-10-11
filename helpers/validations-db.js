const { Usuario } = require('../models');


const emailExiste = async( correo = '') => {

//verificar que el correo existe
const existeEmail = await Usuario.findOne({ correo });
if( existeEmail ){
    throw new Error(`El correo: ${ correo }, ya se encuentra registrado`);
}

}

const existeUsuarioId = async( id ) => {

//verificar que el usuario existe
const existeId = await Usuario.findById(id);
if( !existeId ){
    throw new Error(`El id: ${ id }, no existe`);
}

}



module.exports = {
    emailExiste,
    existeUsuarioId
}