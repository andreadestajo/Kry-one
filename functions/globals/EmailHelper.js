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
const defaultMailOptions =
{
    to      : '', // required
    from    : '', // required
    subject : '', // required
    text    : '',
    html    : ''
};

/*
* @params please see above defaultMailOptions for the params
* TODO naming convention for helpers ? is this the right place for this helper ?
* */
exports.sendMail = (mailOptions = defaultMailOptions) =>
{
    TRANSPORTER.sendMail(mailOptions, function(error, info) {
        return error ? {error} : {error: null}
    });
};

