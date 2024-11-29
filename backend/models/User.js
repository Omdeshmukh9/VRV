const express = require('express');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const { protect, authorize } = require('../middleware/auth');

const router = express.Router();


router.post('/register', async (req, res) => {
  const { username, password, role } = req.body;

  try {
    
    const userExists = await User.findOne({ username });
    if (userExists) {
      return res.status(400).json({ message: 'User already exists' });
    }

    const user = new User({
      username,
      password,
      role,
    });

    await user.save();

    res.status(201).json({ message: 'User created successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Login user
router.post('/login', async (req, res) => {
  const { username, password } = req.body;

  try {
    // Find user by username
    const user = await User.findOne({ username });
    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Compare entered password with stored hashed password
    const isMatch = await user.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    // Generate a JWT token with user's ID and role
    const token = jwt.sign(
      { id: user._id, role: user.role }, // Add user role to token payload
      process.env.JWT_SECRET,
      { expiresIn: '1h' }
    );

    // Send token and user data (including role) as a response
    res.json({
      token,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,  // Include role in the response
      },
    });
  } catch (error) {
    res.status(500).json({ message: 'Server error', error });
  }
});

// Protected route for admin
router.get('/admin', protect, authorize('admin'), (req, res) => {
  res.json({ message: 'Welcome Admin' });
});

// Protected route for moderator
router.get('/moderator', protect, authorize('admin', 'moderator'), (req, res) => {
  res.json({ message: 'Welcome Moderator' });
});

// Protected route for general users
router.get('/user', protect, authorize('admin', 'moderator', 'user'), (req, res) => {
  res.json({ message: 'Welcome User' });
});

module.exports = router;
