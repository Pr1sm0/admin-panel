import * as Koa from 'koa';
import * as Router from 'koa-router';
import { signup, signin } from '../services/user';

const routerOpts: Router.IRouterOptions = {
  prefix: '/users',
};

const router: Router = new Router(routerOpts);

// signup user

router.post('/signup', async (ctx: Koa.Context) => {
  const user = ctx.request.body;
  ctx.response.body = await signup(user);
})

// login user

router.post('/login', async (ctx: Koa.Context) => {
  const email = ctx.request.body.email;
  const password = ctx.request.body.password;
  ctx.response.body = await signin(email, password);
})

export default router;