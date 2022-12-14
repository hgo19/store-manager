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

const updateSale = async (id, saleToUpdate) => {
  const error = validateNewSale(saleToUpdate);

  if (error.type) return error;

  const checkIfSaleExist = await salesModel.findById(id);

  if (!checkIfSaleExist.length) return { type: 'not.found', message: 'Sale not found' };

  const checkProducts = await doesProductExist(saleToUpdate);

  if (checkProducts.some((product) => typeof product === 'undefined')) {
    return { type: 'not.found', message: 'Product not found' };
  }

  const response = await salesModel.update(id, saleToUpdate);

  if (response.some(([{ affectedRows }]) => affectedRows > 0)) {
    const objectToReturn = {
      saleId: id,
      itemsUpdated: saleToUpdate,
    };

    return { type: '', message: objectToReturn };
  }
};

module.exports = {
  addNewSale,
  doesProductExist,
  getAll,
  getById,
  deleteSale,
  updateSale,
};
