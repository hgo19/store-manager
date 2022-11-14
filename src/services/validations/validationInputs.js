const { idSchema, newProductSchema, newSaleSchema } = require('./schemas');

const validateId = (id) => {
  const { error } = idSchema.validate(id);

  if (error) return { type: 'INVALID_VALUE', message: error.message };

  return { type: null, message: '' };
};

const validateNameProduct = (name) => {
  const { error } = newProductSchema.validate({ name });
  if (error) {
    const [{ type }] = error.details;
    return { type, message: error.message };
  }

  return { type: null, message: '' };
};

const validateNewSale = (newSale) => {
  const { error } = newSaleSchema.validate(newSale);

  if (error) {
    const [{ type }] = error.details;
    const newMessage = error.message.split('].');
    return { type, message: `"${newMessage[1]}` };
  }

  return { type: null, message: '' };
};

module.exports = { validateId, validateNameProduct, validateNewSale };
