import * as Koa from 'koa';
import * as Router from 'koa-router';
import { createItem, deleteItem, editItem, getAllItems, getItem } from '../db/queries/item';
import authJwt from '../middleware/authJwt';

const routerOpts: Router.IRouterOptions = {
  prefix: '/items',
};

const router: Router = new Router(routerOpts);

// get all items

router.get('/', async (ctx: Koa.Context) => {
  ctx.response.body = await getAllItems();
})

// get item by id

router.get('/:itemId', async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await getItem(id);
})

// create item

router.post('/item', authJwt.verifyToken, authJwt.isAdmin, async (ctx: Koa.Context) => {
  const item = ctx.request.body;
  ctx.response.body = await createItem(item);
})

// edit item

router.put('/:itemId', authJwt.verifyToken, authJwt.isAdmin, async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  const item = ctx.request.body;
  ctx.response.body = await editItem(id, item);
})

// delete item

router.delete('/:itemId', authJwt.verifyToken, authJwt.isAdmin, async (ctx: Koa.Context) => {
  const id = Number(ctx.params.itemId);
  ctx.response.body = await deleteItem(id);
})

export default router;