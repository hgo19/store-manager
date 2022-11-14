const connection = require('./connection');

const findAll = async () => {
  const [result] = await connection.execute(`
    SELECT * FROM products`);

  return result;
};

const findById = async (productId) => {
  const [[result]] = await connection.execute(`
    SELECT * FROM products
      WHERE id = ?`, [productId]);

  return result;
};

const insert = async (name) => {
  const [{ insertId }] = await connection.execute(`
    INSERT INTO products (name)
      VALUE (?)`, [name]);

  return insertId;
};

const update = async ({ id, name }) => {
  const [{ affectedRows }] = await connection.execute(`
    UPDATE products
    SET name = ?
    WHERE id = ?`, [name, id]);

  return affectedRows;
};

const deleteProduct = async (id) => {
  const [{ affectedRows }] = await connection.execute(`
    DELETE FROM products
      WHERE id = ?`, [id]);

  return affectedRows;
};

module.exports = { findAll, findById, insert, update, deleteProduct };
