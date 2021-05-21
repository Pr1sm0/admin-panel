import { User } from '../interfaces';
import * as Koa from 'koa';
import * as bcrypt from 'bcrypt';
import * as dotenv from 'dotenv';
import * as jwt from 'jsonwebtoken';
import {
  createUser,
  getUserByEmail,
  updateUserToken,
} from '../db/queries/user';

dotenv.config();

const TWENTY_FOUR_HOURS_IN_SECONDS = 86400;
const SALT = 10;
const WRONG_PASSWORD_ERROR_MESSAGE = 'Incorrect password.';

const secret = process.env.JWT_SECRET;

const hashPassword = async (password: string) => {
  const hash = await bcrypt.hash(password, SALT);
  return hash;
};

const createToken = (userId: number, role: string) => {
  const token = jwt.sign({ id: userId, role: role }, secret, {
    expiresIn: TWENTY_FOUR_HOURS_IN_SECONDS,
  });
  return token;
};

const checkPassword = async (
  ctx: Koa.Context,
  password: string,
  userPassword: string,
) => {
  const res = await bcrypt.compare(password, userPassword);
  if (res) {
    return res;
  } else {
    ctx.throw(401, WRONG_PASSWORD_ERROR_MESSAGE);
  }
};

export const signup = async (ctx: Koa.Context, user: User) => {
  return hashPassword(user.password)
    .then((hashedPassword: string) => {
      user.password = hashedPassword;
    })
    .then(() => createToken(user.id, user.role))
    .then((token: string) => (user.token = token))
    .then(() => createUser(ctx, user))
    .then((user) => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
      };
    });
};

export const signin = async (
  ctx: Koa.Context,
  credentials: any
) => {
  let user: User;
  return getUserByEmail(ctx, credentials.email)
    .then((foundUser) => {
      user = foundUser;
      return checkPassword(ctx, credentials.password, foundUser.password);
    })
    .then(() => createToken(user.id, user.role))
    .then((token: string) => updateUserToken(ctx, token, user.id))
    .then(() => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token,
      };
    });
};
