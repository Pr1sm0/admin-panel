import { logger } from '../../app';
import { Image } from '../../interfaces';
import pool from '../dbConnector';

export async function getAllImagesByItemId(itemId: number) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM images WHERE item_id=$1 AND size='large'", [itemId]);
    client.release();
    return res.rows;
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}

export async function getImageByItemId(itemId: number) {
  const client = await pool.connect();
  try {
    const res = await client.query("SELECT * FROM images WHERE item_id=$1 AND size='small'", [itemId]);
    client.release();
    return res.rows[0];
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}

export async function addImage(image: Image) {
  const { size, itemId, imageUrl } = image;
  const client = await pool.connect();
  try {
    await client.query(
      'INSERT INTO images (size, itemId, imageUrl) VALUES ($1, $2, $3) RETURNING *',
      [size, itemId, imageUrl]
    );
    client.release();
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}

export async function deleteAllImagesByItemId(itemId: number) {
  const client = await pool.connect();
  try {
    await client.query(
      'DELETE FROM images WHERE item_id = $1',
      [itemId]
    );
    client.release();
  } catch (err) {
    client.release();
    logger.log('error', err);
  }
}