import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { apiFetch, setAuthToken } from './apiClient.js';

describe('apiFetch authorization header', () => {
  beforeEach(() => {
    setAuthToken('test-access-token');
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({ ok: true, status: 204 }));
  });

  afterEach(() => {
    setAuthToken(null);
    vi.unstubAllGlobals();
  });

  test('sends the current bearer token with API requests', async () => {
    await apiFetch('/api/requests');
    const [, options] = fetch.mock.calls[0];
    expect(options.headers.Authorization).toBe('Bearer test-access-token');
  });

  test('does not send an empty bearer token before login', async () => {
    setAuthToken(null);
    await apiFetch('/api/requests');
    const [, options] = fetch.mock.calls[0];
    expect(options.headers).not.toHaveProperty('Authorization');
  });
});
