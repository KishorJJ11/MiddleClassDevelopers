const mongoose = require('mongoose');

const ProjectSchema = new mongoose.Schema({
    uniqueId: {
        type: String,
        required: true,
        unique: true
    },
    clientName: {
        type: String,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    status: {
        type: String,
        enum: ['Pending', 'Planning', 'Design', 'Development', 'Testing', 'Deployment', 'Completed'],
        default: 'Pending'
    },
    progress: {
        type: Number,
        default: 0,
        min: 0,
        max: 100
    },
    startDate: {
        type: Date,
        default: Date.now
    },
    estimatedCompletion: {
        type: String // e.g., "2 Weeks", "Dec 25th"
    },
    updates: [
        {
            subject: { type: String, required: true }, // Added Subject
            message: String,
            date: { type: Date, default: Date.now }
        }
    ]
});

module.exports = mongoose.model('Project', ProjectSchema);
