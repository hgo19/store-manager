const allProducts = [
  {
    "id": 1,
    "name": "Martelo de Thor"
  },
  {
    "id": 2,
    "name": "Traje de encolhimento"
  },
];

const productFound = {
  "id": 1,
  "name": "Martelo de Thor"
};

const error = { "message": "Product not found" };

const productToCreate = 'ProdutoX';

const productCreated = {
  "id": 4,
  "name": "ProdutoX"
};

const productToUpdate = {
  id: 1,
  name: "Martelo do Chapolin",
};

const productUpdated = {
  "id": 1,
  "name": "Bola Quadrada"
};

module.exports = {
  allProducts,
  productFound,
  error,
  productToCreate,
  productCreated,
  productToUpdate,
  productUpdated,
};
