const fs = require('fs');
const { v4: uuidv4 } = require('uuid');
const sharp = require('sharp');
const CustomApiErrorMessage = require('../errors/custom-error-message');
const { promisify } = require('util');
const path = require('path')
const mkdirAsync = promisify(fs.mkdir);
const unlinkAsync = promisify(fs.unlink);




module.exports.compressAndMoveImage = async (image, destinationFolder = 'product/') => {
    const rootPath = path.resolve() + '/public/'

    try {
        if (!fs.existsSync(rootPath + destinationFolder)) {
            await mkdirAsync(rootPath + destinationFolder);
        }
        // Set the path for the original and compressed image
        // if (Array.isArray(image)) {

        // }
        const originalImagePath = rootPath + `original-images/${image.name}`;
        const compressedImagePath = rootPath + `${destinationFolder}${image.name}`;

        // Move the uploaded image to the original-images folder
        await image.mv(originalImagePath);

        // Compress the image using sharp
        await sharp(originalImagePath)
            .resize(800)
            .toFile(compressedImagePath);

        // Remove the original image
        await unlinkAsync(originalImagePath);

        // Return the path to the compressed image
        return compressedImagePath?.replace(rootPath, '');
    } catch (error) {
        // throw new CustomApiErrorMessage(400, 'Image upload failed')
        throw new CustomApiErrorMessage(400, error)
    }
    // Create the destination folder if it doesn't exist
}