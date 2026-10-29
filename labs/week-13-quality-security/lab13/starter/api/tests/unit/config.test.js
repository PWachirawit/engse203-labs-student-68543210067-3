import { describe, expect, test } from 'vitest';
import { spawnSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const API_ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../..');

function loadConfig(env) {
  return spawnSync(process.execPath, [
    '--input-type=module',
    '--eval',
    "const { config } = await import('./src/config.js'); console.log(config.jwtSecret)",
  ], { cwd: API_ROOT, env: { ...process.env, ...env }, encoding: 'utf8' });
}

describe('JWT_SECRET configuration', () => {
  test.each(['', '   '])('production rejects an empty secret (%j)', (secret) => {
    const result = loadConfig({ NODE_ENV: 'production', JWT_SECRET: secret });
    expect(result.status).not.toBe(0);
    expect(result.stderr).toContain('JWT_SECRET');
  });

  test('production accepts a configured secret', () => {
    const result = loadConfig({ NODE_ENV: 'production', JWT_SECRET: 'configured-secret' });
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('configured-secret');
  });

  test('development keeps the local fallback when no secret is configured', () => {
    const env = { ...process.env, NODE_ENV: 'development' };
    delete env.JWT_SECRET;
    const result = loadConfig(env);
    expect(result.status).toBe(0);
    expect(result.stdout).toContain('dev-only-secret-do-not-use-in-production');
  });
});
