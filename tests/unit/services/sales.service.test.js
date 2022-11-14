const { expect } = require('chai');
const Sinon = require('sinon');
const { salesModel, productsModel } = require('../../../src/models');
const { salesService } = require('../../../src/services');

const {
  salesExample,
  newSaleReturn,
  findProducts,
  wrongSaleExample,
  productsFindUndefined,
  allSales,
  saleById } = require('../mocks/sales.mock');

describe('Testa o módulo de sales service', function () {
  afterEach(Sinon.restore);
  it('Verifica se retorna as vendas cadastradas', async function () {
    Sinon.stub(productsModel, 'findById').resolves(findProducts)
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

  describe('Testa listagem de vendas', function () {
    afterEach(Sinon.restore);
    it('Verifica se recebe a lista de todas as vendas', async function () {
      Sinon.stub(salesModel, 'findAllSales').resolves(allSales);

      const response = await salesService.getAll();

      expect(response).to.be.a('object');
      expect(response.message).to.be.a('array');
      expect(response.message).to.deep.equal(allSales);
    });

    it('Verifica se lista as vendas quando um id passado válido', async function () {
      Sinon.stub(salesModel, 'findById').resolves(saleById);

      const response = await salesService.getById(1);

      expect(response).to.be.a('object');
      expect(response.message).to.deep.equal(saleById)
    });

    it('Verifica se retorna um erro em caso de id inexistente', async function () {
      Sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesService.getById('bola');

      expect(response).to.be.a('object');
      expect(response.message).to.be.equal('Sale not found')
    });
  });
});
