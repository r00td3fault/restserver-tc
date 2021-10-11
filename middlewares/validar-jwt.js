const jwt = require('jsonwebtoken');
const Usuario = require('../models/usuario');

const validarJWT = async( req, res , next ) => {

    const token = req.header('x-token');

    if ( !token ) {
        return res.status(401).json({
            msg: 'no hay token en la peticion'
        });
    }

    try {

        const { uid } = jwt.verify( token , process.env.SECRETKEY );

        //agregar la informacion al request para tenerla disponible para todos
        //req.uid = payload.uid;

        //obtener usuario autenticado
        const usuario = await Usuario.findById( uid );

        if( !usuario ){
            return res.status(401).json({
                msg: 'Usuario no existe'
            });
        } 

        //verificar si el usuario está activo
        if( !usuario.estado ) {
            return res.status(401).json({
                msg: 'token no valido - usuario eliminado'
            });
        }
        req.usuario = usuario;

        next();
        
    } catch (error) {

        console.log(error);
        res.status(401).json({
            msg: 'Token no válido'
        });
    }


}


module.exports = {
    validarJWT
}