import { Context, DefaultState } from 'koa';
import * as Router from 'koa-router';
import authControllers from '../controllers/auth';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/v1/auth',
};

const router = new Router<DefaultState, Context>(routerOpts);

router.post('/signup', authControllers.signupController);
router.post('/signin', authControllers.signinController);

export default router;
