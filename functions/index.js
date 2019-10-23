// Initialize dotenv to read .env file.
const dotenv = require('dotenv');
dotenv.config();

const FUNCTIONS = require('firebase-functions');

const FUNCTIONS_REGION    = FUNCTIONS.region('asia-northeast1');
const FUNCTIONS_HTTPS     = FUNCTIONS_REGION.https; // FUNCTIONS.https
const FUNCTIONS_FIRESTORE = FUNCTIONS_REGION.firestore; // For triggers

const account_controller   = require('./controllers/AccountController');
const member_controller    = require('./controllers/MemberController');

// Account
exports.register      = FUNCTIONS_HTTPS.onCall(account_controller.register);
exports.login         = FUNCTIONS_HTTPS.onCall(account_controller.login);
exports.resetPassword = FUNCTIONS_HTTPS.onCall(account_controller.resetPassword);

// Member
exports.submitKyc     = FUNCTIONS_HTTPS.onCall(member_controller.submitKyc);
