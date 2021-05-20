import * as Koa from 'koa';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { logger } from '../app';

dotenv.config();

const FORBIDDEN = 403;
const ADMIN_ROLE = 'admin';
const ERROR_LEVEL = 'error';
const NO_TOKEN_ERROR_MESSAGE = 'No token.';
const NOT_ADMIN_ERROR_MESSAGE = 'Require admin role!';

const secret = process.env.JWT_SECRET;

const verifyToken = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const token = String(ctx.headers['x-access-token']);
  if (!token) ctx.throw(FORBIDDEN, NO_TOKEN_ERROR_MESSAGE);
  try {
    ctx.request.body.jwtPayload = jwt.verify(token, secret);
  } catch (err) {
    logger.log(ERROR_LEVEL, err);
    ctx.throw(err.status || FORBIDDEN, err.message);
  }
  await next();
};

const isAdmin = async (ctx: Koa.Context, next: () => Promise<any>) => {
  const role = ctx.request.body.jwtPayload.role;
  if (role === ADMIN_ROLE) {
    await next();
    return;
  }
  ctx.response.status = FORBIDDEN;
  ctx.body = NOT_ADMIN_ERROR_MESSAGE;
};

const authJwt = {
  verifyToken,
  isAdmin,
};

export default authJwt;
