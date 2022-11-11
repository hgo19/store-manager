const Sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const { allProducts } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Verifica o controller de products', function () {
  afterEach(Sinon.restore);

  beforeEach(function () {
    Sinon.stub(productsService, 'getAllProducts')
      .resolves({ type: null, message: allProducts });
  });

  it('Testa se é listado todos os produtos é chamado com código 200.', async function () {

    const res = {};
    const req = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();


    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);

  })

  it('Testa se retorna a lista', async function () {

    const res = {};
    const req = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productsController.getProducts(req, res);

    expect(res.json).to.have.been.calledWith(allProducts);
  });
});
