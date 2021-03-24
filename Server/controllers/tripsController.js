var tripsService = require('../services/tripsService');

const tripsController = {
    async getTrips(req,res) {
        try{
            var trips = await tripsService.getTrips(req.user.handle);
            return res.status(200).json({data:trips});
        } catch(e) {
            console.error(e);
            return res.status(400).json({error:e.message});
      }
    },
    async getTrip(req,res) {

    },
    async addNewTrip(req,res) {},
}

module.exports = tripsController;