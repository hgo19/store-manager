const express = require('express');
const { productsRoutes, salesRoutes } = require('./routers');

const app = express();

app.use(express.json());
app.use('/products', productsRoutes);
app.use('/sales', salesRoutes);

module.exports = app;
