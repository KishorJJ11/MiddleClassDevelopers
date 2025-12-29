const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // Log masked credentials to verify they are loaded
    console.log('Sending Email...');
    console.log('User Env:', process.env.EMAIL_USER ? `${process.env.EMAIL_USER.substring(0, 3)}***` : 'MISSING');
    console.log('Pass Env:', process.env.EMAIL_PASS ? 'LOADED' : 'MISSING');

    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 587,
        secure: false, // Must be false for port 587
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        tls: {
            rejectUnauthorized: false // Helps with some cloud SSL issues
        },
        connectionTimeout: 60000 // 60s - Give it time
    });

    // Removed verify() to avoid extra blocking step

    const mailOptions = {
        from: `MCDevs Support <${process.env.EMAIL_USER}>`,
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
