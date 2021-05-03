import * as Koa from 'koa';
import * as Router from 'koa-router';
import * as Logger from 'koa-logger';
import { Pool } from 'pg';
import * as dotenv from 'dotenv';

dotenv.config();

const app = new Koa();
const router = new Router();

const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'admin_panel',
  password: process.env.DATABASE_PASSWORD,
  port: +process.env.DATABASE_PORT
});

router.get('/users', async ctx => {
  async function getData() {
    return new Promise((resolve, reject) => {
      pool.connect((err, client, done) => {
        if (err) {
          reject({ status: 500, message: 'Something went wrong' })
          console.log('Pool Connection Error: ', err)
          throw err
        }

        client.query('SELECT * FROM users', (err, result) => {
          done()

          if (err) {
            reject({ status: 500, message: 'Something went wrong' })
            console.log('Query Error: ', err)
            throw err
          }

          resolve({ status: 200, data: result.rows })
          console.log('Query Result:', result.rows)
        })
      })
    })
  }

  ctx.response.body = await getData()
})

// Development logging
app.use(Logger());

// Add routes and response to the OPTIONS requests
app.use(router.routes()).use(router.allowedMethods());

// Listen the port
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});