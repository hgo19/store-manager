const { expect } = require('chai');
const Sinon = require('sinon');


const { salesModel } = require('../../../src/models');
const connection = require('../../../src/models/connection');

const { salesExample, insertSalesReturn } = require('../mocks/sales.mock');


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
});