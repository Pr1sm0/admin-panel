import { User } from '../../interfaces';
import { returnSingle } from './templates';
import * as Koa from 'koa';

export const createUser = (ctx: Koa.Context, user: User) => {
  const { name, role, email, password, token } = user;
  const query =
    'INSERT INTO users (name, role, email, password, token) VALUES ($1, $2, $3, $4, $5) RETURNING id, name, role, email, token';
  const values = [name, role, email, password, token];
  return returnSingle(ctx, query, values);
};

export const getUserByEmail = (ctx: Koa.Context, email: string) => {
  const query = 'SELECT * FROM users WHERE email=$1';
  const values = [email];
  return returnSingle(ctx, query, values);
};

export const getUserById = (ctx: Koa.Context, id: number) => {
  const query = 'SELECT id, name, role, email, token FROM users WHERE id=$1';
  const values = [id];
  return returnSingle(ctx, query, values);
};

export const updateUserToken = (ctx: Koa.Context, token: string, userId: number) => {
  const query = 'UPDATE users SET token = $1 WHERE id = $2 RETURNING id, name, role, email, token';
  const values = [token, userId];
  return returnSingle(ctx, query, values);
};
