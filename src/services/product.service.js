const { Product } = require('../models/Product');

const { promisify } = require('util');

const CustomValidationError = require('../errors/custom-validation-error');
const CustomApiErrorMessage = require('../errors/custom-error-message');
const { formatYupErrors, formatJoiErrors } = require('../utils/formatYupErrors');
const Joi = require('joi');
const { compressAndMoveImage } = require('../utils/compressAndMoveImage');
const { insertProductSchema } = require('../utils/joiSchemas');

// Create a new product

module.exports.createProduct = async (req) => {

    let formInputs = req.body
    let images = req.files.variant_images
    // console.log('files', )
    formInputs.tags = formInputs.tags ? JSON.parse(formInputs.tags) : []

    let { name, description, category, variant_name, variant_color, variant_size, variant_stock, variant_price, tags, reviews, display_status } = formInputs

    const result = insertProductSchema.validate(formInputs, {
        abortEarly: false,
    });
    if (result?.error) throw new CustomValidationError(400, formatJoiErrors(result.error))

    //image section
    let modifiedImageUrls = []
    //host url
    const hostUrl = `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}`;

    if (Array.isArray(images)) {
        const promises = images.map(item => compressAndMoveImage(item));
        let result = await Promise.all(promises);
        result.forEach(item => modifiedImageUrls.push(`${hostUrl}/${item}`))
    } else if (images) {
        let result = await compressAndMoveImage(images)
        modifiedImageUrls.push(`${hostUrl}/${result}`)
    }

    let modifiedFormInputs = {
        name,
        description,
        category,
        tags: tags,
        reviews,
        variants: {
            name: variant_name,
            color: variant_color,
            price: variant_price,
            size: variant_size,
            stock: variant_stock,
            images: modifiedImageUrls
        },
        display_status

    }
    let product = await Product.create(modifiedFormInputs)

    return product
}

//update product details name description tags review display status
module.exports.updateProductDetails = async (product_id, inputs) => {
    let { name, description, category, tags, reviews, display_status } = inputs
    let result = Product.findByIdAndUpdate(product_id, inputs, { new: true, runValidators: true })
    return result
}

//update product variant
module.exports.updateProductVariant = async (inputs) => {
    let { variant_name, variant_color, variant_price, variant_size, variant_stock, modifiedImageUrls } = inputs

}

// get all products
module.exports.getAllProduct = async () => {
    let allProduct = await Product.find({})
    return allProduct
}


// delete products
module.exports.deleteProduct = async (id) => {
    if (!id) {
        throw new CustomApiErrorMessage(500, 'Please provice product id')
    }
    let deletedProduct = await Product.findByIdAndRemove(id)
    return deletedProduct
}







