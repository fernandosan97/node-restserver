const express = require('express');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const bodyParser = require('body-parser');
require('./config/config');

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));

// parse application/json
app.use(bodyParser.json());

// Habilitar carpeta public
// El path me permite crear la ruta a la carpeta public ya que si no lo hag con eso me va a concatenar solo la direccion de carpetas 
// por ejemplo la actual app.use(express.static(__dirname + '../public')) =  server../public y no queremos eso
app.use(express.static(path.resolve(__dirname, '../public')));

// Configuracion global de Rutas
app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB, { useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true }, (err, res) => {
    if (err) throw err;

    console.log('Base de datos ONLINE');
});

app.listen(process.env.PORT, () => {
    console.log('Escuchando en el puerto: ', process.env.PORT);
});