const { productsService } = require('../services');

const STATUS_HTTP = {
  OK: 200,
};

const getProducts = async (_req, res) => {
  const { message } = await productsService.getAllProducts();

  res.status(STATUS_HTTP.OK).json(message);
};

const getProductById = () => { };

module.exports = { getProducts, getProductById };
