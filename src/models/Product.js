const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: [true, 'Please provide a name for this product'] },
    description: { type: String, required: [true, 'Please provide description'] },
    price: { type: Number, required: [true, 'please provide price'] },
    tags: [String],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        }
    ],
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
        // required: [true]
    },
    variants: [
        {
            color: { type: String, required: true },
            name: { type: String, required: true },
            size: { type: String, required: true },
            stock: { type: Number, required: true },
            images: [
                { type: String, required: true }
            ]
        }
    ]
},

    {
        timestamps: true // Enable timestamps option
    }
);


const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
