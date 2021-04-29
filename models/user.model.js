const mongoose = require('mongoose');
const { roles } = require('../config');

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
    },
    username: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        trim: true,
        private: true,
    },
    role: {
        type: String,
        enum: roles,
        default: 'student',
    },
});

const User = mongoose.model('User', userSchema);

module.exports = User;
