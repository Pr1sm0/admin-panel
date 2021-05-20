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
import { logger } from '../app';

dotenv.config();

const TWENTY_FOUR_HOURS_IN_SECONDS = 86400;
const SALT = 10;
const ERROR_LEVEL = 'error';
const WRONG_PASSWORD_ERROR_MESSAGE = 'Incorrect password.';

const secret = process.env.JWT_SECRET;

const hashPassword = async (password: string) => {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, SALT, (err, hash) => {
      if (err) {
        logger.log(ERROR_LEVEL, err);
        reject(err);
      } else {
        resolve(hash);
      }
    }),
  );
}

const createToken = (userId: number, role: string) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      { id: userId, role: role },
      secret,
      {
        expiresIn: TWENTY_FOUR_HOURS_IN_SECONDS,
      },
      (err, data) => {
        if (err) {
          logger.log(ERROR_LEVEL, err);
          reject(err);
        } else {
          resolve(data);
        }
      },
    );
  });
};

const checkPassword = (password: string, userPassword: string) => {
  return new Promise((resolve, reject) =>
    bcrypt.compare(password, userPassword, (err, response) => {
      if (err) {
        logger.log(ERROR_LEVEL, err);
        reject(err);
      } else if (response) {
        resolve(response);
      } else {
        reject(new Error(WRONG_PASSWORD_ERROR_MESSAGE));
      }
    }),
  );
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
        token: user.token
      }
    });
}

export const signin = async (ctx: Koa.Context, email: string, password: string) => {
  let user: User;
  return getUserByEmail(ctx, email)
    .then((foundUser) => {
      user = foundUser;
      return checkPassword(password, foundUser.password);
    })
    .then(() => createToken(user.id, user.role))
    .then((token: string) => updateUserToken(ctx, token, user.id))
    .then(() => {
      return {
        id: user.id,
        name: user.name,
        email: user.email,
        role: user.role,
        token: user.token
      }
    })
    .catch((err) => ctx.throw(401, err.message));
}
