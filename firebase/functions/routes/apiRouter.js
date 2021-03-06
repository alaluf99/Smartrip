var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var tripsRouter = require('./tripsRouter');

router.use('/users', usersRouter);
router.use('/trips',tripsRouter);

module.exports = router;