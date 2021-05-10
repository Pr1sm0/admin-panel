import * as Router from 'koa-router';
import authControllers from '../controllers/auth';

const routerOpts: Router.IRouterOptions = {
  prefix: '/api/v1/auth',
};

const router: Router = new Router(routerOpts);

router.post('/signup', authControllers.signupC)
router.post('/signin', authControllers.signinC)

export default router;