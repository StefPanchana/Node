'use strict'

require('dotenv').config();
var jwt = require('jsonwebtoken');
var Sessions = require('../models/accesstoken');

var middleware = {

    userprotectUrl: function (req, res, next) {

        const token = req.headers['x-nodeproject-access-token'];

        if (token){
            jwt.verify(token, process.env.KEY, (err, decode)=>{
                if (err){
                    return res.status(401).send({
                        status:401,
                        message: "Token no valido"
                    });
                }
                else{
                    req.decode = decode;

                    Sessions.findOne({user:req.decode.user.email, key:token, active:true})
                    .then(session =>{
                        if (!session){
                            return res.status(401).send({
                                status: 401,
                                message: "Sesion Invalida."
                            });
                        }
                        else{
                            next();
                        }
                    })
                    .catch();
                }
            });
        }
        else{
            return res.status(401).send({
                status:401,
                message: "Datos no validos"
            });
        }
    }

}

module.exports = middleware;