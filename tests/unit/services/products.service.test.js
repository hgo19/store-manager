const { expect } = require('chai');
const Sinon = require('sinon');
const { productsModel } = require('../../../src/models');
const { productsService } = require('../../../src/services');


const {
  allProducts,
  productFound,
  error,
  productToCreate,
  productCreated,
  productToUpdate } = require('../mocks/products.mock');


describe('Verifica o service de products', function () {
  afterEach(Sinon.restore);

  it('Verifica se lista todos os produtos', async function () {
    Sinon.stub(productsModel, 'findAll').resolves(allProducts);

    const response = await productsService.getAllProducts();

    expect(response).to.be.a('object');
    expect(response.message).to.be.an('array');

    expect(response.message).to.deep.equal(allProducts);
  });

  it('Verifica se retorna um erro caso nao ache o produto', async function () {
    Sinon.stub(productsModel, 'findById').resolves(undefined);

    const response = await productsService.getById(50);

    expect(response).to.be.an('object');
    expect(response.message).to.be.a('null');
    expect(response.type).to.deep.equal(error.message);
  });

  it('Verifica se retorna um objeto com o produto pesquisado em caso de sucesso.', async function () {
    Sinon.stub(productsModel, 'findById').resolves(productFound);

    const response = await productsService.getById(1);

    expect(response).to.be.an('object');
    expect(response.message).to.deep.equal(productFound);
  });

  it('Verifica se retorna o objeto do produto novo criado', async function () {
    const insertId = 4;

    Sinon.stub(productsModel, 'insert').resolves([{ insertId }]);
    Sinon.stub(productsModel, 'findById').resolves(productCreated);

    const response = await productsService.createNewProduct(productToCreate);

    expect(response).to.be.an('object');
    expect(response.message).to.be.deep.equal(productCreated);
  });

  it('Verifica o retorno ao dar update em um produto em caso de sucesso.', async function () {
    const affectedRows = 1;

    Sinon.stub(productsModel, 'findById')
      .onCall(0).resolves(productFound)
      .onCall(1).resolves(productToUpdate);
    Sinon.stub(productsModel, 'update').resolves(affectedRows);

    const response = await productsService.updateProduct(productToUpdate);

    expect(response).to.be.an('object');
    expect(response.message).to.deep.equal(productToUpdate);

  });

  it('Verifica o retorno ao dar update em um produto em caso de produto nao encontrado.', async function () {

    const response = await productsService.updateProduct({id: 32, name: "pedro bola"});

    expect(response).to.be.an('object');
    expect(response.message).to.deep.equal('Product not found');

  });

  it('Verifica o retorno ao deleter um produto em caso de sucesso.', async function () {
    const idealReponse = {
      type: '',
      message: 'Product Deleted',
    };

    const affectedRows = 1;

    Sinon.stub(productsModel, 'findById').resolves(productFound);
    Sinon.stub(productsModel, 'deleteProduct').resolves(affectedRows);

    const response = await productsService.deleteProduct(1);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal(idealReponse);

  });

  it('Verifica o retorno ao deleter um produto em caso de falha.', async function () {
    const idealReponse = {
      type: 'not.found',
      message: 'Product not found',
    };

    Sinon.stub(productsModel, 'findById').resolves([]);

    const response = await productsService.deleteProduct(1);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal(idealReponse);

  });

  it('Verifica o retorno em caso de sucesso ao pesquisar um produto pelo nome', async function () {
    const result = { id: 1, name: 'Martelo de Thor' };
    Sinon.stub(productsModel, 'findByName').resolves(result)

    const name = 'mart';

    const response = await productsService.findByName(name);

    expect(response).to.be.an('object');
    expect(response.message).to.deep.equal(result);
  });

  it('Verifica o retorno em caso de não passar o nome ao pesquisar', async function () {
    Sinon.stub(productsModel, 'findAll').resolves(allProducts);
    const response = await productsService.findByName();

    expect(response).to.be.an('object');
    expect(response.message).to.deep.equal(allProducts);
  });
});
