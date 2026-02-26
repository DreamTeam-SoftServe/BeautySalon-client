import { useState, useEffect } from "react";
import { useI18n } from "../../shared/i18n";
import { LoginForm } from "../../features/auth-login/ui/LoginForm";
import { RegisterForm } from "../../features/auth-register/ui/RegisterForm";
import { ForgotPasswordForm } from "../../features/auth-forgot/ui/ForgotPasswordForm";
import { useNavigate } from "react-router-dom";
import {
  pageStyle, containerStyle, headerStyle,
  eyebrowStyle, titleStyle, subtitleStyle, dividerStyle,
} from "./AuthPage.styles";

type AuthMode = "login" | "register" | "forgot";

interface AuthPageProps {
  initialMode?: AuthMode;
}

export function AuthPage({ initialMode = "login" }: AuthPageProps) {
  const { t } = useI18n();
  const navigate = useNavigate();
  const a = t.auth;

  const [mode, setMode] = useState<AuthMode>(initialMode);
  const [visibleMode, setVisibleMode] = useState<AuthMode>(initialMode);
  const [phase, setPhase] = useState<"idle" | "out" | "in">("idle");

  const switchMode = (next: AuthMode) => {
    if (next === mode || phase !== "idle") return;
    setMode(next);
    setPhase("out");
  };

  useEffect(() => {
    if (phase === "out") {
      const t1 = setTimeout(() => {
        setVisibleMode(mode);
        setPhase("in");
      }, 350);
      return () => clearTimeout(t1);
    }
    if (phase === "in") {
      const t2 = setTimeout(() => setPhase("idle"), 500);
      return () => clearTimeout(t2);
    }
  }, [phase, mode]);

  const formWrapStyle: React.CSSProperties = {
    opacity: phase === "out" ? 0 : 1,
    transform: phase === "out" ? "translateY(-16px)" : "translateY(0)",
    transition: phase === "out"
      ? "opacity 0.35s ease, transform 0.35s ease"
      : "opacity 0.4s ease 0.05s, transform 0.4s ease 0.05s",
  };

  const headerAnimStyle: React.CSSProperties = {
    opacity: phase === "out" ? 0 : 1,
    transform: phase === "out" ? "translateY(-10px)" : "translateY(0)",
    transition: "opacity 0.3s ease, transform 0.3s ease",
  };

  const getTitle = () => {
    if (visibleMode === "login") return a.loginTitle;
    if (visibleMode === "register") return a.registerTitle;
    return t.auth.forgotPassw.remembTitle;
  };

  const getSubtitle = () => {
    if (visibleMode === "login") return a.loginSubtitle;
    if (visibleMode === "register") return a.registerSubtitle;
    return t.auth.forgotPassw.resetSubtitle;
  };

  return (
    <div style={pageStyle}>
      <div style={containerStyle}>

        <div style={{ ...headerStyle, ...headerAnimStyle }}>
          <p style={eyebrowStyle}>Prestige Studio</p>
          <h1 style={titleStyle}>{getTitle()}</h1>
          <p style={subtitleStyle}>{getSubtitle()}</p>
          <div style={dividerStyle} />
        </div>

        <div style={formWrapStyle}>
          {visibleMode === "login" ? (
            <LoginForm
              onSuccess={() => navigate("/account")}
              onSwitchRegister={() => switchMode("register")}
              onGuestContinue={() => navigate("/booking")}
              onForgotPassword={() => switchMode("forgot")}
              animating={phase !== "idle"}
              animDir={phase === "out" ? "out" : "in"}
            />
          ) : visibleMode === "register" ? (
            <RegisterForm
              onSuccess={() => navigate("/account")}
              onSwitchLogin={() => switchMode("login")}
              animating={phase !== "idle"}
              animDir={phase === "out" ? "out" : "in"}
            />
          ) : (
            <ForgotPasswordForm
              onBack={() => switchMode("login")}
              animating={phase !== "idle"}
              animDir={phase === "out" ? "out" : "in"}
            />
          )}
        </div>

      </div>
    </div>
  );
}