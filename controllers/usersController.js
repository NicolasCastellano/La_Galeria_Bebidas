const fs = require('fs')
const { validationResult } = require('express-validator')
const usersModel = require('../models/usersModel')
const path = require('path');
const viewsPath = path.join(__dirname, '../')

const usersController = {
    login: function(req, res){
        //res.sendFile(path.resolve(viewsPath, './views/login.ejs'))
        return res.render('users/login')
        
    },
    registro: function(req, res) {
        //res.sendFile(path.resolve(viewsPath, './views/registro.ejs'))
        return res.render('users/registro')
    },
    processRegister: function (req,res){
        const formValidation = validationResult(req)
        const oldValues = req.body
        
        if (!formValidation.isEmpty()) {
            // borrar imagen
            if (req.file) {
                // primero chequeamos que exista
                fs.unlinkSync(req.file.path)
            }
            // tenemos errores
            res.render('users/registro', { oldValues, errors: formValidation.mapped() })
        return  
        } 
        // Crear el objeto usuario
        const { name, lastName, email, password } = req.body;

         // dentro de req.file va a venir la información del archivo
        const { file } = req
        
         // nuestra ruta al archivo
        const image = file.filename

        const user = {
            name,
            lastName,
            email,
            password,
            image: '/images/profile/' + image,
        }
        
        usersModel.create(user);

        res.redirect('/user/login');
    }
}

module.exports = usersController;