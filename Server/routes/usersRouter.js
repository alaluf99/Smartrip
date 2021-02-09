var express = require('express');
var usersRouter = express.Router();
var UsersController = require('../controllers/usersController');

usersRouter.post('/login', UsersController.loginUser);

usersRouter.post('/register', UsersController.registerUser);

module.exports = usersRouter;