// shared/ui/ApiErrorMessage.tsx
import { useI18n } from '../../shared/i18n/context'
import { Button } from './Button'
import { THEME } from '../../shared/config/theme';

export function Divider() {
  return <div style={{ height: '1px', background: 'rgba(201,168,76,0.2)' }} />
}

export function Skeleton({ height = '200px' }: { height?: string }) {
  return (
    <div style={{
      width:           '100%',
      height,
      background:      'linear-gradient(90deg, #f0ece4 25%, #e4ddd2 50%, #f0ece4 75%)',
      backgroundSize:  '200% 100%',
      animation:       'shimmer 1.5s infinite',
    }} />
  )
}


interface ApiErrorMessageProps {
  error: Error & { status?: number } | null
  onRetry?: () => void
}

export function ApiErrorMessage({ error, onRetry }: ApiErrorMessageProps) {
  const { t } = useI18n()
  const isNetwork = (error as any)?.status === 0

  return (
    <div style={{
      padding:        '32px',
      background:     THEME.colors.errorBg,
      border:         `1px solid ${THEME.colors.errorBorder}`,
      textAlign:      'center',
      display:        'flex',
      flexDirection:  'column',
      gap:            '16px',
      alignItems:     'center',
    }}>
      <p style={{
        fontFamily:    THEME.fonts.sans,
        fontSize:      '0.75rem',
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color:         THEME.colors.errorText,
      }}>
        {isNetwork ? t.api.networkError : `${t.api.serverError} ${(error as any)?.status ?? ''}`}
      </p>
      <p style={{ fontFamily: THEME.fonts.body, fontSize: '1rem', color: THEME.colors.muted }}>
        {isNetwork ? t.api.networkDetail : error?.message ?? t.booking.errors.server}
      </p>
      {onRetry && (
        <Button onClick={onRetry} variant="outline" style={{ padding: '10px 24px' }}>
          {t.api.retry}
        </Button>
      )}
    </div>
  )
}
