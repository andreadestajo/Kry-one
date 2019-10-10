const admin           = require('firebase-admin');
const service_account = require("../service-accounts/krypto-one-live-a484cd2c7b48.json");

admin.initializeApp({
    credential  : admin.credential.cert(service_account),
    databaseURL : "https://krypto-one-live.firebaseio.com"
});

exports.ADMIN_DB   = admin.firestore();
exports.ADMIN_AUTH = admin.auth();
