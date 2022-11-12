const Joi = require('joi');

const idSchema = Joi.number().min(1).required();

const newProductSchema = Joi.object({
  name: Joi.string().min(5).required(),
});

const newSaleSchema = Joi.array().items(Joi.object({
  productId: Joi.number().required(),
  quantity: Joi.number().min(1).required(),
}));

module.exports = { idSchema, newProductSchema, newSaleSchema };
