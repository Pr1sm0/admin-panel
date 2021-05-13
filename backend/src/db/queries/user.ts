import { User } from '../../interfaces';
import { returnMany, returnSingle } from './templates';

export async function createUser(user: User) {
  const { name, role, email, password, token } = user;
  const query = 'INSERT INTO users (name, role, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING *';
  const values = [name, role, email, password, token];
  return returnSingle(query, values);
}

export async function getUserByEmail(email: string) {
  const query = 'SELECT * FROM users WHERE email=$1';
  const values = [email];
  return returnSingle(query, values);
}

export async function getUserById(id: number) {
  const query = 'SELECT * FROM users WHERE id=$1';
  const values = [id];
  return returnSingle(query, values);
}

export async function updateUserToken(token: string, userId: number) {
  const query = 'UPDATE users SET token = $1 WHERE id = $2 RETURNING *';
  const values = [token, userId];
  return returnSingle(query, values);
}
