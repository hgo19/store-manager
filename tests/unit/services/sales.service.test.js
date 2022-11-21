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
  saleById,
  saleUpdate} = require('../mocks/sales.mock');

describe('Testa o módulo de sales service', function () {
  afterEach(Sinon.restore);
  it('Verifica se retorna as vendas cadastradas', async function () {
    Sinon.stub(productsModel, 'findById').resolves(findProducts)
    Sinon.stub(salesService, 'doesProductExist').resolves(findProducts);
    Sinon.stub(salesModel, 'insert').resolves({ affectedRows: 2, insertId: 3 });

    const response = await salesService.addNewSale(salesExample);

    expect(response).to.be.an('object');
    expect(response.message).to.deep.equal(newSaleReturn);

  });

  it('Verifica se retorna erro em caso de inputs inválidos', async function () {
    Sinon.stub(salesService, 'doesProductExist').resolves(productsFindUndefined);

    const response = await salesService.addNewSale(wrongSaleExample);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('Product not found');

  });

  it('Verifica se é possível deletar a venda em caso de sucesso', async function () {
    Sinon.stub(salesModel, 'findById').resolves(saleById);
    Sinon.stub(salesModel, 'deleteSale').resolves('DELETED SALE FROM sales AND sales_products')

    const response = await salesService.deleteSale(1);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('DELETED SALE FROM sales AND sales_products');

  });

  it('Verifica se retorna um erro em caso de falha ao deletar sale', async function () {

    Sinon.stub(salesModel, 'findById').resolves([]);

    const response = await salesService.deleteSale(1);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('Sale not found');

  });

  it('Verifica se é possível atualizar uma venda em caso de sucesso', async function () {
    Sinon.stub()

    const updatedSale = {
      saleId: 1,
      itemsUpdated: [
        {
          productId: 1,
          quantity: 10
        },
        {
          productId: 2,
          quantity: 50
        }
      ]
    }

    const idealReturn = {
      type: '',
      message: updatedSale
    };

    const id = 1;

    const response = await salesService.updateSale(id, saleUpdate);


    expect(response).to.be.an('object');
    expect(response.type).to.deep.equal(idealReturn.type);

  });

  it('Verifica se retorna erro de \'Sale not found\' em caso de venda nao encontrada ao atualizar', async function () {
    Sinon.stub(salesModel, 'findById').resolves([]);

    const id = 900;

    const response = await salesService.updateSale(id, saleUpdate);

    expect(response).to.be.an('object');
    expect(response.message).to.be.equal('Sale not found');
  });

  describe('Testa listagem de vendas', function () {
    afterEach(Sinon.restore);
    it('Verifica se recebe a lista de todas as vendas', async function () {
      Sinon.stub(salesModel, 'findAllSales').resolves(allSales);

      const response = await salesService.getAll();

      expect(response).to.be.an('object');
      expect(response.message).to.be.an('array');
      expect(response.message).to.deep.equal(allSales);
    });

    it('Verifica se lista as vendas quando um id passado válido', async function () {
      Sinon.stub(salesModel, 'findById').resolves(saleById);

      const response = await salesService.getById(1);

      expect(response).to.be.an('object');
      expect(response.message).to.deep.equal(saleById)
    });

    it('Verifica se retorna um erro em caso de id inexistente', async function () {
      Sinon.stub(salesModel, 'findById').resolves([]);

      const response = await salesService.getById('bola');

      expect(response).to.be.an('object');
      expect(response.message).to.be.equal('Sale not found')
    });
  });
});
