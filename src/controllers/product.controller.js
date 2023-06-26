const { catchAsync } = require("../utils");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { createProduct, getAllProduct, deleteProduct } = require("../services/product.service");


module.exports.addProduct = catchAsync(async (req, res, next) => {
    let product = await createProduct(req)

    return res.status(200).send({
        message: 'product Created successfully',
        data: product,
        success: true
    })


})

module.exports.getProduct = catchAsync(async (req, res, next) => {

    let products = await getAllProduct()

    if (!products) {
        throw new CustomApiErrorMessage(500, 'Faild to fetch product ')
    }
    return res.status(200).send({
        message: 'products fetched successfully',
        data: products,
        success: true
    })


})
module.exports.editProduct = catchAsync(async (req, res, next) => {

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
module.exports.removeProduct = catchAsync(async (req, res, next) => {
    let id = req.params.id || ''
    let result = await deleteProduct(id)

    if (!result) {
        throw new CustomApiErrorMessage(500, 'Failed to delete product')
    }
    return res.status(200).send({
        message: 'Product deleted successfully',
        data: result,
        success: true
    })


})



