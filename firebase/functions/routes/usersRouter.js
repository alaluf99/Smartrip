const express = require('express');
const usersRouter = express.Router();
const { logIn, signUp, getUserTrips } = require('../handlers/usersHandler');

usersRouter.post('/signup', signUp);
usersRouter.post('/login', logIn);

usersRouter.get('/', (req,res)=> {
    res.send('arrive');
});

module.exports = usersRouter;