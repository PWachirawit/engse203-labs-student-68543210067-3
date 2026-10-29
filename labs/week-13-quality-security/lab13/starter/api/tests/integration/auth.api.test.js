import { describe, test, expect, beforeEach } from 'vitest';
import request from 'supertest';
import { createApp } from '../../src/app.js';
import { loadSeed } from '../../src/services/requestService.js';
import { resetLoginLimiter } from '../../src/routes/authRoutes.js';
import { STAFF, loginAsStaff, tokenFor } from '../helpers/auth.js';

const app = createApp();
beforeEach(async () => {
  resetLoginLimiter();
  await loadSeed();
});

describe('POST /api/auth/login', () => {
  test('valid credentials return a 200 response with a three-part token', async () => {
    const r = await request(app).post('/api/auth/login').send(STAFF);
    expect(r.status).toBe(200);
    expect(r.body.token.split('.')).toHaveLength(3);
  });

  test('incorrect password returns 401', async () => {
    const r = await request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' });
    expect(r.status).toBe(401);
  });

  test('unknown email and incorrect password return the same 401 message', async () => {
    const [unknown, wrongPassword] = await Promise.all([
      request(app).post('/api/auth/login').send({ ...STAFF, email: 'unknown@example.com' }),
      request(app).post('/api/auth/login').send({ ...STAFF, password: 'nope1234' }),
    ]);
    expect(unknown.status).toBe(401);
    expect(unknown.body.error).toBe(wrongPassword.body.error);
  });

  test('sixth login attempt is rate limited after five incorrect passwords', async () => {
    for (let attempt = 0; attempt < 5; attempt += 1) {
      await request(app).post('/api/auth/login')
        .send({ ...STAFF, password: `wrong-password-${attempt}` })
        .expect(401);
    }

    const response = await request(app).post('/api/auth/login').send(STAFF);
    expect(response.status).toBe(429);
    expect(Number(response.headers['retry-after'])).toBeGreaterThan(0);
  });
});

describe('authorization for PUT and DELETE', () => {
  const put = () => request(app).put('/api/requests/REQ-001').send({ status: 'completed' });

  test('missing token returns 401', async () => {
    await put().expect(401);
  });

  test('token signed with a different secret returns 401', async () => {
    await put()
      .set('Authorization', `Bearer ${tokenFor('staff', 'not-the-real-secret')}`)
      .expect(401);
  });

  test('valid token for a non-staff role returns 403', async () => {
    await put().set('Authorization', `Bearer ${tokenFor('requester')}`).expect(403);
  });

  test('staff can update and delete requests', async () => {
    const auth = `Bearer ${await loginAsStaff(app)}`;
    await put().set('Authorization', auth).expect(200);
    await request(app).delete('/api/requests/REQ-002').set('Authorization', auth).expect(204);
  });

  test('GET and POST requests remain public', async () => {
    await request(app).get('/api/requests').expect(200);
    await request(app).post('/api/requests').send({
      requesterName: 'นักศึกษา ทั่วไป',
      requestType: 'แจ้งซ่อม',
      location: 'ห้อง 205',
      details: 'ไฟห้องเรียนดับสองดวง',
      priority: 'normal',
    }).expect(201);
  });

  test('API responses include the nosniff security header', async () => {
    const response = await request(app).get('/api/health').expect(200);
    expect(response.headers['x-content-type-options']).toBe('nosniff');
  });

  test.each(['http://localhost:5173', 'http://127.0.0.1:5173'])(
    'development CORS allows frontend origin %s',
    async (origin) => {
      const response = await request(app).get('/api/health').set('Origin', origin).expect(200);
      expect(response.headers['access-control-allow-origin']).toBe(origin);
    },
  );
});
