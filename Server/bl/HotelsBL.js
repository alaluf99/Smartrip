var Graph = require("@dagrejs/graphlib").Graph;
var algs = require("@dagrejs/graphlib").alg;
var HotelsApiService = require("../services/HotelsApiService");
const graphOptions = {
                        directed: true
                     };

const HotelsBL = {

    async calculateTrip(requestData) {
        var requestData = {
            destinationId: 1506246,
            pageNumber: 1,
            checkIn: '2021-03-06',
            checkOut: '2021-03-09',
            pageSize: 25,
            adults1: 2,
            currency: 'USD',
            locale:'en_US',
            sortOrder: 'PRICE'
        };

        var options = await HotelsBL.getHotelOptions(requestData);

        var graph = await HotelsBL.getHotelsGraph(options, requestData.checkIn, requestData.checkOut);

        var path = await HotelsBL.getBestPathes(graph);

        return path;
    },

    /**
     * The function get requestData
     * Returns all the options for hotels based on dates
     * @param {*} requestData 
     */
    async getHotelOptions(requestData) {
        var options = await HotelsApiService.getHotels(requestData);

        for (var option of options) {
            option.checkIn = requestData.checkIn;
            option.checkOut = requestData.checkOut;
            option.price = option.ratePlan.price.exactCurrent;
        }

        return options;
    },

    /**
     * The function will get an array of hotels and will transform it to a weighted directed graph.
     * The weight will be based on: Price, room rate and distance
     * Returns a weighted directed graph
     * @param {*} hotels - an array of all the hotels
     */
    async getHotelsGraph(hotels, startCheckIn, lastCheckOut) {
        var g = new Graph(graphOptions);
        g.setNode("startNode", {});
        g.setNode("endNode", {});

        // creating a node in the graph for each hotel option
        hotels.forEach(element => {
            g.setNode(HotelsBL.getHotelOptionId(element), element);
        });

        // making edges between 
        for (var i = 0; i < hotels.length; i++) {
            var from = hotels[i];

            // calculate the numbers of nights in the hotel for this option
            var checkInDate = new Date(from.checkIn);
            var checkOutDate = new Date(from.checkOut);
            var nightsInFirstHotel = Math.ceil((Math.abs(checkOutDate.getTime() - checkInDate.getTime())) / (1000 * 3600 * 24));

            // find a weight to add here, maybe based on distance and price
            var weight = nightsInFirstHotel * from.price - from.starRating;
            
            // if this is a starting edge, 
            if (from.checkIn === startCheckIn) {
                g.setEdge("startNode", HotelsBL.getHotelOptionId(from), 0);
            }

            if (from.checkOut == lastCheckOut) {
                g.setEdge(HotelsBL.getHotelOptionId(from), "endNode", weight);
            } else {
                for (var j = 0; j < hotels.length; j++) {
                    if (i != j && hotels[i].checkOut === hotels[j].checkIn) {
                        var to = hotels[j];

                        g.setEdge(HotelsBL.getHotelOptionId(from), HotelsBL.getHotelOptionId(to), weight);
                    }
                }
            }
        }

        return g;
    },

    /**
     * The function gets an hotel option and gives the option a unique id;
     * TODO: for now will only give the best option
     * @param {} hotel 
     */
    getHotelOptionId(hotel) {
        return hotel.id.toString() + hotel.checkIn.toString() + hotel.checkOut.toString();
    },

    /**
     * The function return a sorted array of options. 
     * Each option is a path that was found to be "the best" path
     * Returns an array with pathes
     * @param {*} graph - a weighted directed graph that we want to run distance vector algorithem on.
     */
    async getBestPathes(graph) {
        
        var dijkstraResults = algs.dijkstra(graph, "startNode", function(edge) {
            return graph.edge(edge);
        });

        var currNode = "endNode";
        var path = [];
        path.push(currNode);

        while (currNode !== "startNode") {
            currNode = dijkstraResults[currNode].predecessor
            path.push(currNode);
        }

        return path.reverse();
    }
}

module.exports = HotelsBL;