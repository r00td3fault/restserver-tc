const { response } = require("express");
const { Historial }  = require('../models'); 
const axios = require('axios');


const baseUrl = 'https://maps.googleapis.com/maps/api/place/textsearch/json?'
const key = process.env.GOOGLE_KEY;



const buscarCoordenadas = async( termino , res, req ) => {

    //TODO: Validar espacios y parametris enviados

    const [ lat, lng ] = termino.split(',');

    //TODO: parametrizar tipos de busquedas y parametros a pasar

    const paramsCoor = {
        method: 'get',
        url: baseUrl+`location=${lat},${lng}&query=restaurante&radius=5000&key=${key}`,
       // headers: { }
    };

    try {

        console.log(paramsCoor.url);
        const response = await axios(paramsCoor);

        //TODO seleccionar la dataa guardar y formato

        const historialData = {
            descripcion : termino,
            resultado: JSON.stringify(response.data.results),
            usuario: req.usuario._id
        }

        const historial = new Historial( historialData );
        await historial.save();

        console.log(response);
        
        res.json(response.data.results);
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo ocurrio con la busqueda'
        });
    }

}


const buscarCiudad = async( termino, res , req) => {

    const paramsCiud = {
        method: 'get',
        url: baseUrl+`query=restaurante,${termino},colombia&fields=formatted_address,name,geometry&key=${key}`,
        //headers: { }
    };

    try {

        console.log(paramsCiud.url);
        const response = await axios(paramsCiud);

        console.log(response.data.results);

        res.json(response.data.results);

        //TODO seleccionar la dataa guardar y formato

        const historialData = {
            descripcion : termino,
            resultado: JSON.stringify(response.data.results),
            usuario: req.usuario._id
        }

        const historial = new Historial( historialData );
        await historial.save();
        
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Algo ocurrio con la busqueda'
        });
    }

}

const buscar = (req, res = response ) => {

    const { termino } = req.params;
    let metodoBusqueda = '';

    console.log(termino, termino.indexOf(',')  )

    if ( termino.indexOf(',') !== -1 ) {
        metodoBusqueda = 'coordenadas';
    }else{
        metodoBusqueda = 'ciudad';
    }

        
    switch ( metodoBusqueda ) {
        case 'coordenadas':
            buscarCoordenadas( termino, res, req );
        break;

        case 'ciudad':
            buscarCiudad( termino, res, req );
        break;
    
        default:
           res.status(500).json({
               msg: 'Eliga un criterio valido ode busqueda o aun no se ha implementado contacte al administrador'
           });
    }


}



module.exports = {
    buscar
}