import * as Koa from 'koa';
import * as Logger from 'koa-logger';
import * as bodyParser from 'koa-bodyparser';
import * as winston from 'winston';
import * as cors from '@koa/cors';
import router from './routes/index';
import * as serve from 'koa-static';

const app: Koa = new Koa();

const PRODUCTION = 'production';
const ERROR_EVENT = 'error';
const INTERNAL_SERVER_ERROR = 500;

app.use(cors());

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
    ctx.status = error.statusCode || error.status || INTERNAL_SERVER_ERROR;
    error.status = ctx.status;
    ctx.body = { error };
    ctx.app.emit(ERROR_EVENT, error, ctx);
  }
});

app.use(serve(`${__dirname}/../public`));

// Application error logging.
app.on(ERROR_EVENT, console.error);

export const logger = winston.createLogger({
  level: 'info',
  format: winston.format.json(),
  defaultMeta: { service: 'user-service' },
  transports: [
    //
    // - Write all logs with level `error` and below to `error.log`
    // - Write all logs with level `info` and below to `combined.log`
    //
    new winston.transports.File({ filename: 'error.log', level: 'error' }),
    new winston.transports.File({ filename: 'combined.log' }),
  ],
});

//
// If we're not in production then log to the `console` with the format:
// `${info.level}: ${info.message} JSON.stringify({ ...rest }) `
//
if (process.env.NODE_ENV !== PRODUCTION) {
  logger.add(
    new winston.transports.Console({
      format: winston.format.simple(),
    }),
  );
}

export default app;
