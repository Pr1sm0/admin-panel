import { Item } from '../../interfaces';
import { returnMany, returnSingle } from './templates';

export const getAllItems = () => {
  const query = 'SELECT * FROM items';
  return returnMany(query);
};

export const getItem = (id: number) => {
  const query = 'SELECT * FROM items WHERE id=$1';
  const values = [id];
  return returnSingle(query, values);
};

export const createItem = (item: Item) => {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const query =
    'INSERT INTO items (name, price, description, created_at, updated_at, is_published) VALUES ($1, $2, $3, $4, $5, $6) RETURNING *';
  const values = [name, price, description, createdAt, updatedAt, isPublished];
  return returnSingle(query, values);
};

export const editItem = (id: number, item: Item) => {
  const { name, price, description, createdAt, updatedAt, isPublished } = item;
  const query =
    'UPDATE items SET name = $1, price = $2, description = $3, created_at = $4, updated_at = $5, is_published = $6 WHERE id = $7 RETURNING *';
  const values = [
    name,
    price,
    description,
    createdAt,
    updatedAt,
    isPublished,
    id,
  ];
  return returnSingle(query, values);
};

export const deleteItem = (id: number) => {
  const query = 'DELETE FROM items WHERE id = $1';
  const values = [id];
  return returnSingle(query, values);
};

export const sortItemsByNameAsc = () => {
  const query = 'SELECT * FROM items ORDER BY name';
  return returnMany(query);
};

export const sortItemsByNameDesc = () => {
  const query = 'SELECT * FROM items ORDER BY name DESC';
  return returnMany(query);
};

export const sortItemsByPriceAsc = () => {
  const query = 'SELECT * FROM items ORDER BY price';
  return returnMany(query);
};

export const sortItemsByPriceDesc = () => {
  const query = 'SELECT * FROM items ORDER BY price DESC';
  return returnMany(query);
};

export const sortItemsByDateAsc = () => {
  const query = 'SELECT * FROM items ORDER BY created_at';
  return returnMany(query);
};

export const sortItemsByDateDesc = () => {
  const query = 'SELECT * FROM items ORDER BY created_at DESC';
  return returnMany(query);
};

export const findItemsByName = (name: string) => {
  const query = "SELECT * FROM items WHERE name LIKE '%$1%'";
  const values = [name];
  return returnMany(query, values);
};

export const countAllItemsWithPagination = async (condition: string) => {
  const query = 'SELECT count(*) FROM items WHERE name LIKE $1';
  const values = [condition];
  const count = await returnSingle(query, values);
  return count.count;
};

export const getAllItemsWithPagination = (
  nameCondition: string,
  limit: number,
  offset: number,
) => {
  const query =
    'SELECT * FROM items WHERE name LIKE $1 ORDER BY id LIMIT $2 OFFSET $3';
  const values = [nameCondition, limit, offset];
  return returnMany(query, values);
};
