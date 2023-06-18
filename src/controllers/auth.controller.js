const { catchAsync } = require("../utils");
const { createUser } = require("../services/user.service");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { loginWithEmailAndPassword, verifyJwtToken, createJwtToken } = require("../services/auth.service");


const register = catchAsync(async (req, res, next) => {

    let createdUser = await createUser(req.body)
    if (!createdUser) {
        throw new CustomApiErrorMessage(500, '')
    }
    return res.status(200).send({
        message: 'User Created successfully',
        data: null,
        success: true
    })


})

const login = catchAsync(async (req, res, next) => {
    let email = req.body?.email || ''
    let password = req.body?.password || ''
    let { accessToken, refreshToken } = await loginWithEmailAndPassword(email, password)

    return res.status(200).send({
        success: true,
        data: {
            access_token: accessToken,
            refresh_token: refreshToken
        }
    })
});

const refreshToken = catchAsync(async (req, res, next) => {
    let refreshToken = req.body?.refresh_token || ''
    let { id } = verifyJwtToken(refreshToken)
    let newJwtToken = createJwtToken({ id })

    return res.status(200).send({
        success: true,
        data: {
            access_token: newJwtToken,
            // refresh_token: refreshToken
        }
    })
});

module.exports = {
    register,
    login,
    refreshToken
}