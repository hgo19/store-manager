const { expect } = require('chai');


describe('Testa a unidade do model de products', function () {
  it('Listando todos os produtos', async function () {
    // ARRANGE

    // ACT
    const response = await productsModel.findAll();

    // ASSERT

    expect(reponse).to.be.a('Array');
  });
});
