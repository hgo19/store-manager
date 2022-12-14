const { productsService } = require('../services');
const mapError = require('../utils/errorMap');

const STATUS_HTTP = {
  OK: 200,
  CREATED: 201,
  NO_CONTENT: 204,

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
  const { message, type } = await productsService.createNewProduct(name);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(STATUS_HTTP.CREATED).json(message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProduct({ id, name });

  if (type) return res.status(mapError(type)).json({ message });

  res.status(STATUS_HTTP.OK).json(message);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;

  const { type, message } = await productsService.deleteProduct(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.sendStatus(STATUS_HTTP.NO_CONTENT);
};

const getProductByName = async (req, res) => {
  const { q } = req.query;

  const { message } = await productsService.findByName(q);

  return res.status(200).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
  deleteProduct,
  getProductByName,
};
