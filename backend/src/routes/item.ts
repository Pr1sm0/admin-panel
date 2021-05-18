import { Context, DefaultState } from 'koa';
import * as Router from 'koa-router';
import itemControllers from '../controllers/item';
import authJwt from '../middleware/authJwt';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/v1/items',
};

const router = new Router<DefaultState, Context>(routerOpts);

router.get('/', itemControllers.getAllItemsPaginationController);
router.get('/all', itemControllers.getAllItemsController);
router.get('/:itemId', itemControllers.getItemByIdController);

router.post(
  '/',
  authJwt.verifyToken,
  authJwt.isAdmin,
  itemControllers.createItemController,
);

router.put(
  '/:itemId',
  authJwt.verifyToken,
  authJwt.isAdmin,
  itemControllers.editItemController,
);

router.delete(
  '/:itemId',
  authJwt.verifyToken,
  authJwt.isAdmin,
  itemControllers.deleteItemController,
);

export default router;
