var Graph = require("@dagrejs/graphlib").Graph;
var algs = require("@dagrejs/graphlib").alg;
var dataStruct = require("@dagrejs/graphlib").data;
var HotelsApiService = require("../services/HotelsApiService");
const graphOptions = {
                        directed: true
                     };

const HotelsBL = {

    async calculateTrip(requestData) {
        var options = await HotelsBL.getHotelOptions(requestData);

        var graph = await HotelsBL.getHotelsGraph(options, requestData.startDate , requestData.endDate);

        //var path = await HotelsBL.getBestPathes(graph, HotelsBL.getLocationsDaysJSON(requestData.locations));

        var path = await HotelsBL.calculateAllPathes(graph, HotelsBL.getLocationsDaysJSON(requestData.locations));

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
            //var id = await HotelsApiService.getDestinationId(dates.location);

            // creating the search data
            var hotelsApiData = {
                //destinationId: id,
                location: dates.location,
                checkIn: dates.checkIn,
                checkOut: dates.checkOut,
                people: requestData.people,
                pageNumber: 1,
                pageSize: 5,
                currency: 'USD',
                locale:'en_US',
                sortOrder: 'PRICE'
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
                //hotel.locationId = options.locationId;
                hotel.location = options.location;
                hotel.locationName = options.locationName;
                //hotel.price = hotel.ratePlan.price.exactCurrent;

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
                let locationStartDate = new Date(currLocation.startDate);
                let locationEndDate = new Date(currLocation.endDate);
                    
                for (date of datesBetween) {
                    // if it is a date of other location that isn't flexible then there is no need to check
                    if (date.notFlexIndex == null) {
                        if (locationStartDate <= date.date && locationEndDate >= date.date) {
                            date.notFlexIndex = i;
                        }
                    }
                }
            }

            // for each pair of dates, insert it into the array
            for (var i = 0; i < datesBetween.length - 1; i++) {
                let mandatoryInTheMiddle = false;

                for (var j = i + 1; j < datesBetween.length && !mandatoryInTheMiddle; j++) {
                    var firstDate = datesBetween[i];
                    var secondDate = datesBetween[j];

                    // if there is a mandatory location for those dates (must be the same),
                    // than adding only this location as an option
                    if ((firstDate.notFlexIndex != null) && (secondDate.notFlexIndex != null) && 
                        (firstDate.notFlexIndex == secondDate.notFlexIndex)) {
                        datesPairs.push({checkIn: firstDate.date.toISOString().split("T")[0],
                                     checkOut: secondDate.date.toISOString().split("T")[0],
                                     location: notflexibleLocations[firstDate.notFlexIndex].location})
                    } // else, if both the dates not mandatory for a location, or the second date is
                      // the first date of a mandatory date for location (because we leave in the morning and get
                      // to the hotel in the afternoon)
                    else if(((firstDate.notFlexIndex == null) && (secondDate.notFlexIndex == null)) ||
                            ((firstDate.notFlexIndex == null) && (secondDate.notFlexIndex != null) && 
                             (datesBetween[j - 1].notFlexIndex == null))) {
                        // calculating the nights between the dates to see if a location is more nights then needed
                        var nightsBetween = Math.ceil((Math.abs(secondDate.date.getTime() - firstDate.date.getTime())) / (1000 * 3600 * 24));
                        
                        // adding an option for this dates pair for all the locations
                        for (var loc of flexibleLocations) {
                            if(loc.numberOfDays >= nightsBetween) {
                                datesPairs.push({checkIn: firstDate.date.toISOString().split("T")[0],
                                            checkOut: secondDate.date.toISOString().split("T")[0],
                                            location: loc.location});
                            }
                        }
                    } else {
                        mandatoryInTheMiddle = true;
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
            //var nightsInFirstHotel = Math.ceil((Math.abs(checkOutDate.getTime() - checkInDate.getTime())) / (1000 * 3600 * 24));

            // find a weight to add here, maybe based on distance and price
            var weight = from.price - from.star - from.score;
            
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
        //return hotel.id.toString() + hotel.checkIn.toString() + hotel.checkOut.toString();
        return hotel.name.replace(/ /g, '') + hotel.checkIn.toString() + hotel.checkOut.toString();
    },

    /**
     * The function will return a variable that hold location name as key and number of days there as value
     * @param {*} locations 
     * @returns 
     */
     getLocationsDaysJSON(locations) {
        let daysForLocations = {};

        for (let loc of locations) {
            if (loc.isFlexible) {
                daysForLocations[loc.location] = loc.numberOfDays
            } else {
                daysForLocations[loc.location] = 
                    Math.ceil((Math.abs((new Date(loc.startDate)).getTime() - (new Date(loc.endDate)).getTime())) / (1000 * 3600 * 24));
            }
        }

        return daysForLocations;
    },

    /**
     * The function return a sorted array of options. 
     * Each option is a path that was found to be "the best" path
     * Returns an array with pathes
     * @param {*} graph - a weighted directed graph that we want to run distance vector algorithem on.
     */
    async getBestPathes(graph, locationsRequest) {
        
        var dijkstraResults = algs.dijkstra(graph, "startNode", function(edge, pathsSoFar, w) {
            // if we already found a path up till this node and it's not the endNode
            if (pathsSoFar[w].predecessor != null && edge.w !== "endNode") {
                var currNode = edge.v;
                var nextNode = graph.node(edge.w);
                var locations = [];
                var daysInLocation = {};

                // getting all of the locations we already been into
                while (currNode !== "startNode") {
                    var node = graph.node(currNode);
                    if (locations.indexOf(node.location) == -1) {
                        locations.push(node.location);
                    }

                    var nigthsInNode = Math.ceil((Math.abs((new Date(node.checkIn)).getTime() - (new Date(node.checkOut)).getTime())) / (1000 * 3600 * 24));
                    if (daysInLocation[node.location] == null ) {
                        daysInLocation[node.location] = nigthsInNode;
                    } else {
                        daysInLocation[node.location] += nigthsInNode;
                    }
                    
                    currNode = pathsSoFar[currNode].predecessor
                }

                // if the next locations isn't like the last hotel and isn't new location,
                // the weight is infinity so we won't go back to an old location
                var index = locations.indexOf(nextNode.location);
                if (index != -1 && index != locations.length - 1) {
                    return Number.POSITIVE_INFINITY;
                } else {
                    var nigthsInNextNode = Math.ceil((Math.abs((new Date(nextNode.checkIn)).getTime() - (new Date(nextNode.checkOut)).getTime())) / (1000 * 3600 * 24));

                    if (((daysInLocation[nextNode.location] != null) ? daysInLocation[nextNode.location] : 0) 
                            + nigthsInNextNode > locationsRequest[nextNode.location]) {
                        return Number.POSITIVE_INFINITY;
                    }
                }
            }

            return graph.edge(edge);
        });

        var currNode = "endNode";
        var path = [];
        var totalPrice = 0;
        var startDate, endDate;

        endDate = graph.node(dijkstraResults[currNode].predecessor).checkOut;

        while (currNode !== "startNode" && currNode !== null) {
            currNode = dijkstraResults[currNode].predecessor

            if (currNode !== "startNode") {
                let currHotel = graph.node(currNode);
                path.push(currHotel);
                totalPrice += parseInt(currHotel.price);
                startDate = currHotel.checkIn;
            }
        }
        


        return [{"path": path.reverse(), "startDate": startDate, "endDate": endDate, "totalPrice": totalPrice}];
    },

    /**
     * the function runs on all of the graph and insert the pathes to priority queue
     * @param {*} graph - a weighted directed graph that we want to run distance vector algorithem on.
     * @param {*} locationsRequest - an object with the location id and how many days we want to be there
     */
     calculateAllPathes(graph, locationsRequest) {
         var pq = new dataStruct.priorityQueue();
         var top5 = new dataStruct.priorityQueue();
         var allValidPathes = [];
         var currNode = "startNode";

         HotelsBL.calculatePathesRecursive(currNode, null, null, {path:[], totalPrice: 0, totalScore: 0}, [], {}, allValidPathes, pq, top5, graph, locationsRequest);
         var pathes = [];
         var pathesToReturn = 5

         for(let i = 0; i < pathesToReturn; i++) {
             pathes.push(allValidPathes[pq.removeMin()]);
         }

         return pathes;
     },

     calculatePathesRecursive(currNode, prevNode, edgeWeight, path, locations, daysInLocations, allValidPathes, pq, top5, graph, locationsRequest) {
        let flag = true;
        
        if (currNode == "endNode") {
            path.totalScore += parseInt(edgeWeight);
            allValidPathes.push(path);
            pq.add(allValidPathes.length - 1, path.totalScore);

            top5.add(path.totalPrice, path.totalPrice * (-1));
            if (top5.size() > 5)
                top5.removeMin();

         } else {
            if (prevNode == "startNode") {
                path.startDate = graph.node(currNode).checkIn;
            }

            if (currNode == "startNode") {
                let edges = graph.outEdges(currNode)
                for (let ed of edges) {
                    this.calculatePathesRecursive(ed.w, currNode, graph.edge(ed), Object.assign({}, path),
                        Object.assign([], locations), Object.assign({}, daysInLocations), allValidPathes, pq, top5, graph, locationsRequest);
                }
            } else {
                var node =  graph.node(currNode);
                var index = locations.indexOf(node.location);
                if (index != -1 && index != locations.length - 1) {
                    flag = false;
                } else {
                    var nigthsInNode = Math.ceil((Math.abs((new Date(node.checkIn)).getTime() - (new Date(node.checkOut)).getTime())) / (1000 * 3600 * 24));

                    if ((daysInLocations[node.location] != null?daysInLocations[node.location]:0) 
                            + nigthsInNode > locationsRequest[node.location]) {
                            flag = false;
                    }
                }

                if (flag) {
                    if (locations.indexOf(node.location) == -1) {
                        locations.push(node.location);
                    }

                    var nigthsInNode = Math.ceil((Math.abs((new Date(node.checkIn)).getTime() - (new Date(node.checkOut)).getTime())) / (1000 * 3600 * 24));
                    if (daysInLocations[node.location] == null ) {
                        daysInLocations[node.location] = nigthsInNode;
                    } else {
                        daysInLocations[node.location] += nigthsInNode;
                    }

                    path.path.push(node);
                    path.endDate = node.checkOut;
                    path.totalPrice += parseInt(node.price);
                    path.totalScore += parseInt(edgeWeight);

                    if ((top5.size() < 5) || (path.totalPrice <= top5.min() * (-1) && top5.size() == 5)) {
                        let edges = graph.outEdges(currNode)
                        for (let ed of edges) {
                            var nextPath = Object.assign({}, path);
                            nextPath.path = Object.assign([], nextPath.path);
                            this.calculatePathesRecursive(ed.w, currNode, graph.edge(ed), nextPath,
                                Object.assign([], locations), Object.assign({}, daysInLocations), allValidPathes, pq, top5, graph, locationsRequest);
                        }
                    }
                }
            }
        }
     }
}

module.exports = HotelsBL;