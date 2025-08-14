const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const bcrypt = require('bcryptjs');
const { protectAdmin } = require('../middleware/auth');

// Register
router.post('/register', async (req, res, next) => {
    try {
        const { username, password, isAdmin } = req.body;
        const user = new User({ username, password, isAdmin });
        await user.save();
        res.status(201).json({ message: 'User registered' });
    } catch (error) {
        next(error);
    }
});

// Login
router.post('/login', async (req, res, next) => {
    try {
        const { username, password } = req.body;
        const user = await User.findOne({ username });
        if (!user || !(await user.matchPassword(password))) {
            return res.status(401).json({ message: 'Invalid credentials' });
        }
        const token = jwt.sign(
            { userId: user._id, isAdmin: user.isAdmin },
            process.env.JWT_SECRET,
            { expiresIn: '1d' }
        );
        res.json({ token, isAdmin: user.isAdmin });
    } catch (error) {
        next(error);
    }
});

// TEMP: Allow unauthenticated admin password reset for 'admin' user only
router.post('/change-password', async (req, res, next) => {
    try {
        const { username, newPassword } = req.body;
        if (username !== 'admin') {
            return res.status(403).json({ message: 'Only admin password can be reset this way.' });
        }
        const user = await User.findOne({ username });
        if (!user || !user.isAdmin) {
            return res.status(404).json({ message: 'Admin user not found' });
        }
        user.password = newPassword;
        await user.save();
        res.json({ message: 'Password changed successfully' });
    } catch (error) {
        next(error);
    }
});
module.exports = router;