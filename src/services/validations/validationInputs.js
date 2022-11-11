const { idSchema, newProduct } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNewProduct = (name) => {
  const { error } = newProduct.validate({ name });
  if (error) return { type: 'INVALID_INPUT', message: error.message };

  return { type: null, message: '' };
};

module.exports = { validateId, validateNewProduct };
