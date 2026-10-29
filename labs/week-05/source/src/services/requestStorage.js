/**
 * requestStorage.js — ที่เดียวที่แตะ localStorage ได้
 */

export const STORAGE_KEY = 'engse203-campus-requests-v1';
export const SCHEMA_VERSION = 1;

const priorities = new Set(['normal', 'urgent']);
const statuses = new Set(['pending', 'in-progress', 'completed']);

function isNonEmptyString(value) {
  return typeof value === 'string' && value.trim().length > 0;
}

function isValidRequest(request) {
  return Boolean(
    request
      && isNonEmptyString(request.id)
      && request.id.startsWith('REQ-')
      && typeof request.requesterName === 'string'
      && request.requesterName.trim().length >= 2
      && isNonEmptyString(request.requestType)
      && isNonEmptyString(request.location)
      && typeof request.details === 'string'
      && request.details.trim().length >= 10
      && priorities.has(request.priority)
      && statuses.has(request.status),
  );
}

function validateRequests(requests) {
  if (!Array.isArray(requests) || !requests.every(isValidRequest)) return false;
  return new Set(requests.map((request) => request.id)).size === requests.length;
}

export function readStoredRequests() {
  const raw = localStorage.getItem(STORAGE_KEY);
  if (raw === null) {
    return { status: 'missing' };
  }

  try {
    const envelope = JSON.parse(raw);
    if (
      !envelope
      || envelope.schemaVersion !== SCHEMA_VERSION
      || !validateRequests(envelope.requests)
    ) {
      return { status: 'invalid', reason: 'Invalid envelope schema or request payload' };
    }

    return {
      status: 'valid',
      requests: structuredClone(envelope.requests),
    };
  } catch (err) {
    return { status: 'invalid', reason: 'JSON parsing failure' };
  }
}

export function writeStoredRequests(requests) {
  if (!validateRequests(requests)) {
    throw new Error('ไม่สามารถบันทึกข้อมูลได้ เนื่องจากโครงสร้างข้อมูลไม่ถูกต้อง');
  }

  const envelope = {
    schemaVersion: SCHEMA_VERSION,
    updatedAt: new Date().toISOString(),
    requests,
  };

  localStorage.setItem(STORAGE_KEY, JSON.stringify(envelope));
}

export function clearStoredRequests() {
  localStorage.removeItem(STORAGE_KEY);
}
