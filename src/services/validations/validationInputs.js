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

  if (error) {
    const [{ type }] = error.details;
    const newMessage = error.message.split('].');
    return { type, message: `"${newMessage[1]}` };
  }

  return { type: null, message: '' };
};

// const newSale = [
//   { productId: 1, quantity: 0 },
//   { productId: 2, quantity: 1 },
// ];

// console.log(validateNewSale(newSale));

module.exports = { validateId, validateNewProduct, validateNewSale };
