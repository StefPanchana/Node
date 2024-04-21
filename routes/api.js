'use strict'

const express = require('express');
const {body} = require('express-validator');
var api = express.Router();
var middleware = require('../middleware/middleware');

var UsersController = require('../controllers/user');
var AuthController = require('../controllers/auth');

//Loggin
api.post('/loggin', [
  body("email").not().isEmpty(),
  body("password").not().isEmpty(),
],AuthController.loggin_user);

//Logout
api.post('/logout', middleware.userprotectUrl, AuthController.logout_user);

//Usuarios
//Read
api.get('/user', middleware.userprotectUrl, UsersController.userlist);
api.get('/user/:idUser', [
  body("idUser").not().isEmpty(),
], middleware.userprotectUrl, UsersController.userById);
//Create
api.post('/user', [
  body("idUser").not().isEmpty(),
  body("name").not().isEmpty(),
  body("apellido").not().isEmpty(),
  body("edad").not().isEmpty(),
  body("email").not().isEmpty()
],middleware.userprotectUrl, UsersController.createuser);
//Update
api.put('/user/:idUser',[
  body("idUser").not().isEmpty(),
  body("name").not().isEmpty(),
  body("apellido").not().isEmpty(),
  body("edad").not().isEmpty()
],middleware.userprotectUrl, UsersController.updateuser);
//Delete
api.delete('/user/:idUser', [
  body("idUser").not().isEmpty(),
],middleware.userprotectUrl, UsersController.deleteuser);

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