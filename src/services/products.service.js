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

const deleteProduct = async (id) => {
  const checkIfProductExist = await productsModel.findById(id);

  if (!checkIfProductExist || checkIfProductExist.length === 0) {
    return { type: 'not.found', message: 'Product not found' };
  }

  await productsModel.deleteProduct(id);

  return { type: '', message: 'Product Deleted' };
};

const findByName = async (name) => {
  if (!name) {
    const allProducts = await productsModel.findAll();

    return { type: '', message: allProducts };
  }

  const findProducts = await productsModel.findByName(name);

  return { type: '', message: findProducts };
};

module.exports = {
  getAllProducts,
  getById,
  createNewProduct,
  updateProduct,
  deleteProduct,
  findByName,
};
