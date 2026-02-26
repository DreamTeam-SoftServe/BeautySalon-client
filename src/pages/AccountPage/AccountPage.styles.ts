import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const pageStyle: CSSProperties = {
  paddingTop: "80px",
  minHeight: "100vh",
  background: THEME.colors.offwhite,
};

export const loadingStyle: CSSProperties = {
  paddingTop: "80px",
  minHeight: "100vh",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
};

export const loadingTextStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  color: THEME.colors.muted,
  letterSpacing: "0.1em",
};

export const headerStyle: CSSProperties = {
  background: THEME.colors.cream,
  padding: "60px 5% 0",
  borderBottom: "1px solid rgba(201,168,76,0.2)",
};

export const headerInnerStyle: CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
};

export const userRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  marginBottom: "40px",
  flexWrap: "wrap",
  gap: "20px",
};

export const userInfoStyle: CSSProperties = {
  display: "flex",
  gap: "20px",
  alignItems: "center",
};

export const eyebrowStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  margin: "0 0 4px",
};

export const nameStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.8rem",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  margin: 0,
};

export const emailStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  color: THEME.colors.muted,
  margin: "4px 0 0",
};

export const actionsStyle: CSSProperties = {
  display: "flex",
  gap: "12px",
  alignItems: "center",
  flexWrap: "wrap",
};

export const adminLinkStyle: CSSProperties = {
  padding: "10px 20px",
  fontSize: "0.75rem",
  fontFamily: THEME.fonts.sans,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.2s",
  background: THEME.colors.charcoal,
  color: THEME.colors.white,
};

export const masterLinkStyle: CSSProperties = {
  padding: "10px 20px",
  fontSize: "0.75rem",
  fontFamily: THEME.fonts.sans,
  letterSpacing: "0.1em",
  textTransform: "uppercase",
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: "8px",
  transition: "all 0.2s",
  background: THEME.colors.gold,
  color: THEME.colors.white,
};

export const tabsRowStyle: CSSProperties = {
  display: "flex",
  gap: "32px",
  borderBottom: "1px solid rgba(201,168,76,0.15)",
};

export const getTabStyle = (active: boolean): CSSProperties => ({
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  letterSpacing: "0.15em",
  textTransform: "uppercase",
  padding: "12px 0",
  background: "none",
  border: "none",
  borderBottom: active ? `2px solid ${THEME.colors.gold}` : "2px solid transparent",
  color: active ? THEME.colors.charcoal : THEME.colors.muted,
  cursor: "pointer",
  transition: "all 0.2s",
});

export const contentStyle: CSSProperties = {
  maxWidth: "1000px",
  margin: "0 auto",
  padding: "60px 5% 120px",
};