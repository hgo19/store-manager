const { productsService } = require('../services');
const mapError = require('../utils/errorMap');

const STATUS_HTTP = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNPROCESSABLE_ENTITY: 422,
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
  const response = await productsService.createNewProduct(name);

  if (response.type && response.message.includes('length')) {
    return res.status(STATUS_HTTP.UNPROCESSABLE_ENTITY).json({ message: response.message });
  }

  if (response.type && response.message.includes('required')) {
    return res.status(STATUS_HTTP.BAD_REQUEST).json({ message: response.message });
  }

  return res.status(STATUS_HTTP.CREATED).json(response.message);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;

  const { type, message } = await productsService.updateProduct({ id, name });

  if (type) return res.status(mapError(type)).json({ message });

  res.status(STATUS_HTTP.OK).json(message);
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};
