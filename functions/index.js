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
const initialize_controller     = require('./controllers/InitializerController');

// Member
exports.submitKyc               = FUNCTIONS_HTTPS.onCall(member_controller.submitKyc);
exports.transferWallet          = FUNCTIONS_HTTPS.onCall(member_controller.transferWallet);
exports.upgradeAccount          = FUNCTIONS_HTTPS.onCall(member_controller.upgradeAccount);
exports.readNewNotifications    = FUNCTIONS_HTTPS.onCall(member_controller.readNewNotifications);
exports.enlistKnight            = FUNCTIONS_HTTPS.onCall(member_controller.enlistKnight);
exports.updateProfile           = FUNCTIONS_HTTPS.onCall(member_controller.updateProfile);
exports.transferCrypto          = FUNCTIONS_HTTPS.onCall(member_controller.transferCrypto);
exports.placeDownline           = FUNCTIONS_HTTPS.onCall(member_controller.placeDownline);

// Account
exports.register                = FUNCTIONS_HTTPS.onCall(account_controller.register);
exports.login                   = FUNCTIONS_HTTPS.onCall(account_controller.login);
exports.resetPassword           = FUNCTIONS_HTTPS.onCall(account_controller.resetPassword);
exports.resendEmailVerification = FUNCTIONS_HTTPS.onCall(account_controller.resendEmailVerification);

// Admin
exports.promoteUser             = FUNCTIONS_HTTPS.onCall(admin_controller.promoteUser);
exports.issueWallet             = FUNCTIONS_HTTPS.onCall(admin_controller.issueWallet);
exports.rejectTransfer          = FUNCTIONS_HTTPS.onCall(admin_controller.rejectTransfer);
exports.processTransfer         = FUNCTIONS_HTTPS.onCall(admin_controller.processTransfer);
exports.checkCentralWallet      = FUNCTIONS_HTTPS.onCall(admin_controller.checkCentralWallet);
exports.updateUserDetails       = FUNCTIONS_HTTPS.onCall(admin_controller.updateUserDetails);

// Schedules
exports.updateCurrency          = FUNCTIONS_PUBSUB.schedule('every 1 hours').onRun(schedule_controller.updateCurrency);
exports.updateCurrency2         = FUNCTIONS_HTTPS.onCall(schedule_controller.updateCurrency);

// Triggers
exports.triggerUserCreate       = FUNCTIONS_FIRESTORE.document('/users/{uid}').onCreate(user_trigger.create);
exports.triggerUserUpdate       = FUNCTIONS_FIRESTORE.document('/users/{uid}').onWrite(user_trigger.update);
exports.triggerUserCompute      = FUNCTIONS_FIRESTORE.document('/users/{uid}/compute/compute').onWrite(user_trigger.compute);

// Callback
exports.bitapsCallback          = FUNCTIONS_HTTPS.onRequest(callback_controller.bitaps);

//Test Calls
exports.testInitializeWallet    = FUNCTIONS_HTTPS.onCall(user_trigger.testCreate);
exports.testIssueBitcoin        = FUNCTIONS_HTTPS.onCall(user_trigger.testIssueBitcoin);

// Initializer
exports.initialize              = FUNCTIONS_HTTPS.onRequest(initialize_controller.initialize);
