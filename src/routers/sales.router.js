const express = require('express');
const { salesController } = require('../controllers');

const router = express.Router();

router.post('/', salesController.addNewSale);

router.get('/', salesController.getAllSales);

module.exports = router;
