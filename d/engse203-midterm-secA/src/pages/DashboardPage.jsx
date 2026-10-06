import { useEffect, useMemo, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import ErrorState from '../components/ErrorState.jsx';
import FilterBar from '../components/FilterBar.jsx';
import LoadingState from '../components/LoadingState.jsx';
import RequestList from '../components/RequestList.jsx';
import SummaryPanel from '../components/SummaryPanel.jsx';
import useManualReload from '../hooks/useManualReload.js';
import { deleteRequest, getRequests, resetRequests, updateRequestStatus } from '../services/requestService.js';

function DashboardPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const scenario = searchParams.get('scenario') ?? '';
  const [reloadKey, reload] = useManualReload();
  const [loadState, setLoadState] = useState('idle');
  const [requests, setRequests] = useState([]);
  const [statusFilter, setStatusFilter] = useState('all'); // ต้องกำหนดค่าเริ่มต้นเป็น 'all'
  // TODO B2: เพิ่ม state สำหรับข้อความค้นหา ที่นี่
  const [searchQuery, setSearchQuery] = useState(''); 
  const [errorMessage, setErrorMessage] = useState('');
  const [notice, setNotice] = useState('');

  useEffect(() => {
    let ignore = false;
    setLoadState('loading');
    setErrorMessage('');
    setNotice('');

    getRequests({
      scenario,
      onRecovery: (message) => { if (!ignore) setNotice(message); },
    }).then((data) => {
      if (ignore) return;
      setRequests(data);
      setLoadState('success');
    }).catch((error) => {
      if (ignore) return;
      setErrorMessage(error instanceof Error ? error.message : 'เกิดข้อผิดพลาดที่ไม่ทราบสาเหตุ');
      setLoadState('error');
    });

    return () => { ignore = true; };
  }, [scenario, reloadKey]);

  const summary = useMemo(() => ({
    total: requests.length,

    pending: requests.filter((request) => request.status === 'pending').length,
    inProgress: requests.filter((request) => request.status === 'in-progress').length,
    completed: requests.filter((request) => request.status === 'completed').length,
  }), [requests]);

  // จุดที่แก้ไขสำหรับ B2.2 และ B2.3 
  const filteredRequests = requests.filter((request) => {
    // 1. ตรวจสอบสถานะ (CP-B2.3)
    const matchStatus = statusFilter === 'all' || request.status === statusFilter;

    // 2. ตรวจสอบข้อความค้นหาจากชื่อหรือรายละเอียด (CP-B2.2)
    // ใช้ .toLowerCase() เพื่อให้ค้นหาเจอโดยไม่ต้องสนตัวพิมพ์เล็ก/ใหญ่
    const keyword = searchQuery.toLowerCase();
    const matchSearch = 
      request.requesterName.toLowerCase().includes(keyword) || 
      request.details.toLowerCase().includes(keyword);

    // ต้องตรงทั้ง 2 เงื่อนไขถึงจะแสดงผล
    return matchStatus && matchSearch;
  });

  function handleRetry() {
    if (scenario) setSearchParams({});
    else reload();
  }

  async function handleDelete(requestId) {
    try {
      const nextRequests = await deleteRequest(requestId);
      setRequests(nextRequests);
      setNotice(`ลบคำร้อง ${requestId} แล้ว`);
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'ลบคำร้องไม่สำเร็จ');
    }
  }

async function handleReset() {
    if (!window.confirm('ต้องการคืนข้อมูลตัวอย่างเริ่มต้นหรือไม่?')) return;
    try {
      await resetRequests(); // 1. สั่งรีเซ็ตข้อมูลในไฟล์ Service ให้เสร็จก่อน
      reload(); // 2. สั่ง reload ให้ useEffect ไปดึงข้อมูลใหม่มาแสดง
      setStatusFilter('all');
      setNotice('คืนข้อมูลตัวอย่างเริ่มต้นแล้ว');
    } catch (error) {
      setNotice(error instanceof Error ? error.message : 'คืนข้อมูลไม่สำเร็จ');
    }
  }

async function handleMarkDone(requestId) {
  try {
    // เรียก service เพื่ออัปเดตสถานะ และรอรับข้อมูลชุดใหม่ (nextRequests) ที่บันทึกลง localStorage แล้ว
    const nextRequests = await updateRequestStatus(requestId, 'completed');
    // อัปเดต state ให้หน้าจอและแผงสรุปเปลี่ยนตาม
    setRequests(nextRequests);
    setNotice(`เปลี่ยนสถานะคำร้อง ${requestId} เป็นเสร็จสิ้นแล้ว`);
  } catch (error) {
    setNotice(error instanceof Error ? error.message : 'อัปเดตสถานะไม่สำเร็จ');
  }
}

  return (
    <section data-testid="page-dashboard">
      <div className="page-heading">
        <div><p className="eyebrow dark">ROUTED + PERSISTENT</p><h1>Dashboard</h1><p>ติดตามคำร้องจาก URL, Service Layer และ browser storage</p></div>
        <button className="button secondary" data-testid="reset-button" type="button" onClick={handleReset}>Reset Demo Data</button>
      </div>
      {scenario && <p className="lab-scenario" role="status">LAB test scenario: {scenario}</p>}
      {notice && <p className="notice" role="status">{notice}</p>}
      {loadState === 'loading' && <LoadingState />}
      {loadState === 'error' && <ErrorState message={errorMessage} onRetry={handleRetry} />}
      {loadState === 'success' && requests.length === 0 && (
        <section className="state-card" data-testid="empty-state">
          <h2>ยังไม่มีคำร้อง</h2><p>เริ่มสร้างคำร้องแรกของคุณได้เลย</p><Link className="button primary inline" to="/requests/new">สร้างคำร้องใหม่</Link>
        </section>
      )}
      {loadState === 'success' && requests.length > 0 && (
        <>
          <SummaryPanel summary={summary} />
          <section className="panel" aria-labelledby="request-list-title">
            <div className="section-heading"><h2 id="request-list-title">รายการคำร้อง</h2><FilterBar value={statusFilter} onFilterChange={setStatusFilter} /></div>
              <div style={{ marginBottom: '1rem' }}>
                  <input 
                    type="text" 
                    placeholder="ค้นหาจากผู้แจ้งหรือรายละเอียด" 
                    value={searchQuery} 
                    onChange={(e) => setSearchQuery(e.target.value)} 
                    className="form-control"
                  />
                </div>
            <RequestList requests={filteredRequests} onDeleteRequest={handleDelete} onMarkDone={handleMarkDone} />
          </section>
        </>
      )}
    </section>
  );
}

export default DashboardPage;