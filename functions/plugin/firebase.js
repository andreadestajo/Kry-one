const ADMIN     = require('firebase-admin');
const FUNCTIONS = require('firebase-functions');
let service_account;

if(process.env.GCLOUD_PROJECT === 'krypto-one-test')
{
    service_account = require("../service-accounts/krypto-one-test-firebase-adminsdk-fnbb5-1c31cd1e2a.json");
}
else
{
    service_account = require("../service-accounts/krypto-one-live-a484cd2c7b48.json");
}


ADMIN.initializeApp({
    credential  : ADMIN.credential.cert(service_account),
    databaseURL : "https://krypto-one-live.firebaseio.com"
});

exports.ADMIN_DB   = ADMIN.firestore();
exports.ADMIN_AUTH = ADMIN.auth();

exports.HTTPS_ERROR = (code, message) => {throw new FUNCTIONS.https.HttpsError(code, message)};
