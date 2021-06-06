const { planTrip } = require("../controllers/tripsController");
const { firebase, db } = require("../utils/admin");
const suggestionsOptions = require("../models/suggestionsOptions.json");
const hotelsBL = require("../bl/HotelsBL");
const serverConfig = require("../utils/config");

const NodeCache = require("node-cache");
const suggestionsCache = new NodeCache();

const tripsService = {
  async getTrips(email) {
    let tripsIds = [];
    let doc = await db.collection("users").where("email", "==", email).get();
    if (!doc.empty) {
      if (doc.docs[0].data().tripsRef) {
        tripsIds = doc.docs[0].data().tripsRef;
        if (tripsIds.length > 0) {
          let tripsPromises = [];
          tripsIds.forEach((tripId) => {
            tripsPromises.push(tripHelper(tripId));
          });
          return Promise.all(tripsPromises).then((trips) => {
            return trips;
          });
        } else {
          return { error: "trips not found" };
        }
      }
    } else {
      return { error: "user not found" };
    }
  },
  async getTripsByUserId(userId) {
    let trips = [];
    const snapshot = await db
      .collection("trips")
      .where("userId", "==", userId)
      .get();
    snapshot.forEach((doc) => {
      trips.push(doc.data());
    });
    return trips;
  },
  async planTrip(planReq, userId) {
    planReq.userId = userId;
    await db.collection("trips").add(planReq);
    let plan = await hotelsBL.calculateTrip(planReq, 1);
    return plan;
  },
  async getSuggestions(numberOfSuggestions) {
    if (!numberOfSuggestions) {
      numberOfSuggestions = 2;
    }
    let plans = [];
    let promises = [];
    randomSuggestionsOptions = getRandom(
      suggestionsOptions,
      numberOfSuggestions
    );

    randomSuggestionsOptions.forEach((tripOptions) => {
      let suggestionsTTLInSeconds = serverConfig.suggestionsTTLInSeconds;
      let currentCacheTry = suggestionsCache.get(tripOptions.requestId);

      if (currentCacheTry) {
        console.log("TAKEN FROM CACHE!!! ID IS --- " + tripOptions.requestId);
        plans.push(currentCacheTry);
      } else {
        promises.push(getSuggestionWithId(tripOptions, tripOptions.requestId));
      }
    });

    nonCachePlans = await Promise.all(promises);

    nonCachePlans.forEach((plan) => {
      suggestionsCache.set(plan.requestId, plan, suggestionsTTLInSeconds);
      plans.push(plan);
    });

    return plans;
  },
};

tripHelper = async (tripId) => {
  let tripData = await tripId.get();
  let newTrip = tripData.data();
  newTrip.id = tripData.id;
  if (newTrip.sectionsRef) {
    let sectionsIds = newTrip.sectionsRef;
    if (sectionsIds.length > 0) {
      let sectionsPromises = [];
      sectionsIds.forEach((sectionId) => {
        sectionsPromises.push(sectionHelper(sectionId));
      });
      await Promise.all(sectionsPromises).then((newSections) => {
        newTrip.sectionsData = newSections;
      });
    }
    delete newTrip.sectionsRef;
  }
  if (newTrip.userRef) delete newTrip.userRef;
  return newTrip;
};

sectionHelper = async (sectionId) => {
  let sectionData = await sectionId.get();
  let newSection = sectionData.data();
  newSection.id = sectionData.id;
  if (newSection.accommodationRef) {
    let accommodation = await newSection.accommodationRef.get();
    newSection.accommodationData = accommodation.data();
    if (newSection.accommodationRef) delete newSection.accommodationRef;
  }
  return newSection;
};

getRandom = (arr, n) => {
  var result = new Array(n),
    len = arr.length,
    taken = new Array(len);
  if (n > len)
    throw new RangeError("getRandom: more elements taken than available");
  while (n--) {
    var x = Math.floor(Math.random() * len);
    result[n] = arr[x in taken ? taken[x] : x];
    taken[x] = --len in taken ? taken[len] : len;
  }
  return result;
};

getSuggestionWithId = async (suggestionsOption, requestId) => {
  let plan = await hotelsBL.calculateTrip(suggestionsOption, 1);
  plan.requestId = requestId;
  return plan;
};

module.exports = tripsService;
