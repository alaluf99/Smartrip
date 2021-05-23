var unirest = require("unirest");
const { exec } = require("child_process");
const fs = require('fs');
const e = require("cors");
const { SSL_OP_EPHEMERAL_RSA } = require("constants");
const { getHotelOptions } = require("../bl/HotelsBL");

// var destinationsId = null;
// var firstCallDate = null;
// var counterCalls = 0;

const HotelsApiService = {

    /**
     * The function return a list of the hotels based on the parameters it gets
     * @param {*} requestData 
     */
    // async getHotels(requestData) {
    //     return new Promise((resolve, reject) => {
    //         if (firstCallDate == null) {
    //             firstCallDate = new Date();
    //         } else if (((new Date()).getTime - firstCallDate.getTime())/ 1000 > 1) {
    //             firstCallDate = null;
    //             counterCalls = 0;
    //         } else {
    //             if (counterCalls++ < 5) {}
    //             else {
    //                 const date = Date.now();
    //                 let currentDate = null;
    //                 do {
    //                     currentDate = Date.now();
    //                 } while (currentDate - date < 1000);

    //                 firstCallDate = null;
    //                 counterCalls = 0;
    //             }
    //         }

    //         unirest("GET","https://hotels4.p.rapidapi.com/properties/list")
    //             .headers({
    //                 "x-rapidapi-key": "0a0c5b3780mshd0d65ee11a2b5c1p1da9bajsn2149d98b4845",
    //                 "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //                 "useQueryString": true
    //             })
    //             .query(requestData)
    //             .then(response => {
    //                 if (response.body.data == null) {
    //                     console.table(response);
    //                     console.log(response);
    //                     reject(err);
    //                 }

    //                 var hotels = {hotels: response.body.data.body.searchResults.results};
    //                 hotels.checkIn = requestData.checkIn;
    //                 hotels.checkOut = requestData.checkOut;
    //                 hotels.locationId = requestData.destinationId;
    //                 hotels.location = requestData.location;
    //                 resolve(hotels);
    //             }).catch(err => {
    //                 console.log("err");
    //                 reject(err);
    //             });
    //     })
    // },

    // async getDestinationId(dest) {
    //     return new Promise(async (resolve, reject) => {
    //         dest = dest.toLowerCase();

    //         if(destinationsId == null) {
    //             destinationsId = JSON.parse(fs.readFileSync("locationsId.json"))
    //         }

    //         if(destinationsId[dest] != null) {
    //             resolve(destinationsId[dest]);
    //         } else {
    //             try {
    //                 var body = await unirest("GET","https://hotels4.p.rapidapi.com/locations/search")
    //                     .headers({
    //                         "x-rapidapi-key": "0a0c5b3780mshd0d65ee11a2b5c1p1da9bajsn2149d98b4845",
    //                         "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //                         "useQueryString": true
    //                     })
    //                     .query({"query": dest,
    //                             "locale": "en_US"});

    //                 destinationsId[dest] = body.body.suggestions[0].entities[0].destinationId;

    //                 fs.writeFile('locationsId.json', JSON.stringify(destinationsId), 'utf8', ()=>{});

    //                 resolve(destinationsId[dest]);
    //             } catch(e) {
    //                 console.log(e);
    //                 reject(e);
    //             }
    //         }
    //     });
    // }

    async getHotels(requestData) {
        return new Promise( async (resolve, reject) => {
        var fileName = requestData.location.replace(/ /g, '') + requestData.checkIn + requestData.checkOut +
            (new Date()).getSeconds().toString() + (new Date()).getMilliseconds().toString()  + ".json";
        var pythonUrl = '--city "' + requestData.location + '" --limit 1 --datein "' + requestData.checkIn + 
            '" --dateout "' + requestData.checkOut + '" --people ' + requestData.people + ' --outdir "./' + fileName + '"';

        await this.callPython(pythonUrl);
        
        var hotels = {hotels: JSON.parse(fs.readFileSync(fileName))};
        hotels.checkIn = requestData.checkIn;
        hotels.checkOut = requestData.checkOut;
        hotels.locationName = requestData.location
        hotels.location = requestData.location.replace(/ /g, '');

        try {
            fs.unlink(fileName, () => {});
        } catch(e) {}

        resolve(hotels);
        });
    },

    async callPython(url) {
        return new Promise((resolve, reject) => {
            exec("python -m booking_scraper.bkscraper " + url, (error, stdout, stderr) => {
                if (error) {
                    console.log(`error: ${error.message}`);
                    reject(error.message)
                }
                
                resolve();
            });
        });
    }
}

module.exports = HotelsApiService;