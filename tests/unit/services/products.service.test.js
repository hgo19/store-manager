const { expect } = require('chai');
const Sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');


const { allProducts } = require('../mocks/products.mock');


describe('Verifica o service de products', function () {
  afterEach(Sinon.restore);

  it('Verifica se lista todos os produtos', async function () {
    Sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const response = await productsService.getAllProducts();

    expect(response).to.be.a('object');
    expect(response.message).to.be.a('array');

    expect(response.message).to.deep.equal(allProducts);
  });
});
