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
                                                 new Date(requestData.endDate),
                                                 requestData.locations);
        var allOptions = [];
        var optionPromises = [];

        // for each date pair
        for (var dates of datesOptions) {
            // creating the search data
            var hotelsApiData = {
                location: dates.location,
                checkIn: dates.checkIn,
                checkOut: dates.checkOut,
                people: requestData.people,
            }

            // getting the promise to get the hotels data, and pushing it into an array with all of
            // the other promises.
            optionPromises.push(HotelsApiService.getHotels(hotelsApiData));
        }

        // getting the hotels for all of the date pairs
        var optionsForDays = await Promise.all(optionPromises);

        // for every hotel option, add checkIn, checkOut and price, and put in allOtions
        for (var options of optionsForDays) {
            for (var hotel of options.hotels[0]) {
                hotel.checkIn = options.checkIn;
                hotel.checkOut = options.checkOut;
                hotel.location = options.location;

                allOptions.push(hotel);
            }
        }

        return allOptions;
    },

    /**
     * gets all the possible pairs of dates between 2 dates
     * @param {*} startDate - starting date
     * @param {*} endDate - ending date
     * @param {{location, startDate, endDate, isflexible}} - an array with all the wanted locations, 
     *                          and how much nights we want to be at them
     * @returns - an array full of checkIn-checkOut pairs, with a location to each pair
     */
    getDaysOptionsBetween(startDate, endDate, locations) {
        // calculate the amount of nights between the 2 dates
        var nightsBetween = Math.ceil((Math.abs(startDate.getTime() - endDate.getTime())) / (1000 * 3600 * 24));

        // variable to save all the pairs
        var datesPairs = [];

        // if there is only 1 night, the only pair is the (startDate, endDate) and it's to the first location
        if (nightsBetween < 2) {
            datesPairs.push({checkIn:startDate.toISOString().split("T")[0],
                            checkOut: endDate.toISOString().split("T")[0],
                            location: locations[0].location});
        } else {
            // an array to hold all the dates between
            var datesBetween = [];
            datesBetween.push({date: new Date(startDate)});
            
            // inserting all the dates between the 2 dates
            while (startDate < endDate) {
                startDate.setDate(startDate.getDate() + 1);
                datesBetween.push({date: new Date(startDate)});
            }

            // getting all the flexible and notflexible locations
            var flexibleLocations = locations.filter(loc => loc.isFlexible);
            var notflexibleLocations = locations.filter(loc => !loc.isFlexible);

            // running on all of the not flexible locations to mark the dates as not flexible.
            for (var i = 0; i < notflexibleLocations.length; i++) {
                var currLocation = notflexibleLocations[i];
                for (date of datesBetween) {
                    // if it is a date of other location that isn't flexible then there is no need to check
                    if (date.notFlexIndex == null) {
                        let locationStartDate = new Date(currLocation.startDate);
                        let locationEndDate = new Date(currLocation.endDate);

                        if (locationStartDate <= date.date && locationEndDate >= date.date) {
                            date.notFlexIndex = i;
                        }
                    }
                }
            }

            // for each pair of dates, insert it into the array
            for (var i = 0; i < datesBetween.length - 1; i++) {
                for (var j = i + 1; j < datesBetween.length; j++) {
                    var firstDate = datesBetween[i];
                    var secondDate = datesBetween[j];

                    // if there is a mandatory location for those dates (must be the same),
                    // than adding only this location as an option
                    if (firstDate.notFlexIndex && secondDate.notFlexIndex && (firstDate.notFlexIndex == secondDate.notFlexIndex)) {
                        datesPairs.push({checkIn: firstDate.date.toISOString().split("T")[0],
                                     checkOut: secondDate.date.toISOString().split("T")[0],
                                     location: notflexibleLocations[firstDate.notFlexIndex]})
                    } else if(!firstDate.notFlexIndex && !secondDate.notFlexIndex) {
                        // adding an option for this dates pair for all the locations
                        for (var loc of flexibleLocations) {
                            datesPairs.push({checkIn: firstDate.date.toISOString().split("T")[0],
                                        checkOut: secondDate.date.toISOString().split("T")[0],
                                        location: loc.location});
                        }
                    }
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

            // find a weight to add here, maybe based on distance and price
            var weight = from.price - from.star;
            
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
        return hotel.name.replace(/ /g, '') + hotel.checkIn.toString() + hotel.checkOut.toString();
    },

    /**
     * The function return a sorted array of options. 
     * Each option is a path that was found to be "the best" path
     * Returns an array with pathes
     * @param {*} graph - a weighted directed graph that we want to run distance vector algorithem on.
     */
    async getBestPathes(graph) {
        
        var dijkstraResults = algs.dijkstra(graph, "startNode", function(edge, pathsSoFar, w) {
            // if we already found a path up till this node and it's not the endNode
            if (pathsSoFar[w].predecessor != null && edge.w !== "endNode") {
                var currNode = edge.v;
                var nextNode = graph.node(edge.w);
                var locations = [];

                // getting all of the locations we already been into
                while (currNode !== "startNode") {
                    var node = graph.node(currNode);
                    if (locations.indexOf(node.location) == -1) {
                        locations.push(node.location);
                    }
                    
                    currNode = pathsSoFar[currNode].predecessor
                }

                // if the next locations isn't like the last hotel and isn't new location,
                // the weight is infinity so we won't go back to an old location
                var index = locations.indexOf(nextNode.location);
                if (index != -1 && index != 0) {
                    return Number.POSITIVE_INFINITY;
                }
            }

            return graph.edge(edge);
        });

        var currNode = "endNode";
        var path = [];

        while (currNode !== "startNode" && currNode !== null) {
            currNode = dijkstraResults[currNode].predecessor

            if (currNode !== "startNode") {
                path.push(graph.node(currNode));
            }
        }
        
        return path.reverse();
    }
}

module.exports = HotelsBL;