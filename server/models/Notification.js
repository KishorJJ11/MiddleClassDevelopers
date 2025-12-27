const mongoose = require('mongoose');

const NotificationSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true
    },
    service: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Notification', NotificationSchema);
