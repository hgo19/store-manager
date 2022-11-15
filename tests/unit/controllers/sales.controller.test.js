const chai = require('chai');
const Sinon = require('sinon');
const sinonChai = require('sinon-chai');

const { expect } = chai;

chai.use(sinonChai);


const { salesController } = require('../../../src/controllers');
const { salesService } = require('../../../src/services');
const {
  salesExample,
  newSaleReturn,
  allSales,
  saleById } = require('../mocks/sales.mock');

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

  it('Verifica o retorno ao deletar uma venda com sucesso', async function () {
    Sinon.stub(salesService, 'deleteSale').resolves({ type: '', message: 'DELETED SALE FROM sales AND sales_products' });

    const res = {};
    const req = {
      params: {
        id: 1,
      },
    };

    res.sendStatus = Sinon.stub().returns(res);

    await salesController.deleteSale(req, res);

    expect(res.sendStatus).to.have.been.calledWith(204);
  });

  it('Verifica o retorno ao deletar uma venda em caso de venda nao encontrada', async function () {
    Sinon.stub(salesService, 'deleteSale').resolves({ type: 'not.found', message: 'Sale not found' });

    const res = {};
    const req = {
      params: {
        id: 32,
      },
    };

    res.status = Sinon.stub().returns(res);
    res.json = Sinon.stub().returns();

    await salesController.deleteSale(req, res);

    expect(res.status).to.have.been.calledWith(404);
    expect(res.json).to.have.been.calledWith({ message: 'Sale not found' });
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

    it('Retorna a lista da venda pelo id solicitado em caso de sucesso.', async function () {
      Sinon.stub(salesService, 'getById')
        .resolves({ type: '', message: saleById });

      const res = {};
      const req = {
        params: {
          id: 1,
        },
      };

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(200);
      expect(res.json).to.have.been.calledWith(saleById);
    });

    it('Retorna uma mensagem de erro em caso de falha ao pesquisar venda pelo id.', async function () {
      Sinon.stub(salesService, 'getById')
        .resolves({ type: 'not.found', message: 'Product not found' });

      const res = {};
      const req = {
        params: {
          id: 'bola',
        },
      };

      res.status = Sinon.stub().returns(res);
      res.json = Sinon.stub().returns();

      await salesController.getSaleById(req, res);

      expect(res.status).to.have.been.calledWith(404);
      expect(res.json).to.have.been.calledWith({ message: 'Product not found' });
    });
  });
});
