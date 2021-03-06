const { firebase, db } = require('../utils/admin');

const tripsService = {
    async getTrips(handle) {
        let tripsIds = [];
        let doc = await db.doc(`users/${handle}`).get();
        if(doc.exists) {
        if(doc.data().tripsRef) {
            tripsIds = doc.data().tripsRef;
            if(tripsIds.length > 0) {
            let tripsPromises = []
            tripsIds.forEach(tripId => {
                tripsPromises.push(tripHelper(tripId));
            });
            return Promise.all(tripsPromises).then((trips) => {
                return trips
            });
            }
            else {
            return ({error:"trips not found"});
            }
            }
        } else {
            return ({error:"user not found"});
        }
    }
}

tripHelper = async(tripId) => {
    let tripData = await tripId.get();
    let newTrip = tripData.data();
    newTrip.id = tripData.id;
    if(newTrip.sectionsRef) {
      let sectionsIds = newTrip.sectionsRef;
      if(sectionsIds.length > 0) {
        let sectionsPromises = [];
        sectionsIds.forEach(sectionId => {
          sectionsPromises.push(sectionHelper(sectionId));
        });
        await Promise.all(sectionsPromises).then((newSections) => {
          newTrip.sectionsData = newSections;
        });
        
      }
      delete newTrip.sectionsRef;
    }
    if(newTrip.userRef) delete newTrip.userRef;
    return newTrip;
  }
  
  sectionHelper = async(sectionId) => {
    let sectionData = await sectionId.get();
    let newSection = sectionData.data();
    newSection.id = sectionData.id;
    if(newSection.accommodationRef){
      let accommodation = await newSection.accommodationRef.get();
      newSection.accommodationData = accommodation.data();
      if(newSection.accommodationRef) delete newSection.accommodationRef
    }
    return newSection;
  }

module.exports = tripsService;