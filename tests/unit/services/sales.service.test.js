const { expect } = require('chai');
const { salesService } = require('../../../src/services');


describe('Testa o módulo de sales service', function () {
  it('Verifica se retorna as vendas cadastradas', async function () {

    const response = await salesService.addNewSale();

    expect(response).to.be.a('object');

  });
});
