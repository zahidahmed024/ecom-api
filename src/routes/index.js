const { Router } = require("express");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { authController } = require("../controllers");

const mainRouter = Router()

mainRouter.post('/register', authController.register)


module.exports = mainRouter