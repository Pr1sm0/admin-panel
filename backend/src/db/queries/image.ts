import { Image } from '../../interfaces';
import { returnMany, returnSingle } from './templates';

export const getAllImagesByItemId = (itemId: number) => {
  const query = "SELECT * FROM images WHERE item_id=$1 AND size='large'";
  const values = [itemId];
  return returnMany(query, values);
};

export const getImageByItemId = (itemId: number) => {
  const query = "SELECT * FROM images WHERE item_id=$1 AND size='small'";
  const values = [itemId];
  return returnSingle(query, values);
};

export const addImage = (image: Image) => {
  const { size, itemId, imageUrl } = image;
  const query =
    'INSERT INTO images (size, item_id, image_url) VALUES ($1, $2, $3) RETURNING *';
  const values = [size, itemId, imageUrl];
  return returnSingle(query, values);
};

export const deleteAllImagesByItemId = (itemId: number) => {
  const query = 'DELETE FROM images WHERE item_id = $1';
  const values = [itemId];
  return returnMany(query, values);
};
