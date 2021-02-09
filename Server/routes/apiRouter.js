var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');

router.use('/users', usersRouter);

module.exports = router;