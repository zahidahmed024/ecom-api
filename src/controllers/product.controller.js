const { catchAsync } = require("../utils");
const { createUser } = require("../services/user.service");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { loginWithEmailAndPassword, verifyJwtToken, createJwtToken } = require("../services/auth.service");


const addProduct = catchAsync(async (req, res, next) => {

    // let createdUser = await createUser(req.body)


    // if (!createdUser) {
    //     throw new CustomApiErrorMessage(500, '')
    // }
    return res.status(200).send({
        message: 'product Created successfully',
        data: { ...req.body, ...req.files },
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