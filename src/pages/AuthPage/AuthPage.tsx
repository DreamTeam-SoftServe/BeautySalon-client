import { useState } from "react";
import { useI18n } from "../../shared/i18n";
import { LoginForm } from "../../features/auth-login/ui/LoginForm";
import { RegisterForm } from "../../features/auth-register/ui/RegisterForm";
import { useNavigate } from "react-router-dom";
import {
  pageStyle, containerStyle, headerStyle,
  eyebrowStyle, titleStyle, subtitleStyle, dividerStyle,
} from "./AuthPage.styles";

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
    <div style={pageStyle}>
      <div style={containerStyle}>
        <div style={headerStyle}>
          <p style={eyebrowStyle}>Prestige Studio</p>
          <h1 style={titleStyle}>
            {mode === "login" ? a.loginTitle : a.registerTitle}
          </h1>
          <p style={subtitleStyle}>
            {mode === "login" ? a.loginSubtitle : a.registerSubtitle}
          </p>
          <div style={dividerStyle} />
        </div>

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