const Historial = require('../models/historial');

const historialGet = async(req , res ) => {

    const { limite = 15, desde =0 } = req.query;

    const [total, usuarios] = await Promise.all([
        Historial.countDocuments({ estado: true }),
        Historial.find({ estado: true })
            .skip( Number(desde) )
            .limit(Number(limite))
    ]);

    res.json({ 
        total,
        usuarios 
    });
}






module.exports = {
    historialGet
}