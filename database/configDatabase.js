const mongoose = require('mongoose');


const dbConection= async()=>{

    try {
       await mongoose.connect(process.env.MONGO_DB_CON,{
        autoIndex: true,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    
       })
        console.log('Base de datos conectada :)');
    } catch (error) {
        console.log(error);
        throw new Error('Error al conectar con la base de datos ')
    }
};

module.exports= dbConection;