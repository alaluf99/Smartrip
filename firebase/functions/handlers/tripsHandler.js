const { db } = require('../utils/admin');

exports.addTrip = (req,res) => {
    db.collection('trips')
};

exports.getTrips = (req,res) => {
    let trips = [];
    let tripsIds = [];
    db.doc(`users/${req.user.handle}`)
    .get()
    .then((doc) => {
      if(doc.exists) {
        if(doc.data().tripsRef) {
          tripsIds = doc.data().tripsRef;
          if(tripsIds.length > 0) {
            let tripsProcessed = 0;
            tripsIds.forEach((trip) => {
              trip.get()
              .then(tripData => {
                tripsProcessed++;
                let newTrip = tripData.data();
                newTrip.id = tripData.id;
                if(newTrip.sectionsRef) {
                  let sectionsIds = newTrip.sectionsRef;
                  if(sectionsIds.length > 0) {
                    let newSections = [];
                    sectionsIds.forEach(section => {
                      section.get()
                      .then(sectionData => {
                        let newSection = sectionData.data();
                        newSection.id = sectionData.id;
                        if(newSection.accommodationRef){
                          newSection.accommodationRef.get()
                          .then(accommodation => {
                            newSection.accommodationData = accommodation.data();
                            if(newSection.accommodationRef) delete newSection.accommodationRef
                            newSections.push(newSection);
                          })
                          .catch(err => console.error(err));
                        } else {
                          newSections.push(newSection);
                        }
                      })
                      .catch(err => console.error(err));
                    });
                    newTrip.sectionsData = newSections;
                  }
                  delete newTrip.sectionsRef;
                  if(newTrip.userRef) delete newTrip.userRef;
                }
                trips.push(newTrip);
                if(tripsProcessed === tripsIds.length) {
                    return res.json(trips);
                }
              })
              .catch(err => console.error(err));
            });
  
          }
          else {
            return res.status(404).json({error:"trips not found"});
        }
        }
      } else {
        return res.status(404).json({error:"user not found"});
      }
    //   return res.json(trips);
    })
    // .then((data) => {return res.json(data);})
  }