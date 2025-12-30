const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const crypto = require('crypto');
const User = require('../models/User');
const sendEmail = require('../utils/sendEmail');

// Register User
router.post('/register', async (req, res) => {
    const { name, email, password, role } = req.body;

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            role: role || 'Client' // Default to Client if not provided
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        // Generate OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();
        const otpSalt = await bcrypt.genSalt(10);
        user.otp = await bcrypt.hash(otp, otpSalt);
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes
        user.isVerified = false;

        await user.save();

        const message = `
            <h1>Account Verification</h1>
            <p>Welcome to Middle Class Developers!</p>
            <p>Your verification code is: <strong>${otp}</strong></p>
        `;

        try {
            await sendEmail({
                email: user.email,
                subject: 'MCDevs Account Verification',
                message
            });
            res.status(200).json({ msg: 'Verification OTP sent to email', verifyNeeded: true });
        } catch (err) {
            console.error(err);
            // Delete user if email fails so they can try again
            await User.findByIdAndDelete(user.id);
            return res.status(500).json({ msg: 'Email could not be sent. Please try again.' });
        }
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Login User
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        let user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
            user: {
                id: user.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email, role: user.role } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Import middleware at the top if not already there, but here we can just require it inline or assume it is imported
const auth = require('../middleware/auth');

// Get User Data
router.get('/user', auth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        res.json(user); // user object now includes role by default schema
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Change Password
router.put('/change-password', auth, async (req, res) => {
    const { currentPassword, newPassword } = req.body;

    try {
        const user = await User.findById(req.user.id);

        const isMatch = await bcrypt.compare(currentPassword, user.password);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid Current Password' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        await user.save();

        res.json({ msg: 'Password Updated Successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Update User Profile
router.put('/update-profile', auth, async (req, res) => {
    const { name, mobile, company, bio } = req.body;

    // Build user object
    const profileFields = {};
    if (name) profileFields.name = name;
    if (mobile) profileFields.mobile = mobile;
    if (company) profileFields.company = company;
    if (bio) profileFields.bio = bio;
    // Role is not editable via update-profile

    try {
        let user = await User.findById(req.user.id);

        if (!user) return res.status(404).json({ msg: 'User not found' });

        user = await User.findByIdAndUpdate(
            req.user.id,
            { $set: profileFields },
            { new: true }
        ).select('-password');

        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});





// Verify Email and Login (Signup Final Step)
router.post('/verify-email', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        if (user.isVerified) {
            return res.status(400).json({ msg: 'User already verified. Please login.' });
        }

        if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'OTP Expired or Invalid' });
        }

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        // Mark verified and clear OTP
        user.isVerified = true;
        user.otp = undefined;
        user.otpExpires = undefined;
        await user.save();

        // Generate Token (Auto Login)
        const payload = { user: { id: user.id } };
        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '1h' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, user: { id: user.id, name: user.name, email: user.email } });
            }
        );

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Forgot Password - Generate & Send OTP
router.post('/forgot-password', async (req, res) => {
    const { email } = req.body;
    console.log(`Forgot Password requested for: ${email}`); // Log 1

    try {
        const user = await User.findOne({ email });
        if (!user) {
            console.log('User not found'); // Log 2
            return res.status(404).json({ msg: 'User not found' });
        }
        console.log('User found, generating OTP...'); // Log 3

        // Generate 6 digit OTP
        const otp = Math.floor(100000 + Math.random() * 900000).toString();

        // Hash OTP and save to database
        const salt = await bcrypt.genSalt(10);
        user.otp = await bcrypt.hash(otp, salt);
        user.otpExpires = Date.now() + 10 * 60 * 1000; // 10 Minutes
        await user.save();
        console.log('OTP generated and saved to DB'); // Log 4

        const message = `
            <h1>Password Reset Request</h1>
            <p>Your OTP/Verification Code is: <strong>${otp}</strong></p>
            <p>This code is valid for 10 minutes.</p>
        `;

        try {
            console.log('Calling sendEmail...'); // Log 5
            await sendEmail({
                email: user.email,
                subject: 'MCDevs Password Reset OTP',
                message
            });
            console.log('Email sent successfully (Route Handler)'); // Log 6
            res.status(200).json({ msg: 'OTP sent to email' });
        } catch (err) {
            console.error('Email sending failed in route:', err); // Log Error
            user.otp = undefined;
            user.otpExpires = undefined;
            await user.save();
            return res.status(500).json({ msg: 'Email could not be sent' });
        }
    } catch (err) {
        console.error('Server Error in forgot-password:', err.message);
        res.status(500).send('Server Error');
    }
});

// Verify OTP
router.post('/verify-otp', async (req, res) => {
    const { email, otp } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        if (!user.otp || !user.otpExpires) {
            return res.status(400).json({ msg: 'No OTP requested' });
        }

        if (user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'OTP has expired. Request a new one.' });
        }

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        res.status(200).json({ msg: 'OTP Verified' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// Reset Password
router.post('/reset-password', async (req, res) => {
    const { email, otp, newPassword } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(400).json({ msg: 'User not found' });
        }

        // Verify OTP again for security before resetting
        if (!user.otp || !user.otpExpires || user.otpExpires < Date.now()) {
            return res.status(400).json({ msg: 'Content Invalid or Expired' });
        }

        const isMatch = await bcrypt.compare(otp, user.otp);
        if (!isMatch) {
            return res.status(400).json({ msg: 'Invalid OTP' });
        }

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(newPassword, salt);

        // Clear OTP fields
        user.otp = undefined;
        user.otpExpires = undefined;

        await user.save();

        res.status(200).json({ msg: 'Password Reset Successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
