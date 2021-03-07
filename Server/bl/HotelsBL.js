var Graph = require("@dagrejs/graphlib").Graph;
var algs = require("@dagrejs/graphlib").alg;
var HotelsApiService = require("../services/HotelsApiService");
const graphOptions = {
                        directed: true
                     };

const HotelsBL = {

    async calculateTrip(requestData) {
        var options = await HotelsBL.getHotelOptions(requestData);

        var graph = await HotelsBL.getHotelsGraph(options, requestData.startDate , requestData.endDate);

        var path = await HotelsBL.getBestPathes(graph);

        return path;
    },

    /**
     * The function get requestData
     * Returns all the options for hotels based on dates
     * @param {*} requestData 
     */
    async getHotelOptions(requestData) {
        // getting all the dates pairs between the 2 dates
        var datesOptions = HotelsBL.getDaysOptionsBetween(new Date(requestData.startDate),
                                                 new Date(requestData.endDate));
        var allOptions = [];

        // for each date pair
        for (var dates of datesOptions) {
            // creating the search data
            var hotelsApiData = {
                destinationId: requestData.location,
                pageNumber: 1,
                checkIn: dates.checkIn,
                checkOut: dates.checkOut,
                pageSize: 5,
                adults1: requestData.adults,
                currency: 'USD',
                locale:'en_US',
                sortOrder: 'PRICE'
            }

            // getting the hotels for the current dates pair
            var options = await HotelsApiService.getHotels(hotelsApiData);

            // for every hotel option, add checkIn, checkOut and price, and put in allOtions
            for (var option of options) {
                option.checkIn = dates.checkIn;
                option.checkOut = dates.checkOut;
                option.price = option.ratePlan.price.exactCurrent;

                allOptions.push(option);
            }
        }

        return allOptions;
    },

    /**
     * gets all the possible pairs of dates between 2 dates
     * @param {*} startDate - starting date
     * @param {*} endDate - ending date
     * @returns - an array full of checkIn-checkOut pairs
     */
    getDaysOptionsBetween(startDate, endDate) {
        // calculate the amount of nights between the 2 dates
        var nightsBetween = Math.ceil((Math.abs(startDate.getTime() - endDate.getTime())) / (1000 * 3600 * 24));

        // variable to save all the pairs
        var datesPairs = [];

        // if there is only 1 night, the only pair is the (startDate, endDate)
        if (nightsBetween < 2) {
            datesPairs.push({checkIn:startDate, checkOut: endDate});
        } else {
            // an array to hold all the dates between
            var datesBetween = [];
            datesBetween.push(new Date(startDate));
            
            // inserting all the dates between the 2 dates
            while (startDate < endDate) {
                startDate.setDate(startDate.getDate() + 1);
                datesBetween.push(new Date(startDate));
            }

            // for each pair of dates, insert it into the array
            for (var i = 0; i < datesBetween.length - 1; i++) {
                for (var j = i + 1; j < datesBetween.length; j++) {
                    datesPairs.push({checkIn: datesBetween[i].toISOString().split("T")[0],
                                     checkOut: datesBetween[j].toISOString().split("T")[0]});
                }
            }
        }

        return datesPairs;
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

        while (currNode !== "startNode") {
            currNode = dijkstraResults[currNode].predecessor

            if (currNode !== "startNode") {
                path.push(graph.node(currNode));
            }
        }
        
        return path.reverse();
    }
}

module.exports = HotelsBL;