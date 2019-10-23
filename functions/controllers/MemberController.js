const moment   = require('moment-timezone');
const momentTZ = moment.tz('Asia/Manila');

const DB_KYC_VERIFICATION = require('../models/MDB_KYC_VERIFICATION');

module.exports =
{
    submitKyc(data, context)
    {
        // Fetch data
        const kyc_info = JSON.parse(data.kyc_form_data);

        // Set dates
        kyc_info.id_expiration_date = new Date(kyc_info.id_expiration_date);
        kyc_info.birthdate          = new Date(kyc_info.birthdate);

        // Other Info
        kyc_info.date_time_submitted = momentTZ.toDate();
        kyc_info.status              = 'pending'; //

        return DB_KYC_VERIFICATION.doc(context.auth.uid).set(kyc_info);
    }
};
