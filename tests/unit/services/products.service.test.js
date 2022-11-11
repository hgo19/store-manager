const { expect } = require('chai');
const Sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');


const { allProducts, productFound, error } = require('../mocks/products.mock');


describe('Verifica o service de products', function () {
  afterEach(Sinon.restore);

  it('Verifica se lista todos os produtos', async function () {
    Sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const response = await productsService.getAllProducts();

    expect(response).to.be.a('object');
    expect(response.message).to.be.a('array');

    expect(response.message).to.deep.equal(allProducts);
  });

  it('Verifica se retorna um erro caso nao ache o produto', async function () {
    Sinon.stub(productsModel, 'findById').resolves(undefined);

    const response = await productsService.getById(50);

    expect(response).to.be.a('object');
    expect(response.message).to.be.a('null');
    expect(response.type).to.deep.equal(error.message);
  });

  it('Verifica se retorna um objeto com o produto pesquisado em caso de sucesso.', async function () {
    Sinon.stub(productsModel, 'findById').resolves(productFound);

    const response = await productsService.getById(1);

    expect(response).to.be.a('object');
    expect(response.message).to.deep.equal(productFound);
  });
});
