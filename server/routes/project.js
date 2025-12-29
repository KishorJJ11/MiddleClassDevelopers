const express = require('express');
const router = express.Router();
const Project = require('../models/Project');

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

module.exports = router;
