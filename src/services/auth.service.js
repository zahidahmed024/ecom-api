const jwt = require("jsonwebtoken");
const { jwt_secret, jwt_refresh_expiration_days, jwt_access_expiration_minutes } = require("../configs/env-config");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { User } = require("../models/User");
const { findUserByEmail } = require("./user.service");
const { compare } = require("bcryptjs");
const CustomValidationError = require("../errors/custom-validation-error");
const { isEmpty } = require("lodash");


const createJwtToken = (payload, expiresIn) => {
    try {
        const token = jwt.sign(payload, jwt_secret, { expiresIn: expiresIn || jwt_access_expiration_minutes });
        return token;
    } catch (error) {
        throw new CustomApiErrorMessage(401, 'Unable sign token')
    }
};

// function generateAccessToken(user, expiresIn) {
//     return jwt.sign({ id: user.id, username: user.username }, secretKey, { expiresIn });
// }

const verifyJwtToken = (token = '', errorMessage = '') => {

    let newMessage = errorMessage || 'Invalid access token!'
    // console.log('refresh token', token)
    try {
        const { id } = jwt.verify(token, jwt_secret);
        return id;
    } catch (err) {
        // console.log('errorMessage', errorMessage)
        throw new CustomApiErrorMessage(403, newMessage)
    }
};



const loginWithEmailAndPassword = async (email, password) => {
    try {

        let errors = {}

        let user = await findUserByEmail(email)

        if (!user) {
            errors.email = "wrong email"
            throw new CustomValidationError(500, errors, 'Email is not valid')
        }

        let isValidPassword = await compare(password, user?.password)

        if (!isValidPassword) {
            errors.password = "wrong password"
            throw new CustomValidationError(500, errors, 'Wrong password')
        }

        let accessToken = createJwtToken({ id: user?.id });
        let refreshToken = createJwtToken({ id: user?.id }, jwt_refresh_expiration_days);

        //should be alert error on client user

        if (!accessToken) {
            throw new CustomApiErrorMessage(500, 'failed creating jwt token')
        }

        // if (!isEmpty(errors)) {
        //     throw new CustomValidationError(400, errors, 'validation error')
        // }

        return { accessToken, refreshToken }

    } catch (error) {
        throw new CustomValidationError(500, error, 'validation error')

    }
};



module.exports = {
    createJwtToken,
    verifyJwtToken,
    loginWithEmailAndPassword
}


