const bcrypt = require('bcryptjs')
const CustomValidationError = require("../errors/custom-validation-error");
const { User } = require("../models/User");
const { isEmpty } = require('lodash');


const createUser = async (requestBody) => {
    let errors = {}
    // console.log('requestBody', requestBody)
    let user = await findUserByEmail(requestBody.email)

    // console.log('requestBody?.password?.length', requestBody?.password?.length)
    if (user?.email) {
        errors.email = "Email already exists"
    }
    if (!requestBody?.password) {
        errors.password = 'Password is required'
    }
    if (requestBody?.password?.length < 4) {
        errors.password = 'Password length must be greater than 4'
    }
    if (requestBody?.password?.length > 20) {
        errors.password = 'Password length must be less than 21'
    }
    if (!isEmpty(errors)) {
        throw new CustomValidationError(400, errors, 'validation error')
    }
    const hash = await bcrypt.hash(requestBody.password, 10);
    requestBody.password = hash;

    let createdUser = await User.create(requestBody)
    return createdUser

};


const findUserByEmail = (email) => {
    const user = User.findOne({ email: email })
    return user;
};





module.exports = {
    findUserByEmail,
    createUser
}