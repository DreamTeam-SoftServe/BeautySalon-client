// features/auth-register/ui/RegisterForm.tsx
import { useState } from 'react'
import { useI18n } from '../../../../shared/i18n'
import { useAuth } from '../../../../shared/auth/context';
import { THEME } from '../../../../shared/config/theme';
import { ApiError } from '../../../../shared/api/api'
import { Button } from '../../../../shared/ui/Button'
import { Input } from '../../../../shared/ui/Input'
import type { PageId } from '../../../../app/types'

interface RegisterFormProps {
  onSuccess:     (page: PageId) => void
  onSwitchLogin: () => void
}

export function RegisterForm({ onSuccess, onSwitchLogin }: RegisterFormProps) {
  const { t } = useI18n()
  const { register } = useAuth()
  const a = t.auth

  const [form, setForm] = useState({
    name: '', email: '', phone: '', password: '', confirmPassword: '',
  })
  
  const [errors, setErrors]           = useState<Record<string, string | undefined>>({})
  const [serverError, setServerError] = useState<string | undefined>()
  const [submitting, setSubmitting]   = useState(false)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(f => ({ ...f, [e.target.name]: e.target.value }))
    
    setErrors(er => ({ ...er, [e.target.name]: undefined }))
    setServerError(undefined)
  }

  const validate = () => {
    const e: Record<string, string> = {}
    if (!form.name.trim())                                     e.name    = a.errors.required
    if (!form.email.trim())                                    e.email   = a.errors.required
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))   e.email   = a.errors.email
    if (!form.phone.trim())                                    e.phone   = a.errors.required
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone))          e.phone   = a.errors.phone
    if (!form.password)                                        e.password = a.errors.required
    else if (form.password.length < 8)                         e.password = a.errors.passwordMin
    if (form.confirmPassword !== form.password)                e.confirmPassword = a.errors.passwordMatch
    return e
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validate()
    if (Object.keys(errs).length) { setErrors(errs); return }

    setSubmitting(true)
    try {
      await register({
        name:     form.name,
        email:    form.email,
        phone:    form.phone,
        password: form.password,
      })
      onSuccess('account')
    } catch (err) {
      if (err instanceof ApiError && err.status === 409) {
        setServerError(a.errors.emailTaken)
      } else {
        setServerError(a.errors.server)
      }
    } finally {
      setSubmitting(false)
    }
  }

  const grid2: React.CSSProperties = {
    display: 'grid',
    gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
    gap: '20px',
  }

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '26px', maxWidth: '500px', margin: '0 auto' }}>
      <div style={grid2}>
        <Input label={a.nameLabel}  name="name"  value={form.name}  onChange={handleChange} error={errors.name}  placeholder={a.namePh} />
        <Input label={a.phoneLabel} name="phone" type="tel" value={form.phone} onChange={handleChange} error={errors.phone} placeholder={a.phonePh} />
      </div>
      <Input label={a.emailLabel} name="email" type="email" value={form.email} onChange={handleChange} error={errors.email} placeholder={a.emailPh} />
      <div style={grid2}>
        <Input label={a.passwordLabel}        name="password"        type="password" value={form.password}        onChange={handleChange} error={errors.password}        placeholder={a.passwordPh} />
        <Input label={a.confirmPasswordLabel} name="confirmPassword" type="password" value={form.confirmPassword} onChange={handleChange} error={errors.confirmPassword} placeholder={a.confirmPasswordPh} />
      </div>

      {serverError && (
        <p style={{ fontFamily: THEME.fonts.sans, fontSize: '0.85rem', color: THEME.colors.errorText, margin: 0 }}>
          {serverError}
        </p>
      )}

      <Button type="submit" disabled={submitting}>
        {submitting ? a.registering : a.registerSubmit}
      </Button>

      <div style={{ textAlign: 'center' }}>
        <span style={{ fontFamily: THEME.fonts.sans, fontSize: '0.8rem', color: THEME.colors.muted }}>
          {a.hasAccount}{' '}
        </span>
        <button type="button" onClick={onSwitchLogin} style={{ background: 'none', border: 'none', fontFamily: THEME.fonts.sans, fontSize: '0.8rem', color: THEME.colors.gold, cursor: 'pointer', textDecoration: 'underline', padding: 0 }}>
          {a.switchToLogin}
        </button>
      </div>
    </form>
  )
}