const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const User = require('../models/User');

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

module.exports = router;