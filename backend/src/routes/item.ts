import * as Router from 'koa-router';
import itemControllers from '../controllers/item';
import authJwt from '../middleware/authJwt';

const routerOpts: Router.IRouterOptions = {
  prefix: '/items',
};

const router: Router = new Router(routerOpts);

router.get('/', itemControllers.getAllItemsC)
router.get('/:itemId', itemControllers.getItemByIdC)

router.post('/item', authJwt.verifyToken, authJwt.isAdmin, itemControllers.createItemC)

router.put('/:itemId', authJwt.verifyToken, authJwt.isAdmin, itemControllers.editItemC)

router.delete('/:itemId', authJwt.verifyToken, authJwt.isAdmin, itemControllers.deleteItemC)

export default router;
