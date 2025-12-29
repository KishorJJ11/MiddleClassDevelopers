const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // console.log('Attempting to send email...'); // Optional: Keep or remove


    const transporter = nodemailer.createTransport({
        host: 'smtp.gmail.com',
        port: 465,
        secure: true,
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        },
        // Detailed timeouts to prevent hanging
        connectionTimeout: 10000, // 10s
        greetingTimeout: 5000,    // 5s
        socketTimeout: 20000      // 20s
    });

    try {
        await transporter.verify();
        console.log('SMTP Connection Established');
    } catch (error) {
        console.error('SMTP Connection Failed:', error);
        throw error;
    }

    const mailOptions = {
        from: `MCDevs Support <${process.env.EMAIL_USER}>`,
        to: options.email,
        subject: options.subject,
        html: options.message
    };

    await transporter.sendMail(mailOptions);
    console.log('Email Sent Successfully');
};

module.exports = sendEmail;
