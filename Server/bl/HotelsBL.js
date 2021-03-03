var Graph = require("@dagrejs/graphlib").Graph;
var HotelsApiService = require("../services/HotelsApiService");
const graphOptions = {
                        directed: false
                     };

const HotelsBL = {

    async calculateTrip(requestData) {
        
    },

    /**
     * The function get requestData
     * Returns all the options for hotels based on dates
     * @param {*} requestData 
     */
    async getHotelOptions(requestData) {

    },

    /**
     * The function will get an array of hotels and will transform it to a weighted undirected graph.
     * The weight will be based on: Price, room rate and distance
     * Returns a weighted undirected graph
     * @param {*} hotels - an array of all the hotels
     */
    async getHotelsGraph(hotels) {
        var g = new Graph(graphOptions);

        hotels.forEach(element => {
            g.setNode(this.getHotelOptionId(elemnt), element);
        });

        
    },

    /**
     * The function gets an hotel option and gives the option a unique id;
     * @param {} hotel 
     */
    async getHotelOptionId(hotel) {
        return hotel.id.toString() + hotel.checkIn.toString() + hotel.checkOut.toString();
    },

    /**
     * The function return a sorted array of options. 
     * Each option is a path that was found to be "the best" path
     * Returns an array with pathes
     * @param {*} graph - a weighted undirected graph that we want to run distance vector algorithem on.
     */
    async getBestPathes(graph) {

    }
}

module.exports = HotelsBL;