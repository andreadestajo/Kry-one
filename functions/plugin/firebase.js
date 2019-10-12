const ADMIN     = require('firebase-admin');
const FUNCTIONS = require('firebase-functions');

const service_account = require("../service-accounts/krypto-one-live-a484cd2c7b48.json");

ADMIN.initializeApp({
    credential  : ADMIN.credential.cert(service_account),
    databaseURL : "https://krypto-one-live.firebaseio.com"
});

exports.ADMIN_DB   = ADMIN.firestore();
exports.ADMIN_AUTH = ADMIN.auth();

exports.HTTPS_ERROR = FUNCTIONS.https.HttpsError;
