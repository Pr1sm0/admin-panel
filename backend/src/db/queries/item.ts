import { Item } from '../../interfaces';
import pool from '../dbConnector';
const Cursor = require('pg-cursor');

async function pagination() {
  const BATCH_SIZE = 100;
  const client = await pool.connect();
  const cursor = client.query(new Cursor('SELECT * FROM items'));

  return new Promise((resolve, reject) => {
    (function read() {
      cursor.read(BATCH_SIZE, async (err: any, rows: any) => {
        if (err) {
          return reject(err);
        }
        if (!rows.length) {
          return resolve('Pagination is finished');
        }
        console.log(rows);
        return read();
      });
    })();
  });
}

export async function getAllItems() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function getItem(id: number) {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items WHERE id=$1', [id]);
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function createItem(item: Item) {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO items (name, price, description, created_at, updated_at, is_published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, description, createdAt, updatedAt, isPublished]
    );
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function editItem(id: number, item: Item) {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const client = await pool.connect();
  try {
    await client.query('UPDATE items SET name = $1, price = $2, description = $3, created_at = $4, updated_at = $5, is_published = $6 WHERE id = $7 RETURNING *', [name, price, description, createdAt, updatedAt, isPublished, id]);
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function deleteItem(id: number) {
  const client = await pool.connect();
  try {
    await client.query('DELETE FROM items WHERE id = $1', [id]);
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function sortItemsByNameAsc() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items ORDER BY name');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function sortItemsByNameDesc() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items ORDER BY name DESC');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function sortItemsByPriceAsc() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items ORDER BY price');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function sortItemsByPriceDesc() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items ORDER BY price DESC');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function sortItemsByDateAsc() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items ORDER BY created_at');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function sortItemsByDateDesc() {
  const client = await pool.connect();
  try {
    await client.query('SELECT * FROM items ORDER BY created_at DESC');
    client.release();
  } catch (err) {
    client.release();
  }
}

export async function findItemsByName(name: string) {
  const client = await pool.connect();
  try {
    await client.query("SELECT * FROM items WHERE name LIKE '%$1%'", [name]);
    client.release();
  } catch (err) {
    client.release();
  }
}
