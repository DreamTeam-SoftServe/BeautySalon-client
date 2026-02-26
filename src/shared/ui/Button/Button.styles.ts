import { THEME } from "../../config/theme";
import type { CSSProperties } from "react";

export const base: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontWeight: 500,
  fontSize: "0.875rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  padding: "14px 36px",
  border: "none",
  cursor: "pointer",
  transition: "all 0.3s ease",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
};

export const variants: Record<string, CSSProperties> = {
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

export const hoverVariants: Record<string, CSSProperties> = {
  primary: { background: "#B8963E" },
  outline: {
    background: THEME.colors.charcoal,
    color: THEME.colors.cream,
  },
  ghost: {
    background: THEME.colors.gold,
    color: THEME.colors.charcoal,
  },
  dark: { background: "#333" },
};

export const disabledStyle: CSSProperties = {
  cursor: "not-allowed",
  opacity: 0.6,
};