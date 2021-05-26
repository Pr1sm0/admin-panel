import * as Router from 'koa-router';
import authRouter from './auth';
import itemRouter from './item';
import imageRouter from './image';

const router = new Router();

router.use(authRouter.routes());
router.use(authRouter.allowedMethods());

router.use(itemRouter.routes());
router.use(itemRouter.allowedMethods());

router.use(imageRouter.routes());
router.use(imageRouter.allowedMethods());

export default router;
