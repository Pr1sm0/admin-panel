import * as Koa from 'koa';
import { signup, signin } from '../services/auth';

// signup user

const signupC = async (ctx: Koa.Context) => {
  const user = ctx.request.body;
  ctx.response.body = await signup(user);
}

// login user

const signinC = async (ctx: Koa.Context) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  ctx.response.body = await signin(email, password);
}

const authControllers = {
  signupC: signupC,
  signinC: signinC,
};

export default authControllers;