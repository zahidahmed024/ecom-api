const Product = require('../models/Product');
const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const CustomValidationError = require('../errors/custom-validation-error');
const CustomApiErrorMessage = require('../errors/custom-error-message');

// Create a new product
async function createProduct(productData, imageFile) {

    let errors = {}
    const product = new Product(productData);
    // if (!imageFile) {
    //     errors.image = 'Image is required'
    //     throw new CustomValidationError(422, errors, 'validation error')
    // }

    const fileName = generateFileName(imageFile);
    const filePath = `uploads/${fileName}`;
    await saveFile(imageFile, filePath);
    product.image = fileName;
    const savedProduct = await product.save();
    return savedProduct;

}

// Generate a unique filename for the uploaded file
function generateFileName(file) {
    const extension = file.name.split('.').pop();
    return `${uuidv4()}.${extension}`;
}

// Save the uploaded file to disk
function saveFile(file, filePath) {
    return new Promise((resolve, reject) => {
        file.mv(filePath, (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        });
    });
}

module.exports = {
    createProduct
};