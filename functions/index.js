// Initialize dotenv to read .env file.
const dotenv = require('dotenv');
dotenv.config();

const FUNCTIONS = require('firebase-functions');

const FUNCTIONS_REGION    = FUNCTIONS.region('us-central1');
const FUNCTIONS_HTTPS     = FUNCTIONS_REGION.https; // FUNCTIONS.https
const FUNCTIONS_FIRESTORE = FUNCTIONS_REGION.firestore;

const authentication_controller = require('./controllers/Authentication');
const account_controller        = require('./controllers/AccountController');

//exports.login        = FUNCTIONS_HTTPS.onCall(authentication_controller.login);
//exports.registration = FUNCTIONS_HTTPS.onCall(authentication_controller.registration);

// Account
exports.register = FUNCTIONS_HTTPS.onCall(account_controller.register);
exports.login    = FUNCTIONS_HTTPS.onCall(account_controller.login);
