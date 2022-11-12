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

module.exports = { insert };
