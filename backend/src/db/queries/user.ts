import pool from '../dbConnector';

export async function getAllUsers() {
  const client = await pool
    .connect();
  try {
    const res = await client
      .query('SELECT * FROM users');
    client.release();
    console.log(res.rows);
  } catch (err) {
    client.release();
    console.log(err.stack);
  }
}