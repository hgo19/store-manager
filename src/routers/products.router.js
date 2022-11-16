const express = require('express');
const { productsController } = require('../controllers');

const router = express.Router();

router.get('/', productsController.getProducts);

router.get('/search', productsController.getProductByName);

router.get('/:id', productsController.getProductById);

router.post('/', productsController.createProduct);

router.put('/:id', productsController.updateProduct);

router.delete('/:id', productsController.deleteProduct);

module.exports = router;
