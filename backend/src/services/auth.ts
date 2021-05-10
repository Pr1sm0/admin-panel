import { User } from '../interfaces';
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

const secret = process.env.JWT_SECRET;

async function hashPassword(password: string) {
  return new Promise((resolve, reject) =>
    bcrypt.hash(password, 10, (err, hash) => {
      if (err) {
        logger.log('error', err);
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
        expiresIn: 86400, // 24 hours
      },
      (err, data) => {
        if (err) {
          logger.log('error', err);
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
        logger.log('error', err);
        reject(err);
      } else if (response) {
        resolve(response);
      } else {
        reject(new Error('Passwords do not match.'));
      }
    }),
  );
};

export async function signup(user: User) {
  hashPassword(user.password)
    .then((hashedPassword: string) => {
      user.password = hashedPassword;
    })
    .then(() => createToken(user.id, user.role))
    .then((token: string) => (user.token = token))
    .then(() => createUser(user))
    .then((user) => {
      return user;
    })
    .catch((err) => logger.log('error', err));
}

export async function signin(email: string, password: string) {
  let user: User;
  getUserByEmail(email)
    .then((foundUser) => {
      user = foundUser;
      return checkPassword(password, foundUser.password);
    })
    .then(() => createToken(user.id, user.role))
    .then((token: string) => updateUserToken(token, user.id))
    .then(() => {
      return user;
    })
    .catch((err) => logger.log('error', err));
}
