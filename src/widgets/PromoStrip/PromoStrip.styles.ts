import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const sectionStyle: CSSProperties = {
  padding: "80px 5%",
  background: THEME.colors.charcoal,
  textAlign: "center",
};

export const eyebrowStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "16px",
};

export const headingStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "clamp(2rem, 4vw, 3rem)",
  fontWeight: 400,
  color: THEME.colors.cream,
  margin: "0 0 24px",
};