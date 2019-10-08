const functions = require('firebase-functions');
const AuthenticationController = require('./controllers/Authentication');

// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//

exports.login        = functions.https.onCall(AuthenticationController.login);
exports.registration = functions.https.onCall(AuthenticationController.registration);