import { Context, DefaultState } from 'koa';
import * as Router from 'koa-router';
import imageControllers from '../controllers/image';
import authJwt from '../middleware/authJwt';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/v1/images',
};

const router = new Router<DefaultState, Context>(routerOpts);

router.post(
  '/',
  authJwt.verifyToken,
  authJwt.isAdmin,
  imageControllers.addImageController,
);

export default router;