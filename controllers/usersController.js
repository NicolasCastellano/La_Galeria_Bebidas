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
}

module.exports = usersController;