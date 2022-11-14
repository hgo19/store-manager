const { salesService } = require('../services');
const mapError = require('../utils/errorMap');

const STATUS_HTTP = {
  OK: 200,
  CREATED: 201,
};

const addNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.addNewSale(newSale);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(STATUS_HTTP.CREATED).json(message);
};

const getAllSales = async (_req, res) => {
  const { message } = await salesService.getAll();

  return res.status(STATUS_HTTP.OK).json(message);
};

const getSaleById = async (req, res) => {
  const { id } = req.params;
  const { type, message } = await salesService.getById(id);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(STATUS_HTTP.OK).json(message);
};

module.exports = {
  addNewSale,
  getAllSales,
  getSaleById,
};
