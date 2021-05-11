import * as Koa from 'koa';
import { signup, signin } from '../services/auth';

const signupController = async (ctx: Koa.Context) => {
  const user = ctx.request.body;
  ctx.response.body = await signup(user);
};

const signinController = async (ctx: Koa.Context) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  ctx.response.body = await signin(email, password);
};

const authControllers = {
  signupController,
  signinController,
};

export default authControllers;
