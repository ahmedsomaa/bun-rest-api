import { Hono } from 'hono';
import { bearerAuth } from 'hono/bearer-auth';
import { logger } from 'hono/logger';

const app = new Hono();
const port = parseInt(process.env.PORT) || 3000;

app.use(logger());

app.get(
  '/auth',
  bearerAuth({
    token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9'
  }),
  c => {
    return c.json({ authorized: true });
  }
);

const main = app.get('/', c => {
  return c.json({ message: 'Hello World!' });
});

console.log(`Running at http://localhost:${port}`);

export default {
  port,
  fetch: main.fetch
};
