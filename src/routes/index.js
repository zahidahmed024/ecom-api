const { Router } = require("express");
const CustomApiError = require("../errors/custom-error");

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
    throw new CustomApiError(422, 'checking errors')
    // throw ({ statusCode: 422, message: 'checking errors' })
    // return res.status(200).send('building real world project with express')
})


module.exports = mainRouter