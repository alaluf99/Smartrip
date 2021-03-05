const express = require('express');
const tripsRouter = express.Router();
const { getTrips } = require('../handlers/tripsHandler');
const FBauth = require('../utils/fbAuth');

tripsRouter.get('/', FBauth, getTrips);

module.exports = tripsRouter;
