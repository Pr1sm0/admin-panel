import { Image } from '../../interfaces';
import { returnMany, returnSingle } from './templates';

export async function getAllImagesByItemId(itemId: number) {
  const query = "SELECT * FROM images WHERE item_id=$1 AND size='large'";
  const values = [itemId];
  return returnMany(query, values);
}

export async function getImageByItemId(itemId: number) {
  const query = "SELECT * FROM images WHERE item_id=$1 AND size='small'";
  const values = [itemId];
  return returnSingle(query, values);
}

export async function addImage(image: Image) {
  const { size, itemId, imageUrl } = image;
  const query = 'INSERT INTO images (size, itemId, imageUrl) VALUES ($1, $2, $3) RETURNING *';
  const values = [size, itemId, imageUrl];
  return returnSingle(query, values);
}

export async function deleteAllImagesByItemId(itemId: number) {
  const query = 'DELETE FROM images WHERE item_id = $1';
  const values = [itemId];
  return returnMany(query, values);
}
