const functions = require("firebase-functions");
const app = require('express')();
const cors = require('cors');
const { db } = require('./utils/admin');
const router = require('./routes/apiRouter');

app.use(cors());
app.use('/', router);

exports.api = functions.https.onRequest(app);