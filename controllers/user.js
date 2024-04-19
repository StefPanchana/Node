'use strict'

var Users = require('../models/users');
const {validationResult} = require('express-validator')

var controller = {

    userlist : function(req, res){
        Users.find({
            /* name:"Stef" */
        })
        .then(usuarios =>{
            console.log(usuarios);
            return res.status(200).send({
                status: 200,
                message: "Usuarios listados",
                data: usuarios
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Error detectado"
            });
        });
    },

    userById: function(req, res){
        console.log(req.params.idUser);
        Users.findOne({
            idUser: parseInt(req.params.idUser)
        })
        .then(usuarios =>{
            console.log(usuarios);
            return res.status(200).send({
                status: 200,
                message: usuarios==null? "No se encontro registro de usuario.":"Información de Usuario.",
                data: usuarios
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Error detectado"
            });
        });
    },

    createuser : function(req, res){

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors: errors.array()
            });
        }

        var data = req.body;

        //Verificar usuario existente antes de crear un registro nuevo
        Users.findOne({
            idUser: parseInt(data.idUser)
        })
        .then(usuarios =>{

            //Validacion de usuario duplicado
            if (usuarios){
                return res.status(400).send({
                    status: 400,
                    message: "Usuario ya existe en BD."
                });
            }
            
            //Continuar proceso de creacion de usuario
            var create_user = new Users();
            create_user.idUser = data.idUser;
            create_user.name = data.name;
            create_user.edad = data.edad;
            create_user.apellido = data.apellido;
            create_user.grupos = data.grupos;
            create_user.materias = data.materias;
            create_user.email = data.email;

            create_user.save()
            .then(result =>{
                console.log(result);
                return res.status(200).send({
                    status: 200,
                    message: "Usuario Creado con Exito.",
                    data: result
                });
            })
            .catch(error => {
                console.error(error);
                return res.status(500).send({
                    status: 500,
                    message: "No se grabo el usuario."
                });
            });
            
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "Error detectado"
            });
        });
    },

    updateuser : function(req, res){

        const errors = validationResult(req);

        if (!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors: errors.array()
            });
        }

        console.log(req.params.idUser);

        var data = req.body;

        var update_user = {
            idUser: data.idUser,
            name: data.name,
            apellido: data.apellido,
            edad: data.edad,
            grupos: data.grupos,
            materias: data.materias,
            email: data.email
        }

        Users.findOneAndUpdate({
            idUser: parseInt(req.params.idUser)
        },
        update_user)
        .then(usuario =>{
            return res.status(200).send({
                status: 200,
                message: usuario==null? "No se encontro registro de usuario.": "Usuario Actualizado."
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "No se pudo actualizar el usuario"
            });
        });
    },

    deleteuser : function(req, res){

        const errors = validationResult(req);
        
        if (!errors.isEmpty()){
            return res.status(400).send({
                status:400,
                errors: errors.array()
            });
        }

        console.log(req.params.idUser);

        Users.findOneAndDelete({
            idUser: parseInt(req.params.idUser)
        })
        .then(usuario =>{
            return res.status(200).send({
                status: 200,
                message: usuario==null? "No se encontro registro de usuario.": "Usuario Eliminado con Exito."
            });
        })
        .catch(error => {
            console.error(error);
            return res.status(500).send({
                status: 500,
                message: "No se pudo eliminar el usuario"
            });
        });
    }

};

module.exports = controller;