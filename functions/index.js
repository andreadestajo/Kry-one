// Initialize dotenv to read .env file.
const dotenv = require('dotenv');
dotenv.config();

const FUNCTIONS = require('firebase-functions');

const FUNCTIONS_REGION    = FUNCTIONS.region('asia-northeast1');
const FUNCTIONS_HTTPS     = FUNCTIONS_REGION.https; // FUNCTIONS.https
const FUNCTIONS_PUBSUB    = FUNCTIONS_REGION.pubsub; // FUNCTIONS.https
const FUNCTIONS_FIRESTORE = FUNCTIONS_REGION.firestore; // For triggers

const authentication_controller     = require('./controllers/Authentication');
const account_controller            = require('./controllers/AccountController');
const schedule_controller           = require('./controllers/ScheduleController');

//exports.login        = FUNCTIONS_HTTPS.onCall(authentication_controller.login);
//exports.registration = FUNCTIONS_HTTPS.onCall(authentication_controller.registration);

// Account
exports.register        = FUNCTIONS_HTTPS.onCall(account_controller.register);
exports.login           = FUNCTIONS_HTTPS.onCall(account_controller.login);
exports.resetPassword   = FUNCTIONS_HTTPS.onCall(account_controller.resetPassword);
exports.updateCurrencyM = FUNCTIONS_HTTPS.onRequest(schedule_controller.updateCurrency);
exports.updateCurrency  = FUNCTIONS_PUBSUB.schedule('every 5 minutes').onRun(schedule_controller.updateCurrency);