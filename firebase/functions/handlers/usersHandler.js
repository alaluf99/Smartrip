const firebase = require('firebase');
const { db } = require('../utils/admin');
const config = require('../utils/config');
const { validateSignupData, validateLoginData, } = require("../utils/validators");

firebase.initializeApp(config);

//Sign Up user
exports.signUp = (req, res) => {
    const newUser = {
        email: req.body.email,
        password: req.body.password,
        confirmPassword: req.body.confirmPassword,
        handle: req.body.handle, 
    };

    const { valid, errors } = validateSignupData(newUser);

    if (!valid) return res.status(400).json(errors);

    let token, userId;
    db.doc(`/users/${newUser.handle}`)
      .get()
      .then((doc) => {
        if (doc.exists) {
          return res.status(400).json({ handle: "this handle is already taken" });
        } else {
          return firebase
            .auth()
            .createUserWithEmailAndPassword(newUser.email, newUser.password);
        }
      })
      .then((data) => {
        userId = data.user.uid;
        return data.user.getIdToken();
      })
      .then((idToken) => {
        token = idToken;
        const userCredentials = {
          handle: newUser.handle,
          email: newUser.email,
          createdAt: new Date().toISOString(),
          userId,
        };
        return db.doc(`/users/${newUser.handle}`).set(userCredentials);
      })
      .then(() => {
        return res.status(201).json({ token });
      })
      .catch((err) => {
        console.error(err);
        if (err.code === "auth/email-already-in-use") {
          return res.status(400).json({ email: "Email is already is use" });
        } else {
          return res
            .status(500)
            .json({ general: "Something went wrong, please try again" });
        }
      });
};

// Log user in
exports.logIn = (req, res) => {
    const user = {
      email: req.body.email,
      password: req.body.password,
    };
  
    const { valid, errors } = validateLoginData(user);
  
    if (!valid) return res.status(400).json(errors);
  
    firebase
      .auth()
      .signInWithEmailAndPassword(user.email, user.password)
      .then((data) => {
        return data.user.getIdToken();
      })
      .then((token) => {
        return res.json({ token });
      })
      .catch((err) => {
        console.error(err);
        // auth/wrong-password
        // auth/user-not-user
        return res
          .status(403)
          .json({ general: "Wrong credentials, please try again" });
      });
  };

exports.getUserTrips = (req,res) => {
  let trips = [];
  let tripsIds = [];
  db.doc(`users/${req.user.handle}`)
  .get()
  .then((doc) => {
    if(doc.exists) {
      if(doc.data().tripsRef) {
        tripsIds = doc.data().tripsRef;
        if(tripsIds.length > 0) {
          tripsIds.forEach(trip => {
            trip.get()
            .then(tripData => {
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
              }
              trips.push(newTrip);
            })
            .catch(err => console.error(err));
          });

        }
        else {
          return res.status(404).json({error:"trips not found"});
      }
      return res.json(trips);
      }
    } else {
      return res.status(404).json({error:"user not found"});
    }
  })
}