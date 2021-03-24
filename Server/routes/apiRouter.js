var express = require('express');
var router = express.Router();
var usersRouter = require('./usersRouter');
var hotelsRouter = require('./hotelsRouter');
var tripsRouter = require('./tripsRouter');

router.use('/users', usersRouter);
router.use('/hotels', hotelsRouter);
router.use('/trips', tripsRouter);

module.exports = router;