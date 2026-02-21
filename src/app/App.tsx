import { Routes, Route, Navigate, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import { THEME } from '../shared/config/theme';
import { Navbar } from '../widgets/Navbar';
import { Footer } from '../widgets/Footer';
import { HomePage } from '../pages/HomePage';
import { ServicesPage } from '../pages/ServicesPage';
import { Divider } from '../shared/ui/Divider';
import { MastersPage } from '../pages/MastersPage';
import { BookingPage } from '../pages/BookingPage';
import { ContactsPage } from '../pages/ContactsPage';
import { AuthPage } from '../pages/AuthPage';
import { AccountPage } from '../pages/AccountPage';
import { useAuth } from '../shared/auth/context';
import { ProtectedRoute } from '../shared/auth/ProtectedRoute';

export function App() {
  const { isLoading } = useAuth();
  const location = useLocation();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [location.pathname]);

  if (isLoading) {
    return (
      <div style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: THEME.colors.cream,
        fontFamily: THEME.fonts.display,
        fontSize: '2rem',
        color: THEME.colors.gold,
        letterSpacing: '0.3em',
      }}>
        Prestige Studio
      </div>
    );
  }

  const activePage = location.pathname.substring(1) || 'home';

  return (
    <div style={{ fontFamily: THEME.fonts.body, background: THEME.colors.offwhite, minHeight: '100vh' }}>
      {}
      <Navbar activePage={activePage as any} />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/services" element={<ServicesPage />} />
          <Route path="/masters" element={<MastersPage />} />
          <Route path="/booking" element={<BookingPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route path="/auth" element={<AuthPage />} />

          <Route element= {<ProtectedRoute />}>
            <Route path="/account" element={<AccountPage />} />
            <Route path="/booking" element={<BookingPage />} />
          </Route>

          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </main>
      <Divider />
      <Footer />
    </div>
  );
}