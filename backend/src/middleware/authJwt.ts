import * as Koa from 'koa';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import { logger } from '../app';

dotenv.config();

const secret = process.env.JWT_SECRET;

const verifyToken = (ctx: Koa.Context, next: () => Promise<any>) => {
  if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
  const token = ctx.headers.authorization.split(' ')[1];
  try {
    ctx.request.body.jwtPayload = jwt.verify(token, secret);
  } catch (err) {
    logger.log('error', err);
    ctx.throw(err.status || 403, err.text);
  }
  next();
};

const isAdmin = (ctx: Koa.Context, next: () => Promise<any>) => {
  const role = ctx.request.body.jwtPayload.role;
  if (role === 'admin') {
    next();
    return;
  }
  ctx.throw(403, 'Require admin role!');
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

export default authJwt;
