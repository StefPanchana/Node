'use strict'

const mongoose = require('mongoose');
var app = require('./app');
var port = 3000;

mongoose.Promise = global.Promise;
mongoose.connect('mongodb+srv://gatitobebe90:Gatiko$12@cluster0.i4jz0mg.mongodb.net/curso', { useNewUrlParser: true, useUnifiedTopology: true})
.then(
    () =>{
        console.log("Conexión exitosa!");
        
        var server = app.listen(port, () => {
            console.log(`Example app listening on port ${port}`)
          });

        server.timeout = 120000;
    }
)
.catch(err => console.log("Error en la conexion a la BD:" + err));

