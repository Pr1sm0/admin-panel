import { Item } from '../../interfaces';
import { returnMany, returnSingle } from './templates';
import * as Koa from 'koa';

export const getAllItems = (ctx: Koa.Context) => {
  const query = 'SELECT * FROM items';
  return returnMany(ctx, query);
};

export const getItem = (ctx: Koa.Context, id: number) => {
  const query = 'SELECT * FROM items WHERE id=$1';
  const values = [id];
  return returnSingle(ctx, query, values);
};

export const createItem = (ctx: Koa.Context, item: Item) => {
  const { name, price, description, is_published } = item;
  const query =
    'INSERT INTO items (name, price, description, created_at, updated_at, is_published) VALUES ($1, $2, $3, NOW(), NOW(), $4) RETURNING *';
  const values = [name, price, description, is_published];
  return returnSingle(ctx, query, values);
};

export const editItem = (ctx: Koa.Context, id: number, item: Item) => {
  const { name, price, description, is_published } = item;
  const query =
    'UPDATE items SET name = $1, price = $2, description = $3, updated_at = NOW(), is_published = $4 WHERE id = $5 RETURNING *';
  const values = [
    name,
    price,
    description,
    is_published,
    id,
  ];
  return returnSingle(ctx, query, values);
};

export const deleteItem = (ctx: Koa.Context, id: number) => {
  const query = 'DELETE FROM items WHERE id = $1 RETURNING *';
  const values = [id];
  return returnSingle(ctx, query, values);
};

export const countAllItemsWithPagination = async (ctx: Koa.Context, condition: string) => {
  const query = 'SELECT count(*) FROM items WHERE name LIKE $1';
  const values = [condition];
  const count = await returnSingle(ctx, query, values);
  return count.count;
};

export const getAllItemsWithPagination = (
  ctx: Koa.Context,
  nameCondition: string,
  limit: number,
  offset: number,
) => {
  const query =
    'SELECT * FROM items WHERE name LIKE $1 ORDER BY id DESC LIMIT $2 OFFSET $3';
  const values = [nameCondition, limit, offset];
  return returnMany(ctx, query, values);
};
