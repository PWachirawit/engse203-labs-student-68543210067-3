import { Route, Routes } from 'react-router-dom';
import AboutPage from './pages/AboutPage.jsx';
import AppLayout from './pages/AppLayout.jsx';
import DashboardPage from './pages/DashboardPage.jsx';
import NewRequestPage from './pages/NewRequestPage.jsx';
import NotFoundPage from './pages/NotFoundPage.jsx';
import RequestDetailPage from './pages/RequestDetailPage.jsx';
import StaffLoginPage from './pages/StaffLoginPage.jsx';
import { AuthProvider } from './auth/AuthContext.jsx';

function App() {
  return (
    <AuthProvider>
      <Routes>
        <Route element={<AppLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="requests/new" element={<NewRequestPage />} />
          <Route path="requests/:requestId" element={<RequestDetailPage />} />
          <Route path="about" element={<AboutPage />} />
          <Route path="staff/login" element={<StaffLoginPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>
      </Routes>
    </AuthProvider>
  );
}

export default App;
