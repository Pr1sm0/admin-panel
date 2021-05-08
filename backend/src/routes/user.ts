import * as Router from 'koa-router';
import userControllers from '../controllers/user';

const routerOpts: Router.IRouterOptions = {
  prefix: '/users',
};

const router: Router = new Router(routerOpts);

router.post('/signup', userControllers.signupC)
router.post('/signin', userControllers.signinC)

export default router;