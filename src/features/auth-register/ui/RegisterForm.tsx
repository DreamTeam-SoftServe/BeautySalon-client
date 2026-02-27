import { useState, useRef, useEffect } from "react";
import { useI18n } from "../../../shared/i18n";
import { useAuth } from "../../../shared/auth/context";
import { ApiError } from "../../../shared/api/client";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import {
  formStyle, gridStyle, serverErrorStyle,
  switchRowStyle, switchTextStyle, switchBtnStyle,
  submitBtnStyle, submitBtnInnerStyle,
} from "./RegisterForm.styles";

interface RegisterFormProps {
  onSuccess: () => void;
  onSwitchLogin: () => void;
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

export function RegisterForm({ onSuccess, onSwitchLogin, animating, animDir }: RegisterFormProps) {
  const { t } = useI18n();
  const { register } = useAuth();
  const a = t.auth;
  const formRef = useRef<HTMLFormElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setMounted(true), 60);
    return () => clearTimeout(timer);
  }, []);

  const [form, setForm] = useState({
    name: "", email: "", phone: "", password: "", confirmPassword: "",
  });
  const [errors, setErrors] = useState<Record<string, string | undefined>>({});
  const [serverError, setServerError] = useState<string | undefined>();
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
    setErrors((er) => ({ ...er, [e.target.name]: undefined }));
    setServerError(undefined);
  };

  const validate = () => {
    const e: Record<string, string> = {};
    if (!form.name.trim()) e.name = a.errors.required;
    if (!form.email.trim()) e.email = a.errors.required;
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) e.email = a.errors.email;
    if (!form.phone.trim()) e.phone = a.errors.required;
    else if (!/^\+?[\d\s\-()]{7,}$/.test(form.phone)) e.phone = a.errors.phone;
    if (!form.password) e.password = a.errors.required;
    else if (form.password.length < 8) e.password = a.errors.passwordMin;
    if (form.confirmPassword !== form.password) e.confirmPassword = a.errors.passwordMatch;
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
      await register({ name: form.name, email: form.email, phone: form.phone, password: form.password });
      onSuccess();
    } catch (err) {
      setServerError(
        err instanceof ApiError && err.status === 409
          ? a.errors.emailTaken : a.errors.server,
      );
      if (formRef.current) shakeElement(formRef.current);
    } finally {
      setSubmitting(false);
    }
  };

  const fieldAnim = (index: number): React.CSSProperties => {
    if (animating && animDir === "out") {
      return {
        opacity: 0,
        transform: "translateY(-12px)",
        transition: "opacity 0.35s ease, transform 0.35s ease",
        transitionDelay: `${index * 0.04}s`,
      };
    }
    return {
      opacity: mounted ? 1 : 0,
      transform: mounted ? "translateY(0)" : "translateY(22px)",
      transition: "opacity 0.5s ease, transform 0.5s ease",
      transitionDelay: `${index * 0.06}s`,
    };
  };

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
      <div style={gridStyle}>
        <div style={fieldAnim(0)}>
          <Input label={a.nameLabel} name="name" value={form.name}
            onChange={handleChange} error={errors.name} placeholder={a.namePh} />
        </div>
        <div style={fieldAnim(1)}>
          <Input label={a.phoneLabel} name="phone" type="tel" value={form.phone}
            onChange={handleChange} error={errors.phone} placeholder={a.phonePh} />
        </div>
        <div style={fieldAnim(2)}>
          <Input label={a.emailLabel} name="email" type="email" value={form.email}
            onChange={handleChange} error={errors.email} placeholder={a.emailPh} />
        </div>
        <div style={fieldAnim(3)}>
          <Input label={a.passwordLabel} name="password" type="password" value={form.password}
            onChange={handleChange} error={errors.password} placeholder={a.passwordPh} />
        </div>
        <div style={fieldAnim(4)}>
          <Input label={a.confirmPasswordLabel} name="confirmPassword" type="password"
            value={form.confirmPassword} onChange={handleChange}
            error={errors.confirmPassword} placeholder={a.confirmPasswordPh} />
        </div>
      </div>

      {serverError && <p style={{ ...serverErrorStyle, ...fieldAnim(5) }}>{serverError}</p>}

      <div style={fieldAnim(6)}>
        <Button type="submit" disabled={submitting} style={submitBtnStyle}>
          <span style={submitBtnInnerStyle}>
            {submitting ? a.registering : a.registerSubmit}
          </span>
        </Button>
      </div>

      <div style={{ ...switchRowStyle, ...fieldAnim(7) }}>
        <span style={switchTextStyle}>{a.hasAccount} </span>
        <button type="button" onClick={onSwitchLogin} style={switchBtnStyle}>
          {a.switchToLogin}
        </button>
      </div>
    </form>
  );
}