
const CustomApiError = require("../errors/custom-error");
const { User } = require("../models/User");


exports.createUser = (name = '', email = '', password = '') => {
    
    try {
        let createdUser = User.create({ email, password, name })

    } catch (error) {
        throw new CustomApiError(401, 'Unable sign token')
    }
};




