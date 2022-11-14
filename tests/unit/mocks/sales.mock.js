const salesExample = [
  {
    "productId": 1,
    "quantity": 1,
  },
  {
    "productId": 2,
    "quantity": 5,
  },
];

const wrongSaleExample = [
  {
    "productId": 32,
    "quantity": 1,
  },
  {
    "productId": 55,
    "quantity": 5,
  },
];

const insertSalesReturn = {
  affectedRows: 2,
  insertId: 3,
};

const newSaleReturn = {
  "id": 3,
  "itemsSold": [
    {
      "productId": 1,
      "quantity": 1
    },
    {
      "productId": 2,
      "quantity": 5
    },
  ],
};

const findProducts = [
  { id: 1, name: 'Martelo de Thor' },
  { id: 2, name: 'Traje de encolhimento' }
];

const productsFindUndefined = [undefined, undefined];

const allSales = [
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:29.000Z",
    "productId": 1,
    "quantity": 2
  },
  {
    "saleId": 1,
    "date": "2021-09-09T04:54:54.000Z",
    "productId": 2,
    "quantity": 2
  }
];

module.exports = {
  salesExample,
  insertSalesReturn,
  newSaleReturn,
  findProducts,
  productsFindUndefined,
  wrongSaleExample,
  allSales
};
