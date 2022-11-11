const Boom = require('@hapi/boom');

const PRODUCT_NOT_FOUND = Boom.notFound('Product not found').output.payload;

module.exports = { PRODUCT_NOT_FOUND };
