import * as Koa from 'koa';
import * as Joi from 'joi';
import { signup, signin } from '../services/auth';
import { User } from '../interfaces';

const userSchema = Joi.object({
  name: Joi.string().min(3).max(100).required(),

  role: Joi.string().alphanum().required(),

  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}')).required(),
});

const loginSchema = Joi.object({
  email: Joi.string().email().required(),

  password: Joi.string().pattern(new RegExp('(?=.*\\d)(?=.*[a-z])(?=.*[A-Z]).{8,50}')).required(),
});

const signupController = async (ctx: Koa.Context) => {
  try {
    const user: User = ctx.request.body;
    const validatedUser = await userSchema.validateAsync(user);
    ctx.response.body = await signup(ctx, validatedUser);
  } catch (err) {
    ctx.throw(err.status, err);
  }
};

const signinController = async (ctx: Koa.Context) => {
  try {
    const email = ctx.request.body.email;
    const password = ctx.request.body.password;
    const credentials = { email, password };
    const validatedCredentials = await loginSchema.validateAsync(credentials);
    ctx.response.body = await signin(ctx, validatedCredentials);
  } catch (err) {
    ctx.throw(err.status, err);
  }
};

const authControllers = {
  signupController,
  signinController,
};

export default authControllers;
