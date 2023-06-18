const { catchAsync } = require("../utils");
const { findUserById } = require("../services/user.service");
const CustomApiErrorMessage = require("../errors/custom-error-message");


const getProfile = catchAsync(async (req, res, next) => {

    let user = await findUserById(req.user_id)
    if (!user) {
        throw new CustomApiErrorMessage(500, '')
    }
    return res.status(200).send({
        message: 'Successfully fetched user data',
        data: user,
        success: true
    })


})


module.exports = {
    getProfile
}