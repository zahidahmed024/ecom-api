const jwt = require("jsonwebtoken");
const { jwt_secret } = require("../configs/env-config");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { User } = require("../models/User");


exports.createJwtToken = (payload) => {
    try {
        const token = jwt.sign(payload, jwt_secret, { expiresIn: "365d" });
        return token;
    } catch (error) {
        throw new CustomApiErrorMessage(401, 'Unable sign token')
    }
};

exports.verifyJwtToken = (token, next) => {
    try {
        const { user_id } = jwt.verify(token, jwt_secret);
        return user_id;
    } catch (err) {
        throw new CustomApiErrorMessage(401, 'oken is not valid')
    }
};



exports.loginWithEmailAndPassword = (token, next) => {
    try {
        const { user_id } = jwt.verify(token, jwt_secret);
        return user_id;
    } catch (err) {
        throw new CustomApiErrorMessage(401, 'oken is not valid')
    }
};





