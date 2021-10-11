const bcryptjs = require('bcryptjs');
const Usuario = require('../models/usuario');

const usuariosGet = async(req , res ) => {

    const { limite = 25, desde =0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip( Number(desde) )
            .limit(Number(limite))
    ]);

    res.json({ 
        total,
        usuarios 
    });
}

const usuariosPost = async(req, res ) => {

    const { nombre, correo, password } = req.body;
    const usuario = new Usuario({ nombre, correo, password });
    
    //encriptar pasword
    const salt = bcryptjs.genSaltSync();
    usuario.password = bcryptjs.hashSync( password, salt );

    // Gruardar en BD
    await usuario.save();

    res.json({
        msg: 'Usuario creado con éxito',
        usuario
    });
}







module.exports = {
    usuariosGet,
    usuariosPost
}