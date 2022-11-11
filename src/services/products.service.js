const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

module.exports = { getAllProducts };
