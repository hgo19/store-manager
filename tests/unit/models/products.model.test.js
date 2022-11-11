const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../src/models/connection')
const { productsModel } = require('../../../src/models');

const { allProducts } = require('./mocks/products.model.mock')

describe('Testa a unidade do model de products', function () {
  it('Listando todos os produtos', async function () {
    // ARRANGE
    Sinon.stub(connection, `execute`).resolves([allProducts]);
    // ACT
    const response = await productsModel.findAll();

    // ASSERT

    expect(response).to.be.a('Array');
    expect(response).to.deep.equal(allProducts);
  });
});
