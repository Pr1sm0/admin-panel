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
  const { name, price, description, created, modified } = item;
  const client = await pool.connect();
  try {
    const res = await client.query(
      'INSERT INTO items (name, price, description, created, modified) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, price, description, created, modified]
    );
    client.release();
    console.log(res.rows[0]);
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}

export async function editItem(id: number, item: Item) {
  const { name, price, description, created, modified } = item;
  const client = await pool.connect();
  try {
    const res = await client.query('UPDATE items SET name = $1, price = $2, description = $3, created = $4, modified = $5 WHERE id = $6 RETURNING *', [name, price, description, created, modified, id]);
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
