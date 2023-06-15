const { Router } = require("express");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { authController } = require("../controllers");
const checkAuth = require("../middlewere/check-auth");

const authRouter = Router()

const mainRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/refresh-token', authController.refreshToken)


// authorized routes
mainRouter.use(checkAuth)

mainRouter.get('/user', (req, res) => {
    return res.send('hallo world')
})

module.exports = { authRouter, mainRouter }