const express = require('express');
const dotenv = require('dotenv').config();
const {dbConnection} = require('./database/config');
const cors = require('cors');

//Crear el servidor de express
const app = express();

//base de datos
dbConnection();

//CORS
app.use(cors())
//directorio publico
app.use( express.static('public') );

//Lectura y parseo del body
app.use( express.json() );

//Rutasp
app.use('/api/auth', require('./routes/auth'));
app.use('/api/events', require('./routes/events'));
//TODO //crud



//Escuchar peticiones
app.listen( process.env.PORT, ()=>{
    console.log(`servidor en puerto ${process.env.PORT}`);
})