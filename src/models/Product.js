const mongoose = require('mongoose');

// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    price: { type: Number, required: true },
    category: { type: String, required: true },
    tags: [String],
    reviews: [
        {
            userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
            rating: { type: Number, required: true },
            comment: { type: String, required: true }
        }
    ],
    variants: [
        {
            color: { type: String, required: true },
            size: { type: String, required: true },
            stock: { type: Number, required: true }
        }
    ]
});


const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
