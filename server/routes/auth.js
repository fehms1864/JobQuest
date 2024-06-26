const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();
require('dotenv').config();

// Login Route
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(401).json({ message: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(401).json({ message: 'Invalid credentials' });

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    res.cookie('token', token, { httpOnly: true, maxAge: 3600000 }); // Cookie expires in 1 hour
    
    return res.status(200).json({ token });
  } catch (err) {
    return res.status(500).json({ message: 'Server error' });
  }
});
  
router.post('/signup', async (req, res) => {
    const { name, email, password } = req.body;
    try {
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ message: 'User already exists' });
  
      user = new User({ name, email, password: await bcrypt.hash(password, 10) });
      await user.save();
  
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
      return res.status(200).json({ token });
    } catch (err) {
      return res.status(500).json({ message: 'Server error' });
    }
});

module.exports = router;