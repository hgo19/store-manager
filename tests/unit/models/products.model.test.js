const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../src/models/connection')
const { productsModel } = require('../../../src/models');

const { allProducts, productFound } = require('../mocks/products.mock');

describe('Testa a unidade do model de products', function () {
  afterEach(Sinon.restore);

  it('Listando todos os produtos', async function () {
    Sinon.stub(connection, `execute`).resolves([allProducts]);

    const response = await productsModel.findAll();

    expect(response).to.be.a('Array');
    expect(response).to.deep.equal(allProducts);
  });

  it('Lista o produto com determinado id passado', async function () {
    Sinon.stub(connection, 'execute').resolves([[productFound]]);

    const response = await productsModel.findById(1);

    expect(response).to.be.a('object');
    expect(response).to.deep.equal(productFound);
  });
});
