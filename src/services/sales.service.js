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
    return { type: 'not.found', message: 'Product not found' };
  }

  const response = await salesModel.insert(newSale);

  const { insertId } = response;

  const objectToReturn = {
    id: insertId,
    itemsSold: newSale,
  };

  return { type: '', message: objectToReturn };
};

const getAll = async () => {
  const response = await salesModel.findAllSales();

  return { type: '', message: response };
};

const getById = async (id) => {
  const response = await salesModel.findById(id);

  if (response.length < 1) return { type: 'not.found', message: 'Sale not found' };

  return { type: '', message: response };
};

const deleteSale = async (id) => {
  const response = await salesModel.findById(id);

  if (!response.length) return { type: 'not.found', message: 'Sale not found' };

  const deletedSale = await salesModel.deleteSale(id);

  return { type: '', message: deletedSale };
};

module.exports = {
  addNewSale,
  doesProductExist,
  getAll,
  getById,
  deleteSale,
};
