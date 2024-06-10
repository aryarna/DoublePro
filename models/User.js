// user.js

const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    username: { type: String, required: true },
    email: { type: String, required: true },
    phone: { type: String, required: true },
    dob: { type: Date, required: true },
    password: { type: String, required: true },
    upi: { type: Number, required: true },
    yupi: { type: String, required: true },
    L1: { type: String, required: true },
    L2: { type: String, required: true },
    moneyspend: { type: String, required: true }
});

const User = mongoose.model('Gin', userSchema);

module.exports = User;
