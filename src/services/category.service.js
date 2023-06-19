const CustomApiErrorMessage = require("../errors/custom-error-message");
const CustomValidationError = require("../errors/custom-validation-error");
const Category = require("../models/Category");

const createCategory = async (body) => {
    let errors = {}
    let { parent_category, ...rest } = body
    let checkExisting = await findCategoryByName(body.name)

    if (checkExisting) {
        errors.name = "Category already exists"
        throw new CustomValidationError(422, errors, 'validation error')
    }

    const createdCategory = await Category.create({ ...rest, parent_category: parent_category || null })
    return createdCategory;
};

const findCategoryByName = (name) => {
    let category = Category.findOne({ name: name })
    return category;
};





module.exports = {
    createCategory
}


