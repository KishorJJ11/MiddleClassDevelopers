const express = require('express');
const router = express.Router();
const Project = require('../models/Project');
const auth = require('../middleware/auth');
const User = require('../models/User');

// @route   POST api/projects/track
// @desc    Get project details by Unique ID
// @access  Public (Protected by ID knowledge)
router.post('/track', async (req, res) => {
    const { uniqueId } = req.body;

    if (!uniqueId) {
        return res.status(400).json({ msg: 'Please enter a Unique Project ID' });
    }

    try {
        const project = await Project.findOne({ uniqueId });

        if (!project) {
            return res.status(404).json({ msg: 'Project not found. Please check your ID.' });
        }

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/projects/create
// @desc    Create a new project (For Admin/Dev use)
// @access  Public (Should be private in production)
router.post('/create', async (req, res) => {
    const { uniqueId, clientName, title, description, status, estimatedCompletion } = req.body;

    try {
        let project = await Project.findOne({ uniqueId });

        if (project) {
            return res.status(400).json({ msg: 'Project with this ID already exists' });
        }

        project = new Project({
            uniqueId,
            clientName,
            title,
            description,
            status,
            estimatedCompletion
        });

        await project.save();
        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});
// @route   POST api/projects/update
// @desc    Add a status update to a project (Developer/Admin only)
// @access  Private
router.post('/update', auth, async (req, res) => {
    const { uniqueId, subject, message, status, progress } = req.body;

    try {
        // Verify User Role
        const user = await User.findById(req.user.id);
        if (user.role !== 'Developer' && user.role !== 'Admin' && user.email !== 'kishorjj05@gmail.com') {
            return res.status(401).json({ msg: 'Not Authorized. Developers Only.' });
        }

        const project = await Project.findOne({ uniqueId });

        if (!project) {
            return res.status(404).json({ msg: 'Project not found' });
        }

        const newUpdate = {
            subject,
            message,
            date: Date.now()
        };

        project.updates.unshift(newUpdate); // Add to beginning

        // Optional: Update Main Status/Progress if provided
        if (status) project.status = status;
        if (progress) project.progress = progress;

        await project.save();

        res.json(project);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/projects/all
// @desc    Get ALL projects (Developer/Admin only)
// @access  Private
router.get('/all', auth, async (req, res) => {
    try {
        // Verify User Role
        const user = await User.findById(req.user.id);
        if (user.role !== 'Developer' && user.role !== 'Admin' && user.email !== 'kishorjj05@gmail.com') {
            return res.status(401).json({ msg: 'Not Authorized. Developers Only.' });
        }

        const projects = await Project.find().sort({ date: -1 }); // Newest first
        res.json(projects);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
