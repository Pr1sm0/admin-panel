import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import router from './controllers/index';

const app: Koa = new Koa();

app.use(bodyParser());

// Development logging
app.use(Logger());

// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());

// Generic error handling middleware.
app.use(async (ctx: Koa.Context, next: () => Promise<any>) => {
  try {
    await next();
  } catch (error) {
    ctx.status = error.statusCode || error.status;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit('error', error, ctx);
  }
});

// Initial route
app.use(async (ctx: Koa.Context) => {
  ctx.body = 'Initial route';
});

// Application error logging.
app.on('error', console.error);

export default app;