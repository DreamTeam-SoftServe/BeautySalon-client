import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const pageStyle: CSSProperties = {
  minHeight: "100vh",
  backgroundColor: THEME.colors.cream,
  padding: "140px 20px 250px 20px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "flex-start",
  alignItems: "center",
  boxSizing: "border-box",
};

export const containerStyle: CSSProperties = {
  width: "100%",
  maxWidth: "520px",
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
};

export const headerWrapStyle: CSSProperties = {
  marginBottom: "48px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
};

export const eyebrowStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "12px",
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "clamp(2rem, 5vw, 2.8rem)",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  lineHeight: 1.2,
  margin: "0 0 12px",
};

export const subtitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  color: THEME.colors.muted,
  margin: 0,
  textAlign: "center",
};

export const dividerStyle: CSSProperties = {
  width: "40px",
  height: "1px",
  background: THEME.colors.gold,
  marginTop: "20px",
};

export const formWrapStyle: CSSProperties = {
  width: "100%",
};