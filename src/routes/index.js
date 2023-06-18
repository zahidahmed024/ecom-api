const { Router } = require("express");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { authController, userController } = require("../controllers");
const checkAuth = require("../middlewere/check-auth");

const authRouter = Router()

const mainRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/refresh-token', authController.refreshToken)


// authorized routes
mainRouter.use(checkAuth)

mainRouter.get('/user', userController.getProfile)

module.exports = { authRouter, mainRouter }