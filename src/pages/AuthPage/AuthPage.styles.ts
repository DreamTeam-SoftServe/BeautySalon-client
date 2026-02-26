import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const pageStyle: CSSProperties = {
  paddingTop: "80px",
  minHeight: "100vh",
  background: THEME.colors.cream,
};

export const containerStyle: CSSProperties = {
  maxWidth: "520px",
  margin: "0 auto",
  padding: "80px 5% 120px",
};

export const headerStyle: CSSProperties = {
  marginBottom: "48px",
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
};

export const dividerStyle: CSSProperties = {
  width: "40px",
  height: "1px",
  background: THEME.colors.gold,
  marginTop: "20px",
};