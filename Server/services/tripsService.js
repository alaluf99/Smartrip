const { planTrip } = require("../controllers/tripsController");
const { firebase, db } = require("../utils/admin");
const suggestionsOptions = require("../models/suggestionsOptions.json");
const hotelsBL = require("../bl/HotelsBL");

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
  async planTrip(planReq) {
    await db.collection('trips').add(planReq);
    let plan = await hotelsBL.calculateTrip(planReq);
    return plan;
  },
  async getSuggestions(numberOfSuggestions) {
    if (!numberOfSuggestions) {
      numberOfSuggestions = 4;
    }
    let plans;
    let promises = [];
    randomSuggestionsOptions = getRandom(
      suggestionsOptions,
      numberOfSuggestions
    );

    randomSuggestionsOptions.forEach((tripOptions) => {
      promises.push(hotelsBL.calculateTrip(tripOptions));
    });

    plans = await Promise.all(promises);

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

module.exports = tripsService;
