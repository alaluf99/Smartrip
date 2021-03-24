const hotelsBL = require('../BL/HotelsBL');

const HotelsController = {

    async calculateTrip(req, res, next) {
        res.send(await hotelsBL.calculateTrip(req.body));
    }
}

module.exports = HotelsController;