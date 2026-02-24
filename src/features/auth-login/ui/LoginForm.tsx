import { useState } from "react";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";
import { THEME } from "../../../shared/config/theme";
import { ApiError } from "../../../shared/api/client";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchRegister: () => void;
  onGuestContinue: () => void;
}

export function LoginForm({
  onSuccess,
  onSwitchRegister,
  onGuestContinue,
}: LoginFormProps) {
  const { t } = useI18n();
  const { login } = useAuth();
  const a = t.auth;
  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [serverError, setServerError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    setServerError(undefined);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.email.trim()) e.email = a.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = a.errors.email;
    if (!form.password) e.password = a.errors.required;
    return e;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setErrors(errs);
      return;
    }

    setSubmitting(true);
    try {
      await login({ email: form.email, password: form.password });
      onSuccess();
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setServerError(a.errors.invalidCredentials);
      } else {
        setServerError(a.errors.server);
      }
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      style={{ display: "flex", flexDirection: "column", gap: "20px" }}
    >
      <Input
        label={a.emailLabel}
        name="email"
        type="email"
        value={form.email}
        onChange={handleChange}
        error={errors.email}
        placeholder={a.emailPh}
      />
      <Input
        label={a.passwordLabel}
        name="password"
        type="password"
        value={form.password}
        onChange={handleChange}
        error={errors.password}
        placeholder={a.passwordPh}
      />

      {serverError && (
        <p
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.85rem",
            color: THEME.colors.errorText,
            margin: 0,
          }}
        >
          {serverError}
        </p>
      )}

      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: "8px",
        }}
      >
        <button
          type="button"
          onClick={() => {}}
          style={{
            background: "none",
            border: "none",
            fontFamily: THEME.fonts.sans,
            fontSize: "0.75rem",
            color: THEME.colors.muted,
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          {a.forgotPassword}
        </button>
      </div>

      <Button type="submit" disabled={submitting}>
        {submitting ? a.loggingIn : a.loginSubmit}
      </Button>

      <div style={{ textAlign: "center" }}>
        <span
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.8rem",
            color: THEME.colors.muted,
          }}
        >
          {a.noAccount}{" "}
        </span>
        <button
          type="button"
          onClick={onSwitchRegister}
          style={{
            background: "none",
            border: "none",
            fontFamily: THEME.fonts.sans,
            fontSize: "0.8rem",
            color: THEME.colors.gold,
            cursor: "pointer",
            textDecoration: "underline",
            padding: 0,
          }}
        >
          {a.switchToRegister}
        </button>
      </div>

      <div
        style={{
          display: "flex",
          alignItems: "center",
          gap: "12px",
          margin: "4px 0",
        }}
      >
        <div style={{ flex: 1, height: "1px", background: "#E8E0D0" }} />
        <span
          style={{
            fontFamily: THEME.fonts.sans,
            fontSize: "0.7rem",
            color: THEME.colors.muted,
            letterSpacing: "0.05em",
          }}
        >
          {a.orContinueAs}
        </span>
        <div style={{ flex: 1, height: "1px", background: "#E8E0D0" }} />
      </div>

      <Button type="button" variant="outline" onClick={onGuestContinue}>
        {t.nav.booking}
      </Button>
    </form>
  );
}
