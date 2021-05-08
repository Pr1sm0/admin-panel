import * as Router from 'koa-router';
import itemControllers from '../controllers/item';
import authJwt from '../middleware/authJwt';

const routerOpts: Router.IRouterOptions = {
  prefix: '/items',
};

const router: Router = new Router(routerOpts);

// get all items

router.get('/', itemControllers.getAllItemsC)

// get item by id

router.get('/:itemId', itemControllers.getItemByIdC)

// create item

router.post('/item', authJwt.verifyToken, authJwt.isAdmin, itemControllers.createItemC)

// edit item

router.put('/:itemId', authJwt.verifyToken, authJwt.isAdmin, itemControllers.editItemC)

// delete item

router.delete('/:itemId', authJwt.verifyToken, authJwt.isAdmin, itemControllers.deleteItemC)

export default router;
