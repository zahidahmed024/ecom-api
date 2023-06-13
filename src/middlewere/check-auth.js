const CustomApiError = require("../errors/custom-error");
const { verifyJwtToken } = require("../utils/jwt-config")


module.exports = async (req, res, next) => {
    // console.log('called')
    try {
        // check for auth header from client 
        const header = req.headers?.authorization

        if (!header) {
            throw new CustomApiError(401, 'Your session is not valid!')
        }

        const token = header.split("Bearer ")[1]
        // console.log('token', token)
        if (!token) {
            throw new CustomApiError(401, 'token not found!')
        }

        const user_id = verifyJwtToken(token, next)
        // console.log('access_token middleware', user_id)
        if (!user_id) {
            throw new CustomApiError(403, 'Invalid access token!')
        }

        req.user_id = user_id
        next()
    } catch (err) {
        next(err)
    }
}