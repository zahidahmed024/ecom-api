const { Router } = require("express");

const mainRouter = Router()

mainRouter.get('/', (req, res) => {
    return res.status(200).send('building real world project with express')
})


module.exports = mainRouter