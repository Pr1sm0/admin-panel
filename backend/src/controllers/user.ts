import * as Koa from 'koa';
import * as Router from 'koa-router';
import { getAllUsers } from '../db/queries/user';

const routerOpts: Router.IRouterOptions = {
  prefix: '/users',
};

const router: Router = new Router(routerOpts);

router.get('/', async (ctx: Koa.Context) => {
  ctx.response.body = await getAllUsers();
})

export default router;