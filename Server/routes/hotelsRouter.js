var express = require('express');
var hotelsRouter = express.Router();
var hotelController = require('../controllers/hotelsController');

hotelsRouter.get("/try", hotelController.calculateTrip);

module.exports = hotelsRouter;