const mongoose = require('mongoose');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: String,
    parentCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category'
    },
    createdAt: {
        type: Date,
        default: Date.now
    },
},
    {
        timestamps: true // Enable timestamps option
    }
);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
