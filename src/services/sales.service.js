const { salesModel } = require('../models');
const { validateNewSale } = require('./validations/validationInputs');

const addNewSale = async (newSale) => {
  const error = validateNewSale(newSale);

  if (error.type) return error;

  const response = await salesModel.insert(newSale);

  const { insertId } = response;

  const findSales = await salesModel.findSales(insertId);
};

module.exports = { addNewSale };
