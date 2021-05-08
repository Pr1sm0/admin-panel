import * as Koa from 'koa';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';  
import { User } from '../interfaces';
import { getUserById } from '../db/queries/user';

dotenv.config();

const secret = process.env.JWT_SECRET;

const verifyToken = (ctx: Koa.Context, next: () => Promise<any>) => {
  if (!ctx.headers.authorization) ctx.throw(403, 'No token.');
  const token = ctx.headers.authorization.split(' ')[1];
  try {
    ctx.request.body.jwtPayload = jwt.verify(token, secret);
  } catch (err) {
    ctx.throw(err.status || 403, err.text);
  }
  next();
};

const isAdmin = (ctx: Koa.Context, next: () => Promise<any>) => {
  getUserById(ctx.request.body.id).then(user => {
      if (user.role === "admin") {
        next();
        return;
      }
      ctx.throw(403, 'Require Admin Role!');
    });
};

const authJwt = {
  verifyToken: verifyToken,
  isAdmin: isAdmin,
};

export default authJwt;