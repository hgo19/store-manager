const { idSchema, newProductSchema, newSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = newProductSchema.validate({ name });
  if (error) return { type: 'INVALID_INPUT', message: error.message };

  return { type: null, message: '' };
};

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);

  if (error) return { type: 'INVALID_INPUT', message: error.message };

  return { type: null, message: '' };
};

module.exports = { validateId, validateNewProduct, validateNewSale };
