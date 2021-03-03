var express = require('express');
var hotelsRouter = express.Router();
var apiService = require('../services/HotelsApiService');

hotelsRouter.get("/try", apiService.getHotels);

module.exports = hotelsRouter;