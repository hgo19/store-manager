const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);


const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const { salesExample, newSaleReturn, allSales } = require('../mocks/sales.mock');

describe('Testa o modulo de sales controller', function () {
  afterEach(Sinon.restore);
  it('Verifica o retorno em caso de sucesso', async function () {
    Sinon.stub(salesService, 'addNewSale').resolves({ type: '', message: newSaleReturn });

    const res = {};
    const req = {
      body: salesExample
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();


    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(201);
    expect(res.json).to.have.been.calledWith(newSaleReturn);
  });

  it('Verifica o retorno em caso de produto não encontrado', async function () {
    Sinon.stub(salesService, 'addNewSale').resolves({ type: 'not.found', message: 'Product not found' });

    const res = {};
    const req = {
      body: salesExample
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();


    await salesController.addNewSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
  });

  describe('Listagem de vendas', function () {
    it('Retorna a lista de todas as vendas', async function () {
      Sinon.stub(salesService, 'getAll')
        .resolves({ type: '', message: allSales });

      const res = {};
      const req = {};

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      await salesController.getAllSales(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(allSales);
    });
  });
});
