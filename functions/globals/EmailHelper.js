const NODEMAILER     = require('nodemailer');
const SMTP_TRANSPORT = require('nodemailer-smtp-transport');

console.log(process.env.SMTP_USERMAME, process.env.SMTP_PASSWORD, process.env.SMTP_PORT, process.env.SMTP_HOST);

const TRANSPORTER = NODEMAILER.createTransport({
    service: process.env.SMTP_SERVICE,
    auth: {
        user: process.env.SMTP_USERMAME,
        pass: process.env.SMTP_PASSWORD
    }
});

TRANSPORTER.verify(function(error, success) {
    if (error) {
        console.log(error);
    } else {
        console.log("Server is ready to take our messages");
    }
});

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

