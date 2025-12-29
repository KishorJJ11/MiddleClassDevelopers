const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    console.log('Sending Email via Brevo API (HTTP)...');

    // Check for API Key (Starts with xkeysib...)
    const apiKey = process.env.EMAIL_PASS;
    console.log('API Key Env:', apiKey ? `"${apiKey.substring(0, 5)}***" (len: ${apiKey.length})` : 'MISSING');

    if (!apiKey || !apiKey.startsWith('xkeysib-')) {
        console.warn('WARNING: Brevo API Key should start with "xkeysib-". Check your credentials.');
    }

    const url = 'https://api.brevo.com/v3/smtp/email';

    const body = {
        sender: { email: process.env.EMAIL_USER, name: 'MCDevs Support' },
        to: [{ email: options.email }],
        subject: options.subject,
        htmlContent: options.message
    };

    try {
        const response = await fetch(url, {
            method: 'POST',
            headers: {
                'accept': 'application/json',
                'api-key': apiKey,
                'content-type': 'application/json'
            },
            body: JSON.stringify(body)
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(`API Error: ${response.status} - ${JSON.stringify(errorData)}`);
        }

        const data = await response.json();
        console.log('Email sent successfully via API:', data);
    } catch (error) {
        console.error('Brevo API Failed:', error.message);
        throw error;
    }
};

module.exports = sendEmail;
