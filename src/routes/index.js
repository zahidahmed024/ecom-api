const { Router } = require("express");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { authController, userController, categoryController, productController } = require("../controllers");
const checkAuth = require("../middlewere/check-auth");

const authRouter = Router()

const mainRouter = Router()

authRouter.post('/register', authController.register)
authRouter.post('/login', authController.login)
authRouter.post('/refresh-token', authController.refreshToken)


// authorized routes
mainRouter.use(checkAuth)

mainRouter.get('/user', userController.getProfile)

//category
mainRouter.post('/category', categoryController.addCategory)


//product
mainRouter.post('/product', productController.addProduct)

module.exports = { authRouter, mainRouter }