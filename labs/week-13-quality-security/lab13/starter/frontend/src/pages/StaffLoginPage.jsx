import { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

function StaffLoginPage() {
  const { isStaff, login } = useAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    setSubmitting(true);
    setError('');
    try {
      await login(email, password);
      navigate(location.state?.from ?? '/', { replace: true });
    } catch (loginError) {
      setError(loginError instanceof Error ? loginError.message : 'เข้าสู่ระบบไม่สำเร็จ');
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <section data-testid="page-staff-login">
      <div className="page-heading">
        <div>
          <p className="eyebrow dark">STAFF ONLY</p>
          <h1>เข้าสู่ระบบเจ้าหน้าที่</h1>
          <p>เปลี่ยนสถานะและลบคำร้องได้หลังเข้าสู่ระบบ</p>
        </div>
      </div>
      {isStaff ? (
        <section className="panel form-panel" role="status">
          <h2>เข้าสู่ระบบแล้ว</h2>
          <p>คุณสามารถจัดการสถานะและลบคำร้องได้จาก Dashboard</p>
          <button className="button primary" type="button" onClick={() => navigate('/')}>
            ไปที่ Dashboard
          </button>
        </section>
      ) : (
        <form className="panel form-panel staff-login-form" onSubmit={handleSubmit}>
          <div className="field">
            <label htmlFor="staff-email">อีเมล</label>
            <input
              autoComplete="username"
              id="staff-email"
              onChange={(event) => setEmail(event.target.value)}
              required
              type="email"
              value={email}
            />
          </div>
          <div className="field">
            <label htmlFor="staff-password">รหัสผ่าน</label>
            <input
              autoComplete="current-password"
              id="staff-password"
              onChange={(event) => setPassword(event.target.value)}
              required
              type="password"
              value={password}
            />
          </div>
          {error && <p className="error" role="alert">{error}</p>}
          <button className="button primary login-submit" disabled={submitting} type="submit">
            {submitting ? 'กำลังเข้าสู่ระบบ…' : 'เข้าสู่ระบบ'}
          </button>
        </form>
      )}
    </section>
  );
}

export default StaffLoginPage;
