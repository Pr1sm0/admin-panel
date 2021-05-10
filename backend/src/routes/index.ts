import * as Router from 'koa-router';
import authRouter from './auth';
import itemRouter from './item';

const router = new Router();

router.use(authRouter.routes());
router.use(authRouter.allowedMethods());

router.use(itemRouter.routes());
router.use(itemRouter.allowedMethods());

export default router;
