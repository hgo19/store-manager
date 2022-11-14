const errors = {
  'number.min': 422,
  'any.required': 400,
  'not.found': 404,
  'string.min': 422,
};

const mapError = (type) => errors[type] || 500;

module.exports = mapError;
