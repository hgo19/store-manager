const Sinon = require('sinon');
const chai = require('chai');
const sinonChai = require('sinon-chai');
const { productsController } = require('../../../src/controllers');
const { productsService } = require('../../../src/services');

const {
  allProducts,
  productFound,
  error,
  productToCreate,
  productCreated,
  productUpdated } = require('../mocks/products.mock');

const { expect } = chai;
chai.use(sinonChai);

describe('Verifica o controller de products', function () {
  afterEach(Sinon.restore);

  it('Testa se é listado todos os produtos é chamado com código 200.', async function () {

    Sinon.stub(productsService, 'getAllProducts')
      .resolves({ type: null, message: allProducts });

    const res = {};
    const req = {};

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();


    await productsController.getProducts(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(allProducts);

  });

  it('Testa se retorna um erro quando pesquisado produto com id inexistente', async function () {
    Sinon.stub(productsService, 'getById')
      .resolves({ type: error.message, message: null });

    const res = {};
    const req = {
      params: 50,
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(error.message);


    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledOnceWith(404);
  });

  it('Testa se retorna o status 200 e o produto procurado em caso de sucesso', async function () {
    Sinon.stub(productsService, 'getById')
      .resolves({ type: null, message: productFound });

    const res = {};
    const req = {
      params: 1,
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(productFound);


    await productsController.getProductById(req, res);

    expect(res.status).to.have.been.calledOnceWith(200);
    expect(res.json).to.have.been.calledWith(productFound);
  });

  it('Testa se retorna o status 201 e cria o produto em caso de sucesso', async function () {
    Sinon.stub(productsService, 'createNewProduct')
      .resolves({ type: null, message: productCreated });

    const res = {};
    const req = {
      body: {
        name: productToCreate,
      },
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns(productCreated);


    await productsController.createProduct(req, res);

    expect(res.status).to.have.been.calledOnceWith(201);
    expect(res.json).to.have.been.calledWith(productCreated);
  });

  it('Testa se retorna status 200 e atualiza um produto com sucesso.', async function () {
    Sinon.stub(productsService, 'updateProduct').resolves({ type: '', message: productUpdated });

    const res = {};
    const req = {
      params: {
        id: 1,
      },
      body: {
        name: 'Bola Quadrada',
      },
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(200);
    expect(res.json).to.have.been.calledWith(productUpdated);
  });

  it('Testa se retorna status 404 e mensagem de erro em caso de produto nao encontrado.', async function () {
    Sinon.stub(productsService, 'updateProduct').resolves({ type: 'not.found', message: 'Product not found' });

    const res = {};
    const req = {
      params: {
        id: 42,
      },
      body: {
        name: 'Bola Quadrada',
      },
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await productsController.updateProduct(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

});
