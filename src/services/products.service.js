const { productsModel } = require('../models');
const { validateId, validateNewProduct } = require('./validations/validationInputs');

const getAllProducts = async () => {
  const products = await productsModel.findAll();

  return { type: null, message: products };
};

const getById = async (productId) => {
  const error = validateId(productId);

  if (error.type) return error;

  const product = await productsModel.findById(productId);

  if (!product) return { type: 'Product not found', message: null };

  return { type: null, message: product };
};

const createNewProduct = async (newProduct) => {
  const error = validateNewProduct(newProduct);

  if (error.type) return error;

  const productId = await productsModel.insert(newProduct);

  const findProduct = await productsModel.findById(productId);

  return { type: null, message: findProduct };
};

module.exports = { getAllProducts, getById, createNewProduct };
