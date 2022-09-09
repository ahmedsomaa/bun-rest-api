import { describe, expect, it } from 'bun:test';

import app from '../index';

describe('rest api with hono', () => {
  describe('GET /', () => {
    const req = new Request('http://localhost:3000/');
    it('GET / should return Ok', async () => {
      const res = await app.fetch(req);
      expect(res.status).toBe(200);
    });

    it('GET / should return hello world message', async () => {
      const res = await app.fetch(req);
      const { message }: { message: string } = await res.json();
      expect(message).toBe('Hello World!');
    });
  });

  describe('GET /auth', () => {
    const req = new Request('http://localhost:300/auth');
    it('should return 401 if no token is provided', async () => {
      const res = await app.fetch(req);
      expect(res.status).toBe(401);
    });

    it('sholud return unauthroized text if no token is provided', async () => {
      const res = await app.fetch(req);
      const data = await res.text();
      expect(data).toBe('Unauthorized');
    });

    it('sholud return 200 and authorized true when correct token provided', async () => {
      req.headers.set('Authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9');
      const res = await app.fetch(req);
      const { authorized }: { authorized: boolean } = await res.json();
      expect(res.status).toBe(200);
      expect(authorized).toBe(true);
    });
  });
});
