/**
 * requestService.js — ชั้นเข้าถึงข้อมูล
 */

import { clearStoredRequests, readStoredRequests, writeStoredRequests } from './requestStorage.js';

const LAB_DELAY_MS = 420;

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function waitForLabDelay() {
  await delay(globalThis.__ENGSE203_SKIP_DELAY__ ? 0 : LAB_DELAY_MS);
}

async function fetchSeedRequests() {
  const baseUrl = import.meta.env?.BASE_URL ?? '/';
  const response = await fetch(`${baseUrl}data/initialRequests.json`);
  if (!response.ok) throw new Error('ไม่สามารถโหลดข้อมูลตัวอย่างได้');
  return structuredClone(await response.json());
}

async function loadNormalRequests(onRecovery) {
  const stored = readStoredRequests();
  if (stored.status === 'valid') {
    return stored.requests;
  }

  const seed = await fetchSeedRequests();
  writeStoredRequests(seed);

  if (stored.status === 'invalid') {
    onRecovery?.('ตรวจพบข้อมูลในเครื่องเสียหาย ระบบได้กู้คืนข้อมูลตัวอย่างเริ่มต้นให้เรียบร้อยแล้ว');
  }

  return seed;
}

export async function getRequests(options = {}) {
  await waitForLabDelay();

  if (options.scenario === 'error') {
    throw new Error('LAB scenario: จำลองการโหลดข้อมูลไม่สำเร็จ');
  }
  if (options.scenario === 'empty') {
    return [];
  }

  return loadNormalRequests(options.onRecovery);
}

export async function getRequestById(requestId) {
  const requests = await getRequests();
  return requests.find((request) => request.id === requestId) ?? null;
}

export async function addRequest(requestInput) {
  if (!requestInput || typeof requestInput !== 'object') {
    throw new Error('ข้อมูลคำร้องไม่ถูกต้อง');
  }

  const requesterName = requestInput.requesterName;
  const requestType = requestInput.requestType;
  const location = requestInput.location;
  const details = requestInput.details;
  const priority = requestInput.priority ?? 'normal';

  if (typeof requesterName !== 'string' || requesterName.trim().length < 2) {
    throw new Error('กรุณาระบุชื่อผู้แจ้งอย่างน้อย 2 ตัวอักษร');
  }
  if (typeof requestType !== 'string' || requestType.trim().length === 0) {
    throw new Error('กรุณาเลือกประเภทคำร้อง');
  }
  if (typeof location !== 'string' || location.trim().length === 0) {
    throw new Error('กรุณาระบุสถานที่');
  }
  if (typeof details !== 'string' || details.trim().length < 10) {
    throw new Error('กรุณาระบุรายละเอียดอย่างน้อย 10 ตัวอักษร');
  }
  if (!['normal', 'urgent'].includes(priority)) {
    throw new Error('ระดับความสำคัญไม่ถูกต้อง');
  }

  const currentRequests = await getRequests();
  const maxNumber = currentRequests.length > 0
    ? Math.max(...currentRequests.map((r) => parseInt(r.id.replace(/\D/g, ''), 10) || 0))
    : 0;

  const newRequest = {
    id: `REQ-${String(maxNumber + 1).padStart(3, '0')}`,
    requesterName: requesterName.trim(),
    requestType: requestType.trim(),
    location: location.trim(),
    details: details.trim(),
    priority,
    status: 'pending',
  };

  const updatedRequests = [newRequest, ...currentRequests];
  writeStoredRequests(updatedRequests);
  return newRequest;
}

export async function deleteRequest(requestId) {
  const currentRequests = await getRequests();
  const nextRequests = currentRequests.filter((request) => request.id !== requestId);
  writeStoredRequests(nextRequests);
  return nextRequests;
}

export async function resetRequests() {
  clearStoredRequests();
  const seed = await fetchSeedRequests();
  writeStoredRequests(seed);
  return seed;
}
