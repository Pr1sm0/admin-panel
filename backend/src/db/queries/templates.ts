import pool from '../dbConnector';
import * as Koa from 'koa';
import { logger } from '../../app';

const ERROR_LEVEL = 'error';

export const returnMany = async (ctx: Koa.Context, query: string, values?: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, values);
    client.release();
    return res.rows;
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
    ctx.throw(err.status, err.message);
  }
};

export const returnSingle = async (ctx: Koa.Context, query: string, values?: any[]) => {
  const client = await pool.connect();
  try {
    const res = await client.query(query, values);
    client.release();
    return res.rows[0];
  } catch (err) {
    client.release();
    logger.log(ERROR_LEVEL, err);
    ctx.throw(err.status, err.message);
  }
};
