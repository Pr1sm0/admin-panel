import { Item } from '../../interfaces';
import pool from '../dbConnector';

export async function getAllItems() {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM items');
    client.release();
    console.log(res.rows);
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}

export async function getItem(id: number) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM items WHERE id=$1', [id]);
    client.release();
    console.log(res.rows[0]);
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}

export async function createItem(item: Item) {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO items (name, price, description, created_at, updated_at, is_published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *',
      [name, price, description, createdAt, updatedAt, isPublished]
    );
    client.release();
    console.log(res.rows[0]);
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}

export async function editItem(id: number, item: Item) {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const client = await pool.connect();
  try {
    const res = await client.query('UPDATE items SET name = $1, price = $2, description = $3, created_at = $4, updated_at = $5, is_published = $6 WHERE id = $7 RETURNING *', [name, price, description, createdAt, updatedAt, isPublished, id]);
    client.release();
    console.log(res.rows[0]);
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}

export async function deleteItem(id: number) {
  const client = await pool.connect();
  try {
    const res = await client.query('DELETE FROM items WHERE id = $1', [id]);
    client.release();
    console.log('Item deleted!');
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}
