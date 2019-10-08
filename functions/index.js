const functions = require('firebase-functions');
const AuthenticationController = require('./controllers/Authentication');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
/*
exports.login        = functions.https.onRequest(AuthenticationController.login);
exports.registration = functions.https.onRequest(AuthenticationController.registration);
*/

exports.login = functions.https.onCall(require('./controllers/Login.js'));

exports.date = functions.https.onRequest((req, res) => {
  return "hello"
});
