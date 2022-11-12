const { salesService } = require('../services');
const mapError = require('../utils/errorMap');

const STATUS_HTTP = {
  CREATED: 201,
};

const addNewSale = async (req, res) => {
  const newSale = req.body;
  const { type, message } = await salesService.addNewSale(newSale);

  if (type) return res.status(mapError(type)).json({ message });

  return res.status(STATUS_HTTP.CREATED).json(message);
};

module.exports = { addNewSale };
