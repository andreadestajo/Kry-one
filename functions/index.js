// Initialize dotenv to read .env file.
const dotenv                    = require('dotenv');
dotenv.config();

const FUNCTIONS                 = require('firebase-functions');

const FUNCTIONS_REGION          = FUNCTIONS.region('asia-northeast1');
const FUNCTIONS_HTTPS           = FUNCTIONS_REGION.https; // FUNCTIONS.https
const FUNCTIONS_PUBSUB          = FUNCTIONS_REGION.pubsub; // FUNCTIONS.https
const FUNCTIONS_FIRESTORE       = FUNCTIONS_REGION.firestore; // For triggers

const account_controller        = require('./controllers/AccountController');
const admin_controller          = require('./controllers/AdminController');
const member_controller         = require('./controllers/MemberController');
const schedule_controller       = require('./controllers/ScheduleController');
const callback_controller       = require('./controllers/CallbackController');
const user_trigger              = require('./triggers/UserTrigger');

// Member
exports.submitKyc               = FUNCTIONS_HTTPS.onCall(member_controller.submitKyc);
exports.transferWallet          = FUNCTIONS_HTTPS.onCall(member_controller.transferWallet);
exports.upgradeAccount          = FUNCTIONS_HTTPS.onCall(member_controller.upgradeAccount);
exports.readNewNotifications    = FUNCTIONS_HTTPS.onCall(member_controller.readNewNotifications);
exports.enlistKnight            = FUNCTIONS_HTTPS.onCall(member_controller.enlistKnight);

// Account
exports.register                = FUNCTIONS_HTTPS.onCall(account_controller.register);
exports.login                   = FUNCTIONS_HTTPS.onCall(account_controller.login);
exports.resetPassword           = FUNCTIONS_HTTPS.onCall(account_controller.resetPassword);

// Admin
exports.promoteUser             = FUNCTIONS_HTTPS.onCall(admin_controller.promoteUser);
exports.issueWallet             = FUNCTIONS_HTTPS.onCall(admin_controller.issueWallet);

// Schedules
exports.updateCurrency          = FUNCTIONS_PUBSUB.schedule('every 1 hours').onRun(schedule_controller.updateCurrency);

// Triggers
exports.triggerUserCreate       = FUNCTIONS_FIRESTORE.document('/users/{uid}').onCreate(user_trigger.create);

// Callback
exports.bitapsCallback          = FUNCTIONS_HTTPS.onRequest(callback_controller.bitaps);

//Test Calls
exports.testInitializeWallet    = FUNCTIONS_HTTPS.onCall(user_trigger.testCreate);
exports.testIssueBitcoin        = FUNCTIONS_HTTPS.onCall(user_trigger.testIssueBitcoin);
