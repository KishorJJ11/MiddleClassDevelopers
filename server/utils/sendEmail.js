const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    // console.log('Attempting to send email...'); // Optional: Keep or remove


    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: process.env.EMAIL_USER,
            pass: process.env.EMAIL_PASS
        }
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
