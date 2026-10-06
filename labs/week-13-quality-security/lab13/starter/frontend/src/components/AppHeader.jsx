import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../auth/AuthContext.jsx';

const links = [
  ['/', 'Dashboard'],
  ['/requests/new', 'New Request'],
  ['/about', 'About'],
];

function AppHeader() {
  const { isStaff, logout } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    logout();
    navigate('/');
  }

  return (
    <header className="site-header">
      <div className="container header-inner">
        <div>
          <p className="eyebrow">ENGSE203 • LAB 13</p>
          <p className="brand">Campus Service Request</p>
        </div>
        <nav aria-label="เมนูหลัก">
          {links.map(([to, label]) => (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              end={to === '/'}
              key={to}
              to={to}
            >
              {label}
            </NavLink>
          ))}
          {isStaff ? (
            <button className="nav-link nav-button" type="button" onClick={handleLogout}>
              ออกจากระบบ (เจ้าหน้าที่ฝ่ายบริการ)
            </button>
          ) : (
            <NavLink
              className={({ isActive }) => `nav-link${isActive ? ' active' : ''}`}
              to="/staff/login"
            >
              เจ้าหน้าที่
            </NavLink>
          )}
        </nav>
      </div>
    </header>
  );
}

export default AppHeader;
