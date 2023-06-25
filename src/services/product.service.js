const { Product } = require('../models/Product');

const { promisify } = require('util');

const CustomValidationError = require('../errors/custom-validation-error');
const CustomApiErrorMessage = require('../errors/custom-error-message');
const { formatYupErrors, formatJoiErrors } = require('../utils/formatYupErrors');
const Joi = require('joi');
const { compressAndMoveImage } = require('../utils/compressAndMoveImage');

// Create a new product

async function createProduct(req) {
    let formInputs = req.body
    let images = req.files.variant_images
    // console.log('files', )
    formInputs.tags = formInputs.tags ? JSON.parse(formInputs.tags) : []

    let { name, description, category, variant_name, variant_color, variant_size, variant_stock, variant_price, tags, reviews, display_status } = formInputs

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category: Joi.string().required(),
        variant_name: Joi.string().required(),
        variant_color: Joi.string().required(),
        variant_size: Joi.number().required(),
        variant_stock: Joi.number().required(),
        variant_price: Joi.number().required(),
        display_status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).default(null)
    });

    const result = schema.validate(formInputs, {
        abortEarly: false,
    });
    if (result?.error) throw new CustomValidationError(400, formatJoiErrors(result.error))

    //image section
    let modifiedImageUrls
    if (Array.isArray(images)) {
        // console.log('images', images)
        const promises = images.map(item => compressAndMoveImage(item));
        const hostUrl = `${req.connection.encrypted ? 'https' : 'http'}://${req.headers.host}`;
        let result = await Promise.all(promises);
        modifiedImageUrls = result.map(item => `${hostUrl}/${item}`)
    }
    
    let modifiedFormInputs = {
        name,
        description,
        category,
        tags: formInputs.tags,
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
    // console.log(product)


    return product

}









module.exports = {
    createProduct
};