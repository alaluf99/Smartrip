// var unirest = require("unirest");
var fetch = require('node-fetch');
var html2json = require('html2json').html2json;


const HotelsApiService = {

    /**
     * The function return a list of the hotels based on the parameters it gets
     * @param {*} requestData 
     */
    async getHotels(requestData) {
        const hotels = await unirest.get("https://hotels4.p.rapidapi.com/properties/list")
                        .headers({
                            "x-rapidapi-key": "0a0c5b3780mshd0d65ee11a2b5c1p1da9bajsn2149d98b4845",
                            "x-rapidapi-host": "hotels4.p.rapidapi.com",
                            "useQueryString": true
                        })
                        .send(requestData)
                        .end().exec();

        return hotels.data.body.searchResults.results;
    }

    // async getHotels() {
    //     const url = 'https://www.booking.com/searchresults.en-gb.html?label=gen173nr-1FCAEoggJCAlhYSDNYBGgxiAEBmAEuwgEDYWJuyAEO2AEB6AEB-AELkgIBeagCBA&sid=1964712b1d001062109ae5baf669fd26&checkin_month=12&checkin_monthday=1&checkin_year=2018&checkout_month=12&checkout_monthday=2&checkout_year=2018&class_interval=1&dest_id=20088325&dest_type=city&dtdisc=0&from_sf=1&group_adults=1&group_children=0&inac=0&index_postcard=0&label_click=undef&no_rooms=1&offset=0&postcard=0&raw_dest_type=city&room1=A&sb_price_type=total&src=index&src_elem=sb&ss=New%20York&ss_all=0&ssb=empty&sshis=0&ssne=New%20York&ssne_untouched=New%20York&selected_currency=USD&changed_currency=1&top_currency=1&nflt='
    //     const model = '.sr_item'
 
    //     fetch(url)
    //     .then((res) => {
    //         return res.text();
    //     })
    //     .then((body) => {
    //         var startIndex = body.indexOf('<div class="hotellist');
    //         console.log(startIndex);
    //         console.log(html2json(body));
    //     })
    //     .catch(console.error)
    //         }
}

module.exports = HotelsApiService;