const { expect } = require('chai');
const Sinon = require('sinon');
const connection = require('../../../src/models/connection')
const { productsModel } = require('../../../src/models');

const {
  allProducts,
  productFound,
  productToCreate,
  productToUpdate } = require('../mocks/products.mock');

describe('Testa a unidade do model de products', function () {
  afterEach(Sinon.restore);

  it('Listando todos os produtos', async function () {
    Sinon.stub(connection, `execute`).resolves([allProducts]);

    const response = await productsModel.findAll();

    expect(response).to.be.an('array');
    expect(response).to.deep.equal(allProducts);
  });

  it('Lista o produto com determinado id passado', async function () {
    Sinon.stub(connection, 'execute').resolves([[productFound]]);

    const response = await productsModel.findById(1);

    expect(response).to.be.an('object');
    expect(response).to.deep.equal(productFound);
  });

  it('Cadastra um produto novo', async function () {
    const insertId = 3;
    Sinon.stub(connection, 'execute').resolves([{ insertId }])
    const response = await productsModel.insert(productToCreate);

    expect(response).to.be.a('number');
    expect(response).to.be.equal(insertId);
  });

  it('Atualiza um produto', async function () {
    const affectedRows = 1;

    Sinon.stub(connection, 'execute').resolves([{ affectedRows }]);

    const response = await productsModel.update(productToUpdate);

    expect(response).to.be.a('number');
    expect(response).to.be.equal(1);
  });

  it('Deleta um produto', async function () {
    const affectedRows = 1;

    Sinon.stub(connection, 'execute').resolves([{ affectedRows }]);

    const response = await productsModel.deleteProduct(1);

    expect(response).to.be.a('number');
    expect(response).to.be.equal(affectedRows);

  });

  it('Pesquisa um produto pelo nome', async function () {
    const result = { id: 1, name: 'Martelo de Thor' };
    Sinon.stub(connection, 'execute').resolves([result]);

    const name = 'mart';

    const response = await productsModel.findByName(name);
    expect(response).to.be.an('object');
    expect(response).to.deep.equal(result);
  });
});
