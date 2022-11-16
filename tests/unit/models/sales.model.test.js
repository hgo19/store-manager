const { expect } = require('chai');
const Sinon = require('sinon');


const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const {
  salesExample,
  insertSalesReturn,
  allSales,
  saleById,
  saleUpdate  } = require('../mocks/sales.mock');


describe('Testa a unidade do model de sales', function () {
  afterEach(Sinon.restore);

  it('Verifica se é possível cadastrar uma ou mais vendas novas.', async function () {
    const { affectedRows, insertId } = insertSalesReturn;
    Sinon.stub(connection, 'execute').onFirstCall().returns([{ insertId }]).onSecondCall().returns([{ affectedRows }]);

    const response = await salesModel.insert(salesExample);

    expect(response).to.be.a('object');
    expect(response.affectedRows).to.be.equal(affectedRows);
    expect(response.insertId).to.be.equal(insertId);

  });

  it('Verifica se é possível deletar uma venda', async function () {
    Sinon.stub(connection, 'execute').resolves('DELETED SALE FROM sales AND sales_products');

    const response = await salesModel.deleteSale(1);

    expect(response).to.be.a('string');

  });

  it('Verifica se é possível atualizar uma venda', async function () {
    Sinon.stub(connection, 'execute').resolves([]);

    const id = 1;

    const response = await salesModel.update(id, saleUpdate);

    expect(response).to.be.a('array');

  });

  describe('Listagem de vendas', function () {
    afterEach(Sinon.restore);
    it('Verifica se é possível listar os dados da tabela sales', async function () {
      Sinon.stub(connection, 'execute').resolves([allSales]);

      const response = await salesModel.findAllSales();

      expect(response).to.be.a('array');
      expect(response).to.deep.equal(allSales);
    });

    it('Verficia se é possivel listar uma venda ao passar determinado id', async function () {
      Sinon.stub(connection, 'execute').resolves([saleById]);

      const response = await salesModel.findById(1);

      expect(response).to.be.a('array');
      expect(response).to.deep.equal(saleById);

    });
  });
});
