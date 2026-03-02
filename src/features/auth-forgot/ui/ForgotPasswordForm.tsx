import { useState, useRef } from "react";
import { useI18n } from "../../../shared/i18n";
import { Button } from "../../../shared/ui/Button";
import { Input } from "../../../shared/ui/Input";
import { api } from "../../../shared/api/api";
import {
  formStyle, serverErrorStyle, switchRowStyle,
  switchTextStyle, switchBtnStyle,
} from "../../auth-login/ui/LoginForm.styles";

interface ForgotPasswordFormProps {
  onBack: () => void;
  animating?: boolean;
  animDir?: "in" | "out";
}

type Status = "idle" | "loading" | "sent" | "error";

export function ForgotPasswordForm({ onBack, animating, animDir }: ForgotPasswordFormProps) {
  const { t } = useI18n();
  const formRef = useRef<HTMLFormElement>(null);
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>();
  const [status, setStatus] = useState<Status>("idle");

  const fieldAnim = (index: number): React.CSSProperties => ({
    opacity: animating && animDir === "out" ? 0 : 1,
    transform: animating && animDir === "out" ? "translateY(-12px)" : "translateY(0)",
    transition: "opacity 0.4s ease, transform 0.4s ease",
    transitionDelay: `${index * 0.07}s`,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) { setError(t.auth.errors.required); return; }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setError(t.auth.errors.email); return; }
    setStatus("loading");
    try {
      await api.forgotPassword(email);
      setStatus("sent");
    } catch {
      setStatus("error");
      setError(t.auth.errors.server);
    }
  };

  if (status === "sent") {
    return (
      <div style={{ textAlign: "center", padding: "20px 0" }}>
        <div style={{ fontSize: "3rem", marginBottom: "16px", color: "#C9A84C" }}>✉️</div>
        <p style={{ fontSize: "1rem", lineHeight: 1.7, marginBottom: "32px", color: "#6B6355" }}>
          {t.auth.forgotPassw.instrtuctionsTitle}<strong>{email}</strong>.
          {t.auth.forgotPassw.instrtuctionsSubtitle}
        </p>
        <Button onClick={onBack} variant="outline" fullWidth>{t.auth.forgotPassw.exit}</Button>
      </div>
    );
  }

  return (
    <form ref={formRef} onSubmit={handleSubmit} style={formStyle}>
      <div style={fieldAnim(0)}>
        <Input
          label={t.auth.emailLabel} name="email" type="email"
          value={email}
          onChange={(e) => { setEmail(e.target.value); setError(undefined); }}
          error={error} placeholder={t.auth.emailPh}
        />
      </div>

      {status === "error" && <p style={{ ...serverErrorStyle, ...fieldAnim(1) }}>{error}</p>}

      <div style={fieldAnim(2)}>
        <Button type="submit" disabled={status === "loading"} fullWidth>
          {status === "loading" ? t.auth.forgotPassw.status.sending : t.auth.forgotPassw.resetButton}
        </Button>
      </div>

      <div style={{ ...switchRowStyle, ...fieldAnim(3) }}>
        <span style={switchTextStyle}>{t.auth.forgotPassw.remembTitle} </span>
        <button type="button" onClick={onBack} style={switchBtnStyle}>
          {t.auth.forgotPassw.returnButton}
        </button>
      </div>
    </form>
  );
}