const connection = require('./connection');

const insert = async (productsArray) => {
  const [{ insertId }] = await connection.execute(`
    INSERT INTO sales (date) VALUES(NOW())`);

  const howMuchValues = productsArray.map((_product) => '(?, ?, ?)');

  if (howMuchValues.length > 1) {
    howMuchValues.join(', ');
  }

  const values = productsArray.map((product) => [insertId, ...Object.values(product)]);

  const valuesTreatment = values.join(',').split(',');

  const [{ affectedRows }] = await connection.execute(`
    INSERT INTO sales_products (sale_id, product_id, quantity)
      VALUE ${howMuchValues}`, valuesTreatment);

  return { affectedRows, insertId };
};

const findAllSales = async () => {
  const [result] = await connection.execute(`
    SELECT
    sp.sale_id AS saleId,
    s.date AS date,
    sp.product_id AS productId,
    sp.quantity AS quantity
    FROM sales_products AS sp
    INNER JOIN sales AS s ON sp.sale_id = s.id
    ORDER BY saleId, productId;`);

  return result;
};

module.exports = { insert, findAllSales };
