import { useState } from 'react'
import { useI18n } from '../shared/i18n'
import { useAuth } from '../shared/auth/context.tsx'
import { THEME } from '../shared/config/theme';
import { Button } from '../shared/ui/Button'
import { UserAvatar } from '../entities/user/ui/UserAvatar'
import { BookingHistory } from '../features/user-profile/ui/BookingHistory.tsx'
import { ProfileForm } from '../features/user-profile/ui/ProfileForm.tsx'
import { useNavigate } from 'react-router-dom';

type Tab = 'profile' | 'bookings'


export function AccountPage() {
  const { t } = useI18n()
  const { user, logout, isLoading } = useAuth()
  const [tab, setTab] = useState<Tab>('profile')
  const navigate = useNavigate();
  const [loggingOut, setLoggingOut] = useState(false)
  const ac = t.account

  if (isLoading || !user) {
    return (
      <div style={{ paddingTop: '80px', minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
        <div style={{ fontFamily: THEME.fonts.sans, color: THEME.colors.muted, letterSpacing: '0.1em' }}>…</div>
      </div>
    )
  }

  const handleLogout = async () => {
    setLoggingOut(true)
    await logout()
    navigate('/')
  }

  const tabStyle = (id: Tab): React.CSSProperties => ({
    fontFamily: THEME.fonts.sans,
    fontSize: '0.75rem',
    letterSpacing: '0.15em',
    textTransform: 'uppercase',
    padding: '12px 0',
    background: 'none',
    border: 'none',
    borderBottom: tab === id ? `2px solid ${THEME.colors.gold}` : '2px solid transparent',
    color: tab === id ? THEME.colors.charcoal : THEME.colors.muted,
    cursor: 'pointer',
    transition: 'all 0.2s',
  })

  return (
    <div style={{ paddingTop: '80px', minHeight: '100vh', background: THEME.colors.offwhite }}>

      {/* Page header */}
      <div style={{ background: THEME.colors.cream, padding: '60px 5% 0', borderBottom: '1px solid rgba(201,168,76,0.2)' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>

          {/* User info row */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '40px', flexWrap: 'wrap', gap: '20px' }}>
            <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
              <UserAvatar user={user} size={64} />
              <div>
                <p style={{ fontFamily: THEME.fonts.sans, fontSize: '0.65rem', letterSpacing: '0.25em', textTransform: 'uppercase', color: THEME.colors.gold, margin: '0 0 4px' }}>
                  {ac.pageEyebrow}
                </p>
                <h1 style={{ fontFamily: THEME.fonts.display, fontSize: '1.8rem', fontWeight: 400, color: THEME.colors.charcoal, margin: 0 }}>
                  {user.name}
                </h1>
                <p style={{ fontFamily: THEME.fonts.sans, fontSize: '0.8rem', color: THEME.colors.muted, margin: '4px 0 0' }}>
                  {user.email}
                </p>
              </div>
            </div>

            <Button
              variant="outline"
              onClick={handleLogout}
              disabled={loggingOut}
              style={{ padding: '10px 20px', fontSize: '0.75rem' }}
            >
              {loggingOut ? ac.loggingOut : ac.logout}
            </Button>
          </div>

          {/* Tabs */}
          <div style={{ display: 'flex', gap: '32px', borderBottom: '1px solid rgba(201,168,76,0.15)' }}>
            <button style={tabStyle('profile')}  onClick={() => setTab('profile')}>
              {ac.tabProfile}
            </button>
            <button style={tabStyle('bookings')} onClick={() => setTab('bookings')}>
              {ac.tabBookings}
            </button>
          </div>
        </div>
      </div>

      {/* Tab content */}
      <div style={{ maxWidth: '1000px', margin: '0 auto', padding: '60px 5% 120px' }}>
        {tab === 'profile'  && <ProfileForm/>}
        {tab === 'bookings' && <BookingHistory/>}
      </div>
    </div>
  )
}
