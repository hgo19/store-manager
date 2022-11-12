const errors = {

  'number.min': 422,
  'any.required': 400,
  'not.found': 404,
};

const mapError = (type) => errors[type];

module.exports = mapError;
