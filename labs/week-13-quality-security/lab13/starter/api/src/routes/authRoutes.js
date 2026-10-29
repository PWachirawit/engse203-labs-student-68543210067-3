import { Router } from 'express';
import * as authService from '../services/authService.js';
import { validateLoginInput } from '../validators/requestValidator.js';

// route ให้มาแล้ว — งานหลักอยู่ใน services/authService.js (CP50)
const router = Router();
const MAX_FAILED_ATTEMPTS = 5;
const LOGIN_WINDOW_MS = 15 * 60 * 1000;
const failedAttempts = new Map();

function clientKey(req) {
  return req.ip ?? req.socket.remoteAddress ?? 'unknown';
}

function rateLimitLogin(req, res, next) {
  const now = Date.now();
  for (const [key, entry] of failedAttempts) {
    if (entry.resetAt <= now) failedAttempts.delete(key);
  }

  const entry = failedAttempts.get(clientKey(req));
  if (entry?.attempts >= MAX_FAILED_ATTEMPTS) {
    res.set('Retry-After', String(Math.ceil((entry.resetAt - now) / 1000)));
    return res.status(429).json({ error: 'พยายามเข้าสู่ระบบหลายครั้งเกินไป กรุณาลองใหม่ภายหลัง' });
  }
  next();
}

function recordFailedAttempt(req) {
  const now = Date.now();
  const key = clientKey(req);
  const entry = failedAttempts.get(key);
  if (!entry || entry.resetAt <= now) {
    failedAttempts.set(key, { attempts: 1, resetAt: now + LOGIN_WINDOW_MS });
    return;
  }
  entry.attempts += 1;
}

export function resetLoginLimiter() {
  failedAttempts.clear();
}

router.post('/login', rateLimitLogin, (req, res) => {
  const errors = validateLoginInput(req.body);
  if (errors.length > 0) {
    return res.status(400).json({ error: 'ข้อมูลเข้าสู่ระบบไม่ถูกต้อง', details: errors });
  }
  const result = authService.login(req.body.email, req.body.password);
  if (!result) {
    recordFailedAttempt(req);
    return res.status(401).json({ error: 'อีเมลหรือรหัสผ่านไม่ถูกต้อง' });
  }
  res.status(200).json(result);
});

export default router;
