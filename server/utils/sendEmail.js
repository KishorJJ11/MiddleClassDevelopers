
const nodemailer = require('nodemailer');
const dns = require('dns');
const util = require('util');
const lookup = util.promisify(dns.lookup);

const sendEmail = async (options) => {
    // Log masked credentials
    console.log('Sending Email...');
    console.log('User Env:', process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}*** ` : 'MISSING');
    console.log('Pass Env:', process.env.EMAIL_PASS ? 'LOADED' : 'MISSING');

    let smtpHost = 'smtp.gmail.com';
    try {
        // Force IPv4 resolution (Fix for Render/Cloud IPv6 timeouts)
        const ip = await lookup('smtp.gmail.com', { family: 4 });
        console.log('Resolved Gmail IP (IPv4):', ip.address);
        smtpHost = ip.address;
    } catch (dnsErr) {
        console.error('DNS Lookup Failed, defaulting to hostname:', dnsErr);
    }

    const transporter = nodemailer.createTransport({
        host: smtpHost,
        port: 587,
        secure: false,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            servername: 'smtp.gmail.com', // Necessary when using IP address
            rejectUnauthorized: false
        },
        connectionTimeout: 10000
    });

    // Removed verify() to avoid extra blocking step

    const mailOptions = {
        from: `MCDevs Support < ${process.env.EMAIL_USER}> `,
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
        throw error; // Rethrow to be caught by controller
    }
};

module.exports = sendEmail;
