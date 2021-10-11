const bcryptjs = require('bcryptjs');


const Usuario = require('../models/usuario');
const { generarJWT } = require("../helpers/generarJWT");



const login = async( req, res ) => {

    const { correo, password } = req.body;
    
    try {

        //verificar si existe el email
        const usuario = await Usuario.findOne({ correo });
        if ( !usuario ){

            return res.status(400).json({
                msg: 'Usuario / password no con correctos - email'
            });
        }

        //si el usuasior esta activo
        if ( !usuario.estado ){
            return res.status(400).json({
                msg: 'Usuario / password no con correctos - estado: false'
            });
        }

        //verificar contrasena
        const validPassword = bcryptjs.compareSync( password, usuario.password );
        if( !validPassword ){
            return res.status(400).json({
                msg: 'Usuario / password no con correctos - pasword'
            });
        }

        //generar el JWT 
        const token = await generarJWT( usuario.id );

        res.json({
            usuario,
            token
        });
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            mes: 'Algo salió mal hable con el administrador'
        });
    }

}


const logout = async (req, res ) => {

}



module.exports ={ 
    login,
    logout
};