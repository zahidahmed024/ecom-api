const mongoose = require('mongoose');


const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
    },
    password: {
        type: String,
        required: true,
        minlength: 8,
        maxlength: 20,
        trim: true
    },
    role: {
        type: String,
        enum: ['user', 'admin'], default: 'user',
        minlength: 4,
        maxlength: 5,
        trim: true
    }
});

const User = mongoose.model('User', userSchema);

module.exports = { User };