const { Router } = require("express");
const CustomApiError = require("../errors/custom-error");
const { authController } = require("../controllers");

const mainRouter = Router()

mainRouter.post('/register', authController.register)


module.exports = mainRouter