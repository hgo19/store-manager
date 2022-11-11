const { productsModel } = require('../models');

const getAllProducts = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

const getById = async (productId) => {
  const product = await productsModel.findById(productId);

  if (!product) return { type: 'Product not found', message: null };

  return { type: null, message: product };
};

module.exports = { getAllProducts, getById };
