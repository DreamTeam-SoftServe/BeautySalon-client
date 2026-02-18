import { THEME } from '../../shared/config/theme';
import type { ReactNode, CSSProperties, MouseEvent } from 'react';

type ButtonVariant = 'primary' | 'outline' | 'ghost' | 'dark';

interface ButtonProps {
  children: ReactNode;
  variant?: ButtonVariant; 
  type?: 'button' | 'submit' | 'reset'; 
  onClick?: (e: MouseEvent<HTMLButtonElement>) => void; 
  disabled?: boolean; 
  extraStyle?: CSSProperties; 
  style?: CSSProperties;
  className?: string;
}


export function Button({ children, variant = "primary", onClick, type = "button", disabled, style: extraStyle }: ButtonProps) {
  const base = {
    fontFamily: THEME.fonts.sans,
    fontWeight: 500,
    fontSize: "0.875rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
    padding: "14px 36px",
    border: "none",
    cursor: disabled ? "not-allowed" : "pointer",
    transition: "all 0.3s ease",
    display: "inline-flex",
    alignItems: "center",
    gap: "8px",
    opacity: disabled ? 0.6 : 1,
  };
  const variants = {
    primary: {
      background: THEME.colors.gold,
      color: THEME.colors.charcoal,
    },
    outline: {
      background: "transparent",
      color: THEME.colors.charcoal,
      border: `1.5px solid ${THEME.colors.charcoal}`,
    },
    ghost: {
      background: "transparent",
      color: THEME.colors.gold,
      border: `1.5px solid ${THEME.colors.gold}`,
    },
    dark: {
      background: THEME.colors.charcoal,
      color: THEME.colors.cream,
    },
  };
  return (
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      style={{ ...base, ...variants[variant], ...extraStyle }}
      onMouseEnter={(e) => {
        if (disabled) return;
        if (variant === "primary") e.currentTarget.style.background = "#B8963E";
        if (variant === "outline") { e.currentTarget.style.background = THEME.colors.charcoal; e.currentTarget.style.color = THEME.colors.cream; }
        if (variant === "ghost") { e.currentTarget.style.background = THEME.colors.gold; e.currentTarget.style.color = THEME.colors.charcoal; }
        if (variant === "dark") e.currentTarget.style.background = "#333";
      }}
      onMouseLeave={(e) => {
        if (disabled) return;
        Object.assign(e.currentTarget.style, variants[variant]);
      }}
    >
      {children}
    </button>
  );
}