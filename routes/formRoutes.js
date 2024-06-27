// formRoutes.js

const express = require('express');
const User = require('../models/User');

const router = express.Router();

// Route for handling form submission
router.post('/submit', async (req, res) => {
    // Extract data from request body
    const { name, username, email, phone, dob, password, confirmPassword, upi, yupi, L1, L2, moneyspend,ref } = req.body;

    // Check if passwords match
    if (password !== confirmPassword) {
        return res.status(400).json({ error: 'Passwords do not match' });
    }

    try {
        // Create a new user instance
        const newUser = new User({ name, username, email, phone, dob, password, upi, yupi, L1, L2, moneyspend,ref });

        // Save the new user to the database
        await newUser.save();

        // Redirect to success page upon successful registration
        res.redirect('/success.html');
    } catch (error) {
        // Handle errors
        console.error(error);
        res.status(500).json({ error: 'An error occurred while registering the user' });
    }
});

module.exports = router;
