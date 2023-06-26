const { catchAsync } = require("../utils");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { createProduct, getAllProduct, deleteProduct, updateProductDetails, updateProductVariant } = require("../services/product.service");


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
        throw new CustomApiErrorMessage(400, 'Faild to fetch product ')
    }
    return res.status(200).send({
        message: 'products fetched successfully',
        data: products,
        success: true
    })


})
module.exports.editProduct = catchAsync(async (req, res, next) => {

    let { product_id, variant_id } = req.query

    if (!product_id && !variant_id) {
        throw new CustomApiErrorMessage(400, 'please provide product_id or variant_id')
    }
    if (product_id) {
        let productDetail = await updateProductDetails(product_id, req.body)
        if (!productDetail) {
            throw new CustomApiErrorMessage(400, 'product update failed')
        }
        return res.status(200).send({
            message: 'product updated successfully',
            data: productDetail,
            success: true
        })
    }
    if (variant_id) {
        let { variant_name, variant_color, variant_price, variant_size, variant_stock, modifiedImageUrls } = req.body
        let result = await updateProductVariant(variant_id, req.body)
    }
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



