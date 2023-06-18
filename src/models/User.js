const mongoose = require('mongoose');
// const CustomValidationError = require('../errors/custom-validation-error');
// const { string, number, date, object } = require('yup');
const { toJSON, paginate } = require('./plugins');


const userSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: [true, 'First name is required'],
        minlength: 4,
        maxlength: 10
    },
    last_name: {
        type: String,
        required: [true, 'Last name is required'],
        minlength: 4,
        maxlength: 10
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: true,
        trim: true,
        lowercase: true,
        match: [
            /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
            'Invalid email format',
        ],

    },
    password: {
        type: String,
        required: [true, 'password is required'],
        minlength: [5, 'password length must greater than 4'],
        // maxlength: [20, 'password length must less than 21'],
        trim: true,

        private: true,  // used by the toJSON plugin
    },
    role: {
        type: String,
        enum: ['user', 'admin'], default: 'user',
        minlength: 4,
        maxlength: 5,
        trim: true
    }
},
    {
        timestamps: true // Enable timestamps option
    }
);
userSchema.plugin(toJSON);
userSchema.plugin(paginate);


const User = mongoose.model('User', userSchema);

module.exports = { User };