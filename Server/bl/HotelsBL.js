var Graph = require("@dagrejs/graphlib").Graph;
var algs = require("@dagrejs/graphlib").alg;
var HotelsApiService = require("../services/HotelsApiService");
const graphOptions = {
                        directed: true
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
     * The function will get an array of hotels and will transform it to a weighted directed graph.
     * The weight will be based on: Price, room rate and distance
     * Returns a weighted directed graph
     * @param {*} hotels - an array of all the hotels
     */
    async getHotelsGraph(hotels, startCheckIn) {
        var g = new Graph(graphOptions);
        g.setNode("startNode", {});

        // creating a node in the graph for each hotel option
        hotels.forEach(element => {
            g.setNode(this.getHotelOptionId(elemnt), element);
        });

        // making edges between 
        for (var i = 0; i < hotels.length; i++) {
            // if this is a starting edge, 
            if (hotels[i].checkIn === startCheckIn) {
                g.setEdge("startNode", this.getHotelOptionId(hotels[i]));
            }

            for (var j = 0; j < hotels.length; j++) {
                if (i != j && hotels[i].checkOut === hotels[j].checkIn) {
                    // find a weight to add here, maybe based on distance and price
                    g.setEdge(this.getHotelOptionId(hotels[i]), this.getHotelOptionId(hotels[j]));
                }
            }
        }
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
     * @param {*} graph - a weighted directed graph that we want to run distance vector algorithem on.
     */
    async getBestPathes(graph) {

    }
}

module.exports = HotelsBL;