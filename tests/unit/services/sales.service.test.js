const { expect } = require('chai');
const Sinon = require('sinon');
const { salesModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const {
  salesExample,
  newSaleReturn,
  findProducts,
  wrongSaleExample,
  productsFindUndefined} = require('../mocks/sales.mock');

describe('Testa o módulo de sales service', function () {
  afterEach(Sinon.restore);
  it('Verifica se retorna as vendas cadastradas', async function () {
    Sinon.stub(salesService, 'doesProductExist').resolves(findProducts);
    Sinon.stub(salesModel, 'insert').resolves({ affectedRows: 2, insertId: 3 });

    const response = await salesService.addNewSale(salesExample);

    expect(response).to.be.a('object');
    expect(response.message).to.deep.equal(newSaleReturn);

  });

  it('Verifica see retorna erro em caso de inputs inválidos', async function () {
    Sinon.stub(salesService, 'doesProductExist').resolves(productsFindUndefined);

    const response = await salesService.addNewSale(wrongSaleExample);

    expect(response).to.be.a('object');
    expect(response.message).to.be.equal('Product not found');

  });
});
