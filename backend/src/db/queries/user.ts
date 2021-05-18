import { User } from '../../interfaces';
import { returnSingle } from './templates';

export const createUser = (user: User) => {
  const { name, role, email, password, token } = user;
  const query =
    'INSERT INTO users (name, role, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, role, email, token';
  const values = [name, role, email, password, token];
  return returnSingle(query, values);
};

export const getUserByEmail = (email: string) => {
  const query = 'SELECT * FROM users WHERE email=$1';
  const values = [email];
  return returnSingle(query, values);
};

export const getUserById = (id: number) => {
  const query = 'SELECT id, name, role, email, token FROM users WHERE id=$1';
  const values = [id];
  return returnSingle(query, values);
};

export const updateUserToken = (token: string, userId: number) => {
  const query = 'UPDATE users SET token = $1 WHERE id = $2 RETURNING id, name, role, email, token';
  const values = [token, userId];
  return returnSingle(query, values);
};
