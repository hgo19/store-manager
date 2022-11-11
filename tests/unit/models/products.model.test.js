const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../src/models/connection')
const { productsModel } = require('../../../src/models');

const { allProducts } = require('../mocks/products.mock');

describe('Testa a unidade do model de products', function () {
  afterEach(Sinon.restore);

  it('Listando todos os produtos', async function () {
    Sinon.stub(connection, `execute`).resolves([allProducts]);

    const response = await productsModel.findAll();

    expect(response).to.be.a('Array');
    expect(response).to.deep.equal(allProducts);
  });
});
