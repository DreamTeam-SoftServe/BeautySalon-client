import { useState, useEffect } from 'react'
import { useI18n } from '../../../shared/i18n'
import { THEME } from '../../../shared/config/theme';
import { Button } from '../../../shared/ui/Button'
import { Skeleton } from '../../../shared/ui/misc'
import { ApiErrorMessage } from '../../../shared/ui/misc'
import { BookingHistoryCard } from '../../../entities/user/ui/BookingHistoryCard'
import { useAuth } from '../../../shared/auth/context';
import { userApi } from '../../../entities/user/api'
import type { UserBooking } from '../../../entities/user/model'
import { useNavigate } from 'react-router';


export function BookingHistory() {
  const { t } = useI18n()
  const { user, isLoggedIn, isLoading: authLoading } = useAuth()
  const navigate = useNavigate();
  const ac = t.account

  const [bookings, setBookings] = useState<UserBooking[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<Error | null>(null)

const effectiveId = localStorage.getItem('clientId') || user?.id;

  const fetchBookings = async () => {
  if (!effectiveId) return;
  
  setLoading(true)
  setError(null)
  try {
    const response = await userApi.getMyBookings(effectiveId)
    const data = (response as any).data || response; 
    setBookings(Array.isArray(data) ? data : []);
  } catch (err: any) {
    setError(err)
  } finally {
    setLoading(false)
  }
}

  useEffect(() => {
    if (!authLoading && isLoggedIn && effectiveId) {
      fetchBookings()
    }
  }, [authLoading, isLoggedIn, effectiveId])

  const [cancelling, setCancelling] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    if (!window.confirm(ac.cancelConfirm)) return
    setCancelling(id)
    try {
      await userApi.cancelBooking(id)
      await fetchBookings() 
      alert('Запис успішно скасовано');
    } catch (error) {
      console.error('Cancellation error:', error)
    } finally {
      setCancelling(null)
    }
  }

  const isWaiting = authLoading || loading

  return (
    <div>
      <h3 style={{
        fontFamily:   THEME.fonts.display,
        fontSize:     '1.5rem',
        fontWeight:   400,
        color:        THEME.colors.charcoal,
        marginBottom: '32px',
      }}>
        {ac.bookingsTitle}
      </h3>

      {isWaiting && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[1, 2, 3].map(i => <Skeleton key={i} height="100px" />)}
        </div>
      )}

      {error && !isWaiting && (
        <ApiErrorMessage error={error} onRetry={fetchBookings} />
      )}

      {!isWaiting && !error && bookings.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <p style={{
            fontFamily:   THEME.fonts.display,
            fontSize:     '1.5rem',
            color:        THEME.colors.charcoal,
            marginBottom: '12px',
          }}>
            {ac.bookingsEmpty}
          </p>
          <p style={{
            fontFamily:   THEME.fonts.body,
            fontSize:     '1rem',
            color:        THEME.colors.muted,
            marginBottom: '32px',
          }}>
            {ac.bookingsEmptyBody}
          </p>
          <Button onClick={() => navigate('/booking')}>{ac.bookNow}</Button>
        </div>
      )}

      {!isWaiting && bookings.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {bookings.map(b => (
            <div
              key={b.id}
              style={{ opacity: cancelling === b.id ? 0.5 : 1, transition: 'opacity 0.2s' }}
            >
              <BookingHistoryCard booking={b} onCancel={handleCancel} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}