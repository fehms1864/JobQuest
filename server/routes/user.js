const express = require('express');
const User = require('../models/User');
const authMiddleware = require('../middlewares/auth');
const router = express.Router();

router.get('/user', authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user._id).select();
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        return res.status(200).json(user);
    } catch (err) {
        return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;