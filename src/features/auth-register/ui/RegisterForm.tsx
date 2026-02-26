import { useState } from "react";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";
import { ApiError } from "../../../shared/api/client";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import {
  formStyle,
  gridStyle,
  serverErrorStyle,
  switchRowStyle,
  switchTextStyle,
  switchBtnStyle,
} from "./RegisterForm.styles";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchLogin: () => void;
}

export function RegisterForm({ onSuccess, onSwitchLogin }: RegisterFormProps) {
  const { t } = useI18n();
  const { register } = useAuth();
  const a = t.auth;

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });
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
    if (!form.name.trim()) e.name = a.errors.required;
    if (!form.email.trim()) e.email = a.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
      e.email = a.errors.email;
    if (!form.phone.trim()) e.phone = a.errors.required;
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = a.errors.phone;
    if (!form.password) e.password = a.errors.required;
    else if (form.password.length < 8) e.password = a.errors.passwordMin;
    if (form.confirmPassword !== form.password)
      e.confirmPassword = a.errors.passwordMatch;
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
      await register({
        name: form.name,
        email: form.email,
        phone: form.phone,
        password: form.password,
      });
      onSuccess();
    } catch (err) {
      setServerError(
        err instanceof ApiError && err.status === 409
          ? a.errors.emailTaken
          : a.errors.server,
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={formStyle}>
      <div style={gridStyle}>
        <Input
          label={a.nameLabel}
          name="name"
          value={form.name}
          onChange={handleChange}
          error={errors.name}
          placeholder={a.namePh}
        />
        <Input
          label={a.phoneLabel}
          name="phone"
          type="tel"
          value={form.phone}
          onChange={handleChange}
          error={errors.phone}
          placeholder={a.phonePh}
        />
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
        <Input
          label={a.confirmPasswordLabel}
          name="confirmPassword"
          type="password"
          value={form.confirmPassword}
          onChange={handleChange}
          error={errors.confirmPassword}
          placeholder={a.confirmPasswordPh}
        />
      </div>

      {serverError && <p style={serverErrorStyle}>{serverError}</p>}

      <Button type="submit" disabled={submitting} style={{ width: "106.5%" }}>
        <span style={{ display: "block", width: "100%", textAlign: "center" }}>
          {submitting ? a.registering : a.registerSubmit}
        </span>
      </Button>

      <div style={switchRowStyle}>
        <span style={switchTextStyle}>{a.hasAccount} </span>
        <button type="button" onClick={onSwitchLogin} style={switchBtnStyle}>
          {a.switchToLogin}
        </button>
      </div>
    </form>
  );
}
