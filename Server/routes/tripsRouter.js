var express = require("express");
var tripsRouter = express.Router();
var tripsController = require("../controllers/tripsController");
var fbAuth = require("../utils/fbAuth");

tripsRouter.get("/history", fbAuth, tripsController.getTrips);
tripsRouter.post("/plan", fbAuth, tripsController.planTrip);
tripsRouter.get("/suggestions", fbAuth, tripsController.getSuggestions);

module.exports = tripsRouter;
