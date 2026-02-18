import { useState, type JSX } from 'react';
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
import { useI18n } from '../shared/i18n';
import { useAuth } from '../shared/auth/context';
import type { PageId } from './types'


export function App() {
  const [page, setPage] = useState<PageId>('home')
  const { t } = useI18n()
  const { isLoading } = useAuth()

  const navigate = (p: PageId) => {
    setPage(p)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  if (isLoading) {
    return (
      <div style={{
        minHeight:      '100vh',
        display:        'flex',
        alignItems:     'center',
        justifyContent: 'center',
        background:     THEME.colors.cream,
        fontFamily:     THEME.fonts.display,
        fontSize:       '2rem',
        color:          THEME.colors.gold,
        letterSpacing:  '0.3em',
      }}>
        LUMIÈRE
      </div>
    )
  }

  const pages: Record<PageId, JSX.Element> = {
    home:     <HomePage     onNavigate={navigate} />,
    services: <ServicesPage onNavigate={navigate} />,
    masters:  <MastersPage  onNavigate={navigate} />,
    booking:  <BookingPage />,
    contacts: <ContactsPage />,
    auth:     <AuthPage     onNavigate={navigate} />,
    account:  <AccountPage  onNavigate={navigate} />,
  }

  return (
    <div style={{ fontFamily: THEME.fonts.body, background: THEME.colors.offwhite, minHeight: '100vh' }}>


      <Navbar activePage={page} onNavigate={navigate} />
      <main>{pages[page]}</main>
      <Divider />
      <Footer onNavigate={navigate} />
    </div>
  )
}
