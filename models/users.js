'use strict'

const mongoose = require('mongoose');
var Schema = mongoose.Schema;

var UserSchema = Schema({
    name: String,
    apellido: String,
    edad: Number,
    idUser: Number,
    grupos: Array,
    materias: Array,
    email: String,
    password: String
});

module.exports = mongoose.model('usuarios',UserSchema);