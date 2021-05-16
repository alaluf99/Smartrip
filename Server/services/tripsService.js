const { planTrip } = require('../controllers/tripsController');
const { firebase, db } = require('../utils/admin');

const tripsService = {
    async getTrips(email) {
        let tripsIds = [];
        let doc = await db.collection('users').where('email','==',email).get();
        if(!doc.empty) {
          if(doc.docs[0].data().tripsRef) {
              tripsIds = doc.docs[0].data().tripsRef;
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
    },
    async planTrip(plan) {
      //const suggestions = this.hotelService.planTrip(plan);
      const suggestions = [{
        sections: [{
            accommodation: {
                accommodationName: "Bereshit",
                city: "Haifa",
                location: {
                    "Latitude": 20,
                    "Longitude": 20
                },
                rating: 5,
                link: "http://hotel"
            },
            fromDate: "5/3/2021",
            toDate: "8/3/2021",
            price: 600
        },
        {
            accommodation: {
                accommodationName: "Gordon",
                city: "Tel-Aviv",
                location: {
                    "Latitude": 10,
                    "Longitude": 10
                },
                rating: 4,
                link: "http://hotel"
            },
            fromDate: "3/3/2021",
            toDate: "5/3/2021",
            price: 200
        }],
        adultsNumber: 2,
        childrenNumber: 0,
        creationDate: "3/2/2021",
        startDate: "3/3/2021",
        endDate: "3/4/2021",
        totaPrice: 800,
        userId: "xwXYUprVZnTHNCauVLo2SNBFSsq2"
    }]
    return suggestions;
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