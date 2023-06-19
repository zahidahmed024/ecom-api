const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'Please add category name']
    },
    description: String,
    parent_category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        default: null

    },
},
    {
        timestamps: true // Enable timestamps option
    }
);
categorySchema.plugin(toJSON);
categorySchema.plugin(paginate);

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
