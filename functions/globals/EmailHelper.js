const NODEMAILER     = require('nodemailer');
const SMTP_TRANSPORT = require('nodemailer-smtp-transport');

const TRANSPORTER = NODEMAILER.createTransport(SMTP_TRANSPORT({
    service : process.env.SMTP_SERVICE,
    auth    :
    {
        user: process.env.SMTP_MAIL,
        pass: process.env.SMTP_PASSWORD
    }
}));

// Parameters for the sendMail function
const default_mail_options =
{
    to      : '', // required
    from    : '', // required
    subject : '', // required
    text    : '',
    html    : ''
};

/**
 * @params please see above defaultMailOptions for the params*
 * TODO naming convention for helpers ? is this the right place for this helper ?
 * @return obj = {error: null} if successfully sent 'or'
 * @return obj = {error: error details} if successfully sent
 **/
exports.sendMail = (mail_options = default_mail_options) =>
{
    TRANSPORTER.sendMail(mail_options, function(error, info) {
        return error ? {error} : {error: null}
    });
};

