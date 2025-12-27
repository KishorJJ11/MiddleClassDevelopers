const express = require('express');
const router = express.Router();
const Notification = require('../models/Notification');
const auth = require('../middleware/auth');

// @route   POST api/notifications/notify
// @desc    Subscribe for notification
// @access  Public
router.post('/notify', async (req, res) => {
    const { email, service } = req.body;

    try {
        let notification = await Notification.findOne({ email, service });

        if (notification) {
            return res.status(400).json({ msg: 'You have already subscribed for this service.' });
        }

        notification = new Notification({
            email,
            service
        });

        await notification.save();

        res.json({ msg: 'Thank you! You will be notified when we launch.' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/notifications
// @desc    Get all notifications
// @access  Private (Admin only)
router.get('/', auth, async (req, res) => {
    try {
        // In a real app, check if req.user.isAdmin
        // For now, returning all for authorized users
        const notifications = await Notification.find().sort({ date: -1 });
        res.json(notifications);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
