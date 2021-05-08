import * as Router from 'koa-router';
import userControllers from '../controllers/user';

const routerOpts: Router.IRouterOptions = {
  prefix: '/users',
};

const router: Router = new Router(routerOpts);

// signup user

router.post('/signup', userControllers.signupC)

// login user

router.post('/signin', userControllers.signinC)

export default router;