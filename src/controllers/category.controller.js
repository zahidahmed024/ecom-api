const { catchAsync } = require("../utils");
const CustomApiErrorMessage = require("../errors/custom-error-message");
const { createCategory } = require("../services/category.service");


const addCategory = catchAsync(async (req, res, next) => {
    let category = await createCategory(req.body)
    if (!category) {
        throw new CustomApiErrorMessage(500, '')
    }
    return res.status(200).send({
        message: 'Category created successfully',
        data: category,
        success: true
    })


})


module.exports = {
    addCategory
}