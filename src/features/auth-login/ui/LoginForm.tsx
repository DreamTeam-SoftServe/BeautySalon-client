import { useState, useRef } from "react";
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
  getSubmitBtnStyle,
  getOutlineBtnStyle,
} from "./LoginForm.styles";

interface LoginFormProps {
  onSuccess: () => void;
  onSwitchRegister: () => void;
  onGuestContinue: () => void;
  onForgotPassword: () => void;
  animating?: boolean;
  animDir?: "in" | "out";
}

function shakeElement(el: HTMLElement) {
  el.animate(
    [
      { transform: "translateX(0)" },
      { transform: "translateX(-8px)" },
      { transform: "translateX(8px)" },
      { transform: "translateX(-6px)" },
      { transform: "translateX(6px)" },
      { transform: "translateX(-3px)" },
      { transform: "translateX(3px)" },
      { transform: "translateX(0)" },
    ],
    { duration: 450, easing: "ease-in-out" },
  );
}

export function LoginForm({
  onSuccess,
  onSwitchRegister,
  onGuestContinue,
  onForgotPassword,
  animating,
  animDir,
}: LoginFormProps) {

  const { t } = useI18n();
  const { login } = useAuth();
  const a = t.auth;
  const formRef = useRef<HTMLFormElement>(null);

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
      if (formRef.current) shakeElement(formRef.current);
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
      if (formRef.current) shakeElement(formRef.current);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldAnim = (index: number): React.CSSProperties => ({
    opacity: animating && animDir === "out" ? 0 : 1,
    transform:
      animating && animDir === "out" ? "translateY(-12px)" : "translateY(0)",
    transition: `opacity 0.4s ease, transform 0.4s ease`,
    transitionDelay: `${index * 0.07}s`,
  });

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
      <div style={fieldAnim(0)}>
        <Input
          label={a.emailLabel}
          name="email"
          type="email"
          value={form.email}
          onChange={handleChange}
          error={errors.email}
          placeholder={a.emailPh}
        />
      </div>
      <div style={fieldAnim(1)}>
        <Input
          label={a.passwordLabel}
          name="password"
          type="password"
          value={form.password}
          onChange={handleChange}
          error={errors.password}
          placeholder={a.passwordPh}
        />
      </div>

      {serverError && (
        <p style={{ ...serverErrorStyle, ...fieldAnim(2) }}>{serverError}</p>
      )}

      <div style={{ ...forgotRowStyle, ...fieldAnim(2) }}>
        <button type="button" onClick={onForgotPassword} style={forgotBtnStyle}>
          {a.forgotPassword}
        </button>
      </div>

      <div style={fieldAnim(3)}>
        <Button type="submit" disabled={submitting} style={getSubmitBtnStyle()}>
          {submitting ? a.loggingIn : a.loginSubmit}
        </Button>
      </div>

      <div style={{ ...switchRowStyle, ...fieldAnim(4) }}>
        <span style={switchTextStyle}>{a.noAccount} </span>
        <button type="button" onClick={onSwitchRegister} style={switchBtnStyle}>
          {a.switchToRegister}
        </button>
      </div>

      <div style={{ ...dividerRowStyle, ...fieldAnim(5) }}>
        <div style={dividerLineStyle} />
        <span style={dividerTextStyle}>{a.orContinueAs}</span>
        <div style={dividerLineStyle} />
      </div>

      <div style={fieldAnim(6)}>
        <Button type="button" variant="outline" onClick={onGuestContinue} style={getOutlineBtnStyle()}>
          {t.nav.booking}
        </Button>
      </div>
    </form>
  );
}
