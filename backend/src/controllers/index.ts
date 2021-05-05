import * as Router from 'koa-router';
import userRouter from './user';
import itemRouter from './item';

const router = new Router();

router.use(userRouter.routes());
router.use(userRouter.allowedMethods());

router.use(itemRouter.routes());
router.use(itemRouter.allowedMethods());

export default router;