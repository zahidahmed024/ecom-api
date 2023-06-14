const { hash } = require("bcryptjs");
const { User } = require("../models/User");
const { authService } = require("../services");
const { catchAsync } = require("../utils");
const { string, number, date, object } = require("yup");
const { createUser } = require("../services/user.service");
const CustomApiErrorMessage = require("../errors/custom-error-message");


module.exports.register = catchAsync(async (req, res, next) => {

    let createdUser = await createUser(req.body)
    if (!createdUser) {
        throw new CustomApiErrorMessage(500, '')
    }
    return res.status(200).send({
        message: 'User Created successfully',
        data: createdUser,
        success: true
    })


})

exports.login = (payload) => {
    try {
        authService.createJwtToken()

    } catch (error) {
        throw new CustomApiErrorMessage(401, 'Unable sign token')
    }
};