const mongoose = require('mongoose');

//por error en la pruebas se pone directamente
const MONGODB_CNN='mongodb+srv://user_prueba:eHxr1YnhbJ4DAfPQ@miclusternode.barlc.mongodb.net/pruebaTc';

const dbConnection = async () => {

    try {

        //await mongoose.connect( process.env.MONGODB_CNN, {});
        await mongoose.connect( MONGODB_CNN, {});

        console.log('base de datos onlbne!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al iniciar base de datos');
    }

}


const dbDisconnection = async() => {

    try {

        await mongoose.connection.close();

        console.log('base de datos offline!!');
        
    } catch (error) {
        console.log(error);
        throw new Error('Error al bajar base de datos');
    }
}





module.exports = {
    dbConnection,
    dbDisconnection
}