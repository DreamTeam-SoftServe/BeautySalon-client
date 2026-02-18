// entities/user/ui/BookingHistoryCard.tsx
import { THEME } from '../../../shared/config/theme';
import type { UserBooking, BookingStatus } from '../model'
import { useI18n } from '../../../shared/i18n'

const STATUS_COLORS: Record<BookingStatus, { bg: string; text: string; border: string }> = {
  pending:   { bg: '#FFF9EC', text: '#B8860B', border: '#F0D080' },
  confirmed: { bg: '#EDF7F0', text: '#2D7A4F', border: '#A8D8B8' },
  completed: { bg: '#F0F0F0', text: '#555555', border: '#CCCCCC' },
  cancelled: { bg: '#FDF2F2', text: '#C0392B', border: '#FADBD8' },
}

interface BookingHistoryCardProps {
  booking: UserBooking
  onCancel?: (id: string) => void
}

export function BookingHistoryCard({ booking, onCancel }: BookingHistoryCardProps) {
  const { t } = useI18n()
  const colors = STATUS_COLORS[booking.status]

  const formattedDate = new Date(booking.date).toLocaleDateString(t.lang, {
    weekday: 'short',
    year:    'numeric',
    month:   'long',
    day:     'numeric',
  })

  return (
    <div style={{
      padding:      '24px 28px',
      background:   THEME.colors.white,
      border:       `1px solid #E8E0D0`,
      display:      'flex',
      gap:          '20px',
      alignItems:   'flex-start',
      transition:   'box-shadow 0.2s',
    }}>
      {/* Date column */}
      <div style={{
        minWidth:       '80px',
        textAlign:      'center',
        paddingRight:   '20px',
        borderRight:    `1px solid #E8E0D0`,
        flexShrink:     0,
      }}>
        <p style={{
          fontFamily: THEME.fonts.display,
          fontSize:   '2rem',
          fontWeight: 400,
          color:      THEME.colors.charcoal,
          margin:     0,
          lineHeight: 1,
        }}>
          {new Date(booking.date).getDate()}
        </p>
        <p style={{
          fontFamily:    THEME.fonts.sans,
          fontSize:      '0.65rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
          color:         THEME.colors.muted,
          margin:        '4px 0 0',
        }}>
          {new Date(booking.date).toLocaleDateString(t.lang, { month: 'short' })}
        </p>
      </div>

      {/* Info */}
      <div style={{ flex: 1 }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '8px' }}>
          <h4 style={{
            fontFamily: THEME.fonts.display,
            fontSize:   '1.15rem',
            fontWeight: 400,
            color:      THEME.colors.charcoal,
            margin:     0,
          }}>
            {booking.serviceName}
          </h4>
          {/* Status badge */}
          <span style={{
            fontFamily:    THEME.fonts.sans,
            fontSize:      '0.65rem',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            padding:       '3px 10px',
            background:    colors.bg,
            color:         colors.text,
            border:        `1px solid ${colors.border}`,
            flexShrink:    0,
          }}>
            {t.account.status[booking.status]}
          </span>
        </div>

        <p style={{
          fontFamily: THEME.fonts.sans,
          fontSize:   '0.8rem',
          color:      THEME.colors.muted,
          margin:     '0 0 4px',
        }}>
          {booking.masterName} · {booking.time} · {formattedDate}
        </p>

        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '12px' }}>
          <span style={{
            fontFamily: THEME.fonts.display,
            fontSize:   '1.1rem',
            color:      THEME.colors.gold,
          }}>
            ${booking.price}
          </span>

          {booking.status === 'pending' || booking.status === 'confirmed' ? (
            <button
              onClick={() => onCancel?.(booking.id)}
              style={{
                background:    'none',
                border:        `1px solid #E8E0D0`,
                fontFamily:    THEME.fonts.sans,
                fontSize:      '0.7rem',
                letterSpacing: '0.08em',
                textTransform: 'uppercase',
                color:         THEME.colors.muted,
                cursor:        'pointer',
                padding:       '6px 14px',
                transition:    'all 0.2s',
              }}
              onMouseEnter={e => {
                e.currentTarget.style.borderColor = THEME.colors.errorText
                e.currentTarget.style.color = THEME.colors.errorText
              }}
              onMouseLeave={e => {
                e.currentTarget.style.borderColor = '#E8E0D0'
                e.currentTarget.style.color = THEME.colors.muted
              }}
            >
              {t.account.cancelBooking}
            </button>
          ) : null}
        </div>
      </div>
    </div>
  )
}
