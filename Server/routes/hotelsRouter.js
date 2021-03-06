var express = require('express');
var hotelsRouter = express.Router();
var HotelsBL = require('../BL/HotelsBL');

hotelsRouter.get("/try", HotelsBL.calculateTrip);

module.exports = hotelsRouter;