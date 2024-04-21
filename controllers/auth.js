'use strict'

var jwt = require('jsonwebtoken');
var Users = require('../models/users');
var Sessions = require('../models/accesstoken');
const {validationResult} = require('express-validator')

var controller = {

    loggin_user: function(req, res){

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors: errors.array()
            });
        }

        var data = req.body;

        Users.findOne({
            email: data.email
        })
        .then(user =>{
            //Validacion de usuario duplicado
            if (user){
                if (data.password == user.password){

                    const payload = {
                        user: user,
                    }

                    let access_token = jwt.sign(payload, process.env.KEY, {
                        expiresIn: '1d'
                    });

                    let today = new Date().toISOString();

                    let update_session = {
                        user: user.email,
                        key: access_token,
                        creationDate: today,
                        expirationDate: '1d',
                        active: true
                    }

                    Sessions.findOneAndUpdate({user:user.email}, update_session, {upsert: true, new:true})
                    .then(session =>{
                        if (!session){
                            return res.status(401).send({
                                status: 401,
                                message: "Usuario no encontrado."
                            });
                        }
                        else{
                            return res.status(200).send({
                                status: 200,
                                message: "Loggin Correcto.",
                                token: access_token
                            });
                        }
                    })
                    .catch();
                }
                else{
                    return res.status(401).send({
                        status: 401,
                        message: "Datos no validos."
                    });
                }
            }
            else{
                return res.status(401).send({
                    status: 401,
                    message: "Datos no validos."
                });
            }
        })
        .catch(error => {
            console.error(error);
            return res.status(401).send({
                status: 401,
                message: "Datos no validos."
            });
        });
    },

    logout_user: function(req, res){
        const token = req.headers['x-nodeproject-access-token'];

        Sessions.findOneAndDelete({
            user: req.decode.user.email,
            key: token
        })
        .then(session =>{
            if (!session){
                return res.status(401).send({
                    status: 401,
                    message: "Token invalido."
                });
            }

            return res.status(200).send({
                status: 200,
                message: "Logout completo satisfactoriamente."
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Token invalido"
            });
        });

    }
}

module.exports = controller;