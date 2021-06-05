var tripsService = require("../services/tripsService");

const tripsController = {
  async getTrips(req, res) {
    try {
      //var trips = await tripsService.getTrips(req.user.email);
      var trips = await tripsService.getTripsByUserId(req.user.user_id);
      return res.status(200).json({ data: trips });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: e.message });
    }
  },
  async addNewTrip(req, res) {},
  async planTrip(req, res) {
    try {
      var plan = await tripsService.planTrip(req.body, req.user.user_id);
      return res.status(200).json({ data: plan });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: e.error });
    }
  },
  async getSuggestions(req, res) {
    try {
      var plan = await tripsService.getSuggestions(
        req.header("numberOfSuggestions")
      );
      return res.status(200).json({ data: plan });
    } catch (e) {
      console.error(e);
      return res.status(400).json({ error: e.error });
    }
  },
};

module.exports = tripsController;
