const Product = require('../models/Product');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const CustomValidationError = require('../errors/custom-validation-error');
const CustomApiErrorMessage = require('../errors/custom-error-message');
const { formatYupErrors, formatJoiErrors } = require('../utils/formatYupErrors');
const Joi = require('joi');

// Create a new product
async function createProduct(formInputs, files) {
    // let { name, description, category_id, variant_name, variant_color, variant_size, variant_stock, variant_price, tags, display_status } = formInputs
    formInputs.tags = formInputs.tags ? JSON.parse(formInputs.tags) : []

    const schema = Joi.object({
        name: Joi.string().required(),
        description: Joi.string().required(),
        category_id: Joi.string().required(),
        variant_name: Joi.string().required(),
        variant_color: Joi.string().required(),
        variant_size: Joi.number().required(),
        variant_stock: Joi.number().required(),
        variant_price: Joi.number().required(),
        display_status: Joi.string().required(),
        tags: Joi.array().items(Joi.string()).default(null)
    });
    // let parsedTags = JSON.parse(tags)
    // console.log('tags', typeof parsedTags)

    const result = schema.validate(formInputs, {
        abortEarly: false,
    });
    if (result?.error) throw new CustomValidationError(400, formatJoiErrors(result.error))

    return result
    // return {
    //     // name, description, category_id, variant_name, variant_color, variant_size, variant_stock, variant_price, tags
    // }

    // let errors = {}
    // const product = new Product(productData);
    // // if (!imageFile),{
    // //     errors.image = 'Image is required'
    // //     throw new CustomValidationError(422, errors, 'validation error')
    // // }

    // const fileName = generateFileName(imageFile);
    // const filePath = `uploads/${fileName}`;
    // await saveFile(imageFile, filePath);
    // product.image = fileName;
    // const savedProduct = await product.save();
    // return savedProduct;

}

// Generate a unique filename for the uploaded file
// function generateFileName(file) {
//     const extension = file.name.split('.').pop();
//     return `${uuidv4()}.${extension}`;
// }

// // Save the uploaded file to disk
// function saveFile(file, filePath) {
//     return new Promise((resolve, reject) => {
//         file.mv(filePath, (err) => {
//             if (err) {
//                 reject(err);
//             } else {
//                 resolve();
//             }
//         });
//     });
// }

module.exports = {
    createProduct
};