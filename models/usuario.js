
const { Schema, model} = require('mongoose');

const UsuarioSchema = Schema({
    nombre: {
        type: String,
        required: [true, 'el nombre es obligatorio']
    },
    correo: {
        type: String,
        required: [true, 'el correo es obligatorio'],
        unique: true
    },
    password: {
        type: String,
        required: [true, 'La contrasena es obligatoria']
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//Quitar campos de la respuesta globalmente

UsuarioSchema.methods.toJSON = function() {
    //campos a quitar y retornamos el resto
    const { __v, password, _id, ...usuario } = this.toObject();
    usuario.uid = _id;

    return usuario;
}

module.exports = model( 'Usuario', UsuarioSchema );