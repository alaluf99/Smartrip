var express = require('express');
var tripsRouter = express.Router();
var tripsController = require('../controllers/tripsController');
var fbAuth = require('../utils/fbAuth');

tripsRouter.get('/', fbAuth, tripsController.getTrips);
tripsRouter.get('/plan', fbAuth, tripsController.planTrip);

module.exports = tripsRouter;