const { productsService } = require('../services');

const STATUS_HTTP = {
  OK: 200,
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

module.exports = { getProducts, getProductById };
