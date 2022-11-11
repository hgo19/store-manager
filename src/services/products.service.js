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

const createNewProduct = async (newProduct) => {
  const productId = await productsModel.insert(newProduct);

  const findProduct = await productsModel.findById(productId);

  return { type: null, message: findProduct };
};

module.exports = { getAllProducts, getById, createNewProduct };
