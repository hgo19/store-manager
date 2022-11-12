const { salesModel, productsModel } = require('../models');
const { validateNewSale } = require('./validations/validationInputs');

const doesProductExist = async (newSale) => Promise.all(
    newSale.map(({ productId }) => productsModel.findById(productId)),
  );

const addNewSale = async (newSale) => {
  const error = validateNewSale(newSale);

  if (error.type) return error;

  const checkProducts = await doesProductExist(newSale);

  if (checkProducts.some((product) => typeof product === 'undefined')) {
    return { type: 'INVALID_INPUT', message: 'Product not found' };
  }

  const response = await salesModel.insert(newSale);

  const { insertId } = response;

  const objectToReturn = {
    id: insertId,
    itemsSold: newSale,
  };

  return { type: '', message: objectToReturn };
};

const salesExample = [
  {
    productId: 32,
    quantity: 1,
  },
  {
    productId: 32,
    quantity: 5,
  },
];

addNewSale(salesExample);

module.exports = { addNewSale, doesProductExist };
