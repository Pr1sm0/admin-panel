import { logger } from '../../app';
import { Item } from '../../interfaces';
import pool from '../dbConnector';

const ERROR_LEVEL = 'error';

async function getAllQuery(query: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(query);
    client.release();
    return res.rows;
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
  }
}

export async function getAllItems() {
  const query = 'SELECT * FROM items';
  getAllQuery(query);
}

export async function getItem(id: number) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM items WHERE id=$1', [id]);
    client.release();
    return res.rows[0];
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
  }
}

export async function createItem(item: Item) {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO items (name, price, description, created_at, updated_at, is_published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, description, createdAt, updatedAt, isPublished],
    );
    client.release();
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
  }
}

export async function editItem(id: number, item: Item) {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const client = await pool.connect();
  try {
    await client.query(
      'UPDATE items SET name = $1, price = $2, description = $3, created_at = $4, updated_at = $5, is_published = $6 WHERE id = $7 RETURNING *',
      [name, price, description, createdAt, updatedAt, isPublished, id],
    );
    client.release();
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
  }
}

export async function deleteItem(id: number) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM items WHERE id = $1', [id]);
    client.release();
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
  }
}

export async function sortItemsByNameAsc() {
  const query = 'SELECT * FROM items ORDER BY name';
  getAllQuery(query);
}

export async function sortItemsByNameDesc() {
  const query = 'SELECT * FROM items ORDER BY name DESC';
  getAllQuery(query);
}

export async function sortItemsByPriceAsc() {
  const query = 'SELECT * FROM items ORDER BY price';
  getAllQuery(query);
}

export async function sortItemsByPriceDesc() {
  const query = 'SELECT * FROM items ORDER BY price DESC';
  getAllQuery(query);
}

export async function sortItemsByDateAsc() {
  const query = 'SELECT * FROM items ORDER BY created_at';
  getAllQuery(query);
}

export async function sortItemsByDateDesc() {
  const query = 'SELECT * FROM items ORDER BY created_at DESC';
  getAllQuery(query);
}

export async function findItemsByName(name: string) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      "SELECT * FROM items WHERE name LIKE '%$1%'",
      [name],
    );
    client.release();
    return res.rows;
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
  }
}
