import { useState } from "react";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";
import { ApiError } from "../../../shared/api/client";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import {
  formStyle,
  serverErrorStyle,
  forgotRowStyle,
  forgotBtnStyle,
  switchRowStyle,
  switchTextStyle,
  switchBtnStyle,
  dividerRowStyle,
  dividerLineStyle,
  dividerTextStyle,
} from "./LoginForm.styles";

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
      setServerError(
        err instanceof ApiError && err.status === 401
          ? a.errors.invalidCredentials
          : a.errors.server,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
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

      {serverError && <p style={serverErrorStyle}>{serverError}</p>}

      <div style={forgotRowStyle}>
        <button type="button" onClick={() => {}} style={forgotBtnStyle}>
          {a.forgotPassword}
        </button>
      </div>

      <Button
        type="submit"
        disabled={submitting}
        style={{
          marginTop: "10px",
          width: "106.5%",
          textAlign: "center",
          justifyContent: "center",
          display: "flex",
        }}
      >
        {submitting ? a.loggingIn : a.loginSubmit}
      </Button>

      <div style={switchRowStyle}>
        <span style={switchTextStyle}>{a.noAccount} </span>
        <button type="button" onClick={onSwitchRegister} style={switchBtnStyle}>
          {a.switchToRegister}
        </button>
      </div>

      <div style={dividerRowStyle}>
        <div style={dividerLineStyle} />
        <span style={dividerTextStyle}>{a.orContinueAs}</span>
        <div style={dividerLineStyle} />
      </div>

      <Button
        type="button"
        variant="outline"
        onClick={onGuestContinue}
        style={{
          width: "106.5%",
          textAlign: "center",
          justifyContent: "centАer",
          display: "flex",
        }}
      >
        {t.nav.booking}
      </Button>
    </form>
  );
}
