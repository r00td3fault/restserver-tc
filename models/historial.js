
const { Schema, model} = require('mongoose');

const HistorialSchema = Schema({
    descripcion: {
        type: String,
    },
    resultado: {
        type: String,
    },
    usuario: {
        type: Schema.Types.ObjectId,
        ref: 'Usuario',
        required: true
    },
    estado: {
        type: Boolean,
        default: true
    }
});

//Quitar campos de la respuesta globalmente

HistorialSchema.methods.toJSON = function() {
    //campos a quitar y retornamos el resto
    const { __v, _id, ...historial } = this.toObject();

    return historial;
}

module.exports = model( 'Historial', HistorialSchema );