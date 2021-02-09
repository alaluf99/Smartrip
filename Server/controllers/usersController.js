const usersService = require('../services/usersService');

const UsersController = {

    async registerUser(req, res, next) {
        usersService.registerUser(user);
    },
    
    async loginUser(req, res, next) {
    
    },
}

module.exports = UsersController;