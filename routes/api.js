'use strict'

const express = require('express');
const {body} = require('express-validator');
var api = express.Router();

var UsersController = require('../controllers/user');

//Usuarios
//Read
api.get('/user', UsersController.userlist);
api.get('/user/:idUser', UsersController.userById);
//Create
api.post('/user', [
  body("idUser").not().isEmpty(),
  body("name").not().isEmpty(),
  body("apellido").not().isEmpty(),
  body("edad").not().isEmpty(),
  body("email").not().isEmpty()
]
,UsersController.createuser);
//Update
api.put('/user/:idUser',[
  body("idUser").not().isEmpty(),
  body("name").not().isEmpty(),
  body("apellido").not().isEmpty(),
  body("edad").not().isEmpty()
], UsersController.updateuser);
//Delete
api.delete('/user/:idUser', [
  body("idUser").not().isEmpty(),
],UsersController.deleteuser);

//Read
//Version inicia de la llamada de la api
/* api.get('/', (req, res) => {
    res.send('Hello World!, estamos aqui nuevamente')
  }) */
//Create
/* api.post('/', (req, res) => {
    console.log(req.body);
    res.send('Hello World!, estamos aqui nuevamente')
}) */
//Update
/* api.put('/user', (req, res) => {
res.send('Hello World!, estamos aqui nuevamente')
}) */
//Delete
/* api.delete('/user', (req, res) => {
res.send('Hello World!, estamos aqui nuevamente')
}) */

module.exports = api;