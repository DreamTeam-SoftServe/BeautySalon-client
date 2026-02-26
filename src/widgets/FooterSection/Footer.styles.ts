import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const footerStyle: CSSProperties = {
  background: THEME.colors.charcoal,
  padding: "64px 5% 32px",
  color: THEME.colors.cream,
};

export const innerStyle: CSSProperties = {
  maxWidth: "1200px",
  margin: "0 auto",
};

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "2fr 1fr 1fr",
  gap: "64px",
  marginBottom: "48px",
};

export const brandNameStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.8rem",
  margin: "0 0 8px",
};

export const brandSubStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.6rem",
  letterSpacing: "0.3em",
  color: THEME.colors.gold,
  margin: "0 0 20px",
};

export const taglineStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.95rem",
  color: "rgba(245,240,232,0.6)",
  lineHeight: 1.7,
  maxWidth: "280px",
};

export const localeWrapStyle: CSSProperties = {
  display: "flex",
  gap: "8px",
  marginTop: "32px",
  flexWrap: "wrap",
};

export const getLocaleButtonStyle = (active: boolean): CSSProperties => ({
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  padding: "7px 14px",
  background: active ? THEME.colors.gold : "transparent",
  color: active ? THEME.colors.charcoal : "rgba(245,240,232,0.45)",
  border: `1px solid ${active ? THEME.colors.gold : "rgba(201,168,76,0.25)"}`,
  cursor: "pointer",
  transition: "all 0.25s",
});

export const colTitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "20px",
};

export const navButtonStyle: CSSProperties = {
  background: "none",
  border: "none",
  padding: 0,
  fontFamily: THEME.fonts.body,
  fontSize: "0.95rem",
  color: "rgba(245,240,232,0.7)",
  cursor: "pointer",
  textTransform: "capitalize",
};

export const legalLinkStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.95rem",
  color: "rgba(245,240,232,0.7)",
  textDecoration: "none",
};

export const copyStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  color: "rgba(245,240,232,0.4)",
  textAlign: "center",
  marginTop: "24px",
  letterSpacing: "0.08em",
};