import { logger } from '../../app';
import { User } from '../../interfaces';
import pool from '../dbConnector';

export async function createUser(user: User) {
  const { name, role, email, password, token } = user;

  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO users (name, role, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *',
      [name, role, email, password, token],
    );
    client.release();
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}

export async function getUserByEmail(email: string) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE email=$1', [
      email,
    ]);
    client.release();
    const user = res.rows[0];
    return user;
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}

export async function getUserById(id: number) {
  const client = await pool.connect();
  try {
    const res = await client.query('SELECT * FROM users WHERE id=$1', [id]);
    client.release();
    const user = res.rows[0];
    return user;
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}

export async function updateUserToken(token: string, userId: number) {
  const client = await pool.connect();
  try {
    const res = await client.query(
      'UPDATE users SET token = $1 WHERE id = $2 RETURNING *',
      [token, userId],
    );
    client.release();
    return res.rows[0];
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}
