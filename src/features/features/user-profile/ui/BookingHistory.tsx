// features/user-profile/ui/BookingHistory.tsx
import { useState } from 'react'
import { useI18n } from '../../../../shared/i18n'
import { THEME } from '../../../../shared/config/theme';
import { useQuery } from '../../../../shared/lib/useQuery'
import { withFallback } from '../../../../shared/lib/withFallback'
import { Button } from '../../../../shared/ui/Button'
import { Skeleton } from '../../../../shared/ui/misc'
import { ApiErrorMessage } from '../../../../shared/ui/misc'
import { userApi } from '../../../../entities/user/api'
import { BookingHistoryCard } from '../../../../entities/user/ui/BookingHistoryCard'


import type { PageId } from '../../../../app/types'

const MOCK_BOOKINGS = [
  {
    id: 'b1', bookingId: 'LM-001', serviceName: 'Signature Cut',
    masterName: 'Isabelle Moreau', date: '2025-03-15', time: '14:00',
    status: 'confirmed' as const, price: 85,
  },
  {
    id: 'b2', bookingId: 'LM-002', serviceName: 'Balayage & Highlights',
    masterName: 'Isabelle Moreau', date: '2025-02-01', time: '10:00',
    status: 'completed' as const, price: 220,
  },
  {
    id: 'b3', bookingId: 'LM-003', serviceName: 'Keratin Ritual',
    masterName: 'Naomi Chen', date: '2025-01-10', time: '11:00',
    status: 'completed' as const, price: 250,
  },
]

interface BookingHistoryProps {
  onNavigate: (p: PageId) => void
}

export function BookingHistory({ onNavigate }: BookingHistoryProps) {
  const { t } = useI18n()
  const ac = t.account

  const { data: bookings, loading, error, refetch } = useQuery(() =>
    withFallback(userApi.getMyBookings, MOCK_BOOKINGS)
  )
  const [cancelling, setCancelling] = useState<string | null>(null)

  const handleCancel = async (id: string) => {
    if (!window.confirm(ac.cancelConfirm)) return
    setCancelling(id)
    try {
      await userApi.cancelBooking(id)
      refetch()
    } catch {
      // error handled gracefully — refetch will show current state
    } finally {
      setCancelling(null)
    }
  }

  return (
    <div>
      <h3 style={{ fontFamily: THEME.fonts.display, fontSize: '1.5rem', fontWeight: 400, color: THEME.colors.charcoal, marginBottom: '32px' }}>
        {ac.bookingsTitle}
      </h3>

      {loading && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {[1, 2, 3].map(i => <Skeleton key={i} height="100px" />)}
        </div>
      )}

      {error && !loading && <ApiErrorMessage error={error} onRetry={refetch} />}

      {!loading && bookings && bookings.length === 0 && (
        <div style={{ textAlign: 'center', padding: '80px 40px' }}>
          <p style={{ fontFamily: THEME.fonts.display, fontSize: '1.5rem', color: THEME.colors.charcoal, marginBottom: '12px' }}>
            {ac.bookingsEmpty}
          </p>
          <p style={{ fontFamily: THEME.fonts.body, fontSize: '1rem', color: THEME.colors.muted, marginBottom: '32px' }}>
            {ac.bookingsEmptyBody}
          </p>
          <Button onClick={() => onNavigate('booking')}>{ac.bookNow}</Button>
        </div>
      )}

      {!loading && bookings && bookings.length > 0 && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
          {bookings.map(b => (
            <div key={b.id} style={{ opacity: cancelling === b.id ? 0.5 : 1, transition: 'opacity 0.2s' }}>
              <BookingHistoryCard booking={b} onCancel={handleCancel} />
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
