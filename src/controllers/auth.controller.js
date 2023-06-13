const { hash } = require("bcryptjs");
const { User } = require("../models/User");
const { authService } = require("../services");
const { catchAsync } = require("../utils");


module.exports.register = catchAsync(async (req, res, next) => {
    let email = req.body?.email || ''
    let password = req.body?.password || ''
    // const hashedPassword = await hash(password, salt)
    await User.create({ email, password })

    // let result = await User.findOne({ email: email })

    // if (result?.email) {
    //     throw ({ name: 'ValidationError', message: 'This email is already Taken' })
    // }

    // const salt = await genSalt(10)
    // const hashedPassword = await hash(password, salt)
    // let user = await User.create({ email, password: hashedPassword })

    // return res.status(200).send({
    //     message: 'User Created successfully',
    //     data: null,
    //     success: true
    // })
})

exports.login = (payload) => {
    try {
        authService.createJwtToken()

    } catch (error) {
        throw new CustomApiError(401, 'Unable sign token')
    }
};