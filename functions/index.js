// Initialize dotenv to read .env file.
const dotenv                    = require('dotenv');
dotenv.config();

const FUNCTIONS                 = require('firebase-functions');

const FUNCTIONS_REGION          = FUNCTIONS.region('asia-northeast1');
const FUNCTIONS_HTTPS           = FUNCTIONS_REGION.https; // FUNCTIONS.https
const FUNCTIONS_PUBSUB          = FUNCTIONS_REGION.pubsub; // FUNCTIONS.https
const FUNCTIONS_FIRESTORE       = FUNCTIONS_REGION.firestore; // For triggers
const account_controller        = require('./controllers/AccountController');
const member_controller         = require('./controllers/MemberController');
const schedule_controller       = require('./controllers/ScheduleController');
const user_trigger              = require('./triggers/UserTrigger');

// Member
exports.submitKyc               = FUNCTIONS_HTTPS.onCall(member_controller.submitKyc);

// Account
exports.register                = FUNCTIONS_HTTPS.onCall(account_controller.register);
exports.login                   = FUNCTIONS_HTTPS.onCall(account_controller.login);
exports.resetPassword           = FUNCTIONS_HTTPS.onCall(account_controller.resetPassword);

//schedules
exports.updateCurrency          = FUNCTIONS_PUBSUB.schedule('every 5 minutes').onRun(schedule_controller.updateCurrency);

//Triggers
exports.trigger_user_create     = FUNCTIONS_FIRESTORE.document('/user').onCreate(user_trigger.create);