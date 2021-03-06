const admin = require('firebase-admin');
var serviceAccount = require('./serviceAccountKey.json');
var config = require('./config');
var firebase = require('firebase/app');
require('firebase/auth');
require('firebase/firestore');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
  });
firebase.initializeApp(config);
const db = firebase.firestore();

module.exports = {admin,firebase, db};