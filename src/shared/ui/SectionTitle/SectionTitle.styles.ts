import { THEME } from "../../config/theme";
import type { CSSProperties } from "react";

export const getWrapStyle = (align: "left" | "center" | "right"): CSSProperties => ({
  textAlign: align,
  marginBottom: "48px",
});

export const subtitleStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.25em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  marginBottom: "12px",
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "clamp(2rem, 4vw, 3.2rem)",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  lineHeight: 1.2,
  margin: 0,
};

export const getLineStyle = (align: "left" | "center" | "right"): CSSProperties => ({
  width: align === "center" ? "60px" : "auto",
  height: "1px",
  background: THEME.colors.gold,
  margin: align === "center" ? "20px auto 0" : "20px 0 0",
});