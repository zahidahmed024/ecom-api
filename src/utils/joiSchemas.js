const Joi = require('joi');

module.exports.insertProductSchema = Joi.object({
    name: Joi.string().required(),
    description: Joi.string().required(),
    category: Joi.string().required(),
    variant_name: Joi.string().required(),
    variant_color: Joi.string().required(),
    variant_size: Joi.number().required(),
    variant_stock: Joi.number().required(),
    variant_price: Joi.number().required(),
    display_status: Joi.string().required(),
    tags: Joi.array().items(Joi.string()).default(null)
});

