import { Image } from '../../interfaces';
import { returnMany, returnSingle } from './templates';
import * as Koa from 'koa';

export const getAllImagesByItemId = (ctx: Koa.Context, itemId: number) => {
  const query = "SELECT image_url FROM images WHERE item_id=$1 AND size='large'";
  const values = [itemId];
  return returnMany(ctx, query, values);
};

export const getImageByItemId = (ctx: Koa.Context, itemId: number) => {
  const query = "SELECT image_url FROM images WHERE item_id=$1 AND size='small' ORDER BY id LIMIT 1";
  const values = [itemId];
  return returnSingle(ctx, query, values);
};

export const addImage = (ctx: Koa.Context, image: Image) => {
  const { size, item_id, image_url } = image;
  const query =
    'INSERT INTO images (size, item_id, image_url) VALUES ($1, $2, $3) RETURNING *';
  const values = [size, item_id, image_url];
  return returnSingle(ctx, query, values);
};

export const deleteAllImagesByItemId = (ctx: Koa.Context, itemId: number) => {
  const query = 'DELETE FROM images WHERE item_id = $1';
  const values = [itemId];
  return returnMany(ctx, query, values);
};
