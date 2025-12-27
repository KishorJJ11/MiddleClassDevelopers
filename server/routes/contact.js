const express = require('express');
const router = express.Router();
const Contact = require('../models/Contact');

// @route   POST api/contact/send
// @desc    Send a message
// @access  Public
router.post('/send', async (req, res) => {
    const { name, email, mobile, subject, message } = req.body;

    try {
        const newContact = new Contact({
            name,
            email,
            mobile,
            subject,
            message
        });

        await newContact.save();
        res.status(200).json({ msg: 'Message sent successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/contact
// @desc    Get all contact messages
// @access  Private (Admin only)
router.get('/', require('../middleware/auth'), async (req, res) => {
    try {
        const contacts = await Contact.find().sort({ date: -1 });
        res.json(contacts);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
