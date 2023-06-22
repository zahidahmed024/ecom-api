const mongoose = require('mongoose');
const { toJSON, paginate } = require('./plugins');


// Define the Product Schema
const productSchema = new mongoose.Schema({
    name: { type: String, required: true },
    description: { type: String, required: true },
    tags: [String],
    reviews: [
        {
            user: { type: mongoose.Schema.Types.ObjectId, ref: 'User', },
            rating: { type: Number, },
            comment: { type: String, }
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
            price: { type: Number, required: true },
            images: [
                { type: String, required: true }
            ]
        }
    ],
    display_status: { type: String, enum: ['show', 'hide'], default: 'hide' }

},

    {
        timestamps: true // Enable timestamps option
    }
);
// productSchema.pre('validate', async function (next) {
//     const user = this;

//     try {


//         next();
//     } catch (err) {
//         next(err);
//     }
// })

productSchema.plugin(toJSON);
productSchema.plugin(paginate);

const Product = mongoose.model('Product', productSchema);
module.exports = { Product };
