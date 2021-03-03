var unirest = require("unirest");

const HotelsApiService = {

    async getHotels(requestData) {
        const hotels = await unirest.get("https://hotels4.p.rapidapi.com/properties/list")
                        .headers({
                            "x-rapidapi-key": "0a0c5b3780mshd0d65ee11a2b5c1p1da9bajsn2149d98b4845",
                            "x-rapidapi-host": "hotels4.p.rapidapi.com",
                            "useQueryString": true
                        })
                        .send(requestData)
                        .end().exec();

        return hotels;
    }
}

module.exports = HotelsApiService;