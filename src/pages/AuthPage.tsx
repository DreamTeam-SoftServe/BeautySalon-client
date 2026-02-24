import { useState } from "react";
import { useI18n } from "../shared/i18n";
import { THEME } from "../shared/config/theme";
import { LoginForm } from "../features/auth-login/ui/LoginForm";
import { RegisterForm } from "../features/auth-register/ui/RegisterForm.tsx";
import { useNavigate } from "react-router-dom";

type AuthMode = "login" | "register";

interface AuthPageProps {
  initialMode?: AuthMode;
}

export function AuthPage({ initialMode = "login" }: AuthPageProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const [mode, setMode] = useState<AuthMode>(initialMode);
  const a = t.auth;

  return (
    <div
      style={{
        paddingTop: "80px",
        minHeight: "100vh",
        background: THEME.colors.cream,
      }}
    >
      <div
        style={{
          maxWidth: "520px",
          margin: "0 auto",
          padding: "80px 5% 120px",
        }}
      >
        {/* Header */}
        <div style={{ marginBottom: "48px" }}>
          <p
            style={{
              fontFamily: THEME.fonts.sans,
              fontSize: "0.7rem",
              letterSpacing: "0.25em",
              textTransform: "uppercase",
              color: THEME.colors.gold,
              marginBottom: "12px",
            }}
          >
            Prestige Studio
          </p>
          <h1
            style={{
              fontFamily: THEME.fonts.display,
              fontSize: "clamp(2rem, 5vw, 2.8rem)",
              fontWeight: 400,
              color: THEME.colors.charcoal,
              lineHeight: 1.2,
              margin: "0 0 12px",
            }}
          >
            {mode === "login" ? a.loginTitle : a.registerTitle}
          </h1>
          <p
            style={{
              fontFamily: THEME.fonts.body,
              fontSize: "1rem",
              color: THEME.colors.muted,
              margin: 0,
            }}
          >
            {mode === "login" ? a.loginSubtitle : a.registerSubtitle}
          </p>
          <div
            style={{
              width: "40px",
              height: "1px",
              background: THEME.colors.gold,
              marginTop: "20px",
            }}
          />
        </div>

        {/* Form */}
        {mode === "login" ? (
          <LoginForm
            onSuccess={() => navigate("/account")}
            onSwitchRegister={() => setMode("register")}
            onGuestContinue={() => navigate("/booking")}
          />
        ) : (
          <RegisterForm
            onSuccess={() => navigate("/account")}
            onSwitchLogin={() => setMode("login")}
          />
        )}
      </div>
    </div>
  );
}
