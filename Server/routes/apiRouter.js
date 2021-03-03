var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var hotelsRouter = require('./hotelsRouter');

router.use('/users', usersRouter);
router.use('/hotels', hotelsRouter);

module.exports = router;