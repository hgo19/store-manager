const { productsService } = require('../services');

const STATUS_HTTP = {
  OK: 200,
  CREATED: 201,
};

const getProducts = async (_req, res) => {
  const { message } = await productsService.getAllProducts();

  res.status(STATUS_HTTP.OK).json(message);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const response = await productsService.getById(id);

  if (response.type) return res.status(404).json({ message: response.type });

  return res.status(STATUS_HTTP.OK).json(response.message);
};

const createProduct = async (req, res) => {
  const { name } = req.body;
  const { message } = await productsService.createNewProduct(name);

  return res.status(STATUS_HTTP.CREATED).json(message);
};

module.exports = { getProducts, getProductById, createProduct };
