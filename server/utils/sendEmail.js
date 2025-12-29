const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log('Sending Email via Brevo...');
    console.log('User Env:', process.env.EMAIL_USER ? `"${process.env.EMAIL_USER.substring(0, 3)}***" (len: ${process.env.EMAIL_USER.length})` : 'MISSING');
    console.log('Pass Env:', process.env.EMAIL_PASS ? `"${process.env.EMAIL_PASS.substring(0, 3)}***" (len: ${process.env.EMAIL_PASS.length})` : 'MISSING');

    const transporter = nodemailer.createTransport({
        host: 'smtp-relay.brevo.com', // Brevo (Sendinblue) SMTP Host
        port: 2525, // Port 2525 is whitelisted by Render
        secure: false, // Port 2525 uses STARTTLS
        auth: {
            user: process.env.EMAIL_USER, // Your Brevo Login Email
            pass: process.env.EMAIL_PASS  // Your Brevo SMTP Key
        },
        tls: {
            rejectUnauthorized: false
        },
        connectionTimeout: 10000
    });

    const mailOptions = {
        from: `MCDevs Support <${process.env.EMAIL_USER}>`, // Must be a verified sender in Brevo
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    console.log('Transporter created, sending mail now...');
    try {
        let info = await transporter.sendMail(mailOptions);
        console.log('Email sent: ' + info.response);
    } catch (error) {
        console.error('SendMail Error:', error);
        throw error;
    }
};

module.exports = sendEmail;
