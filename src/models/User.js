const mongoose = require('mongoose');
const CustomValidationError = require('../errors/custom-validation-error');
const { string, number, date, object } = require('yup');


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
        trim: true
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
        toJSON: {
            transform: function (doc, ret) {
                ret.id = ret._id;
                delete ret._id;
                delete ret.__v;
            },
        },
    }
);

// userSchema.pre('save', async function (next) {
//     try {
//         // inputs 
//         const user = this;

//         let errors = {}

//         const existingUser = await mongoose.models.User.findOne({ email: user.email });
//         if (existingUser) {
//             errors.email = 'User with this email already exists';
//             throw new CustomValidationError(422, errors, 'Email already exists')
//         }

//         next(); // No validation errors, proceed to next middleware
//     } catch (err) {
//         // console.log('error', err)
//         next(err); // Pass any error to the next middleware
//     }
// });

const User = mongoose.model('User', userSchema);

module.exports = { User };