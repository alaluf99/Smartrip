const hotelsBL = require('../bl/HotelsBL');

const HotelsController = {

    async calculateTrip(req, res, next) {
        res.send(await hotelsBL.calculateTrip(req.body, 5));
    }
}

module.exports = HotelsController;
