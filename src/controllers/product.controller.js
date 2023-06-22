const { catchAsync } = require("../utils");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { createProduct } = require("../services/product.service");


const addProduct = catchAsync(async (req, res, next) => {
    let product = await createProduct(req.body, req.files)

    return res.status(200).send({
        message: 'product Created successfully',
        data: product,
        success: true
    })


})

const getProducts = catchAsync(async (req, res, next) => {

    // let createdUser = await createUser(req.body)


    // if (!createdUser) {
    //     throw new CustomApiErrorMessage(500, '')
    // }
    // return res.status(200).send({
    //     message: 'User Created successfully',
    //     data: null,
    //     success: true
    // })


})



module.exports = {
    addProduct,
    getProducts
}