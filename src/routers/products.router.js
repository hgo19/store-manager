const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

module.exports = router;
