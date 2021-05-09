var unirest = require("unirest");
const { exec } = require("child_process");
const fs = require('fs');
//var fetch = require('node-fetch');
//var html2json = require('html2json').html2json;


const HotelsApiService = {

    /**
     * The function return a list of the hotels based on the parameters it gets
     * @param {*} requestData 
     */
    // async getHotels(requestData) {
    //     return new Promise((resolve, reject) => {
    //         unirest("GET","https://hotels4.p.rapidapi.com/properties/list")
    //             .headers({
    //                 "x-rapidapi-key": "0a0c5b3780mshd0d65ee11a2b5c1p1da9bajsn2149d98b4845",
    //                 "x-rapidapi-host": "hotels4.p.rapidapi.com",
    //                 "useQueryString": true
    //             })
    //             .query(requestData)
    //             .then(response => {
    //                 var hotels = {hotels: response.body.data.body.searchResults.results};
    //                 hotels.checkIn = requestData.checkIn;
    //                 hotels.checkOut = requestData.checkOut;
    //                 hotels.location = requestData.destinationId;
    //                 resolve(hotels);
    //             }).catch(err => {
    //                 console.log("err");
    //                 reject(err);
    //             });
    //     })
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
        hotels.location = requestData.location.replace(/ /g, '');

        try {
            fs.unlink(fileName);
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