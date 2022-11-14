const { productsModel } = require('../models');
const { validateId, validateNameProduct } = require('./validations/validationInputs');

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
  const error = validateNameProduct(newProduct);

  if (error.type) return error;

  const productId = await productsModel.insert(newProduct);

  const findProduct = await productsModel.findById(productId);

  return { type: null, message: findProduct };
};

const updateProduct = async ({ id, name }) => {
  const error = validateNameProduct(name);

  if (error.type) return error;

  const checkIfProductExist = await productsModel.findById(id);

  if (!checkIfProductExist) return { type: 'not.found', message: 'Product not found' };

  await productsModel.update({ id, name });

  const productUpdated = await productsModel.findById(id);

  return { type: '', message: productUpdated };
};

module.exports = {
  getAllProducts,
  getById,
  createNewProduct,
  updateProduct,
};
