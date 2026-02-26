import { THEME } from "../../config/theme";
import type { CSSProperties } from "react";

export const wrapStyle: CSSProperties = {
  padding: "32px",
  background: THEME.colors.errorBg,
  border: `1px solid ${THEME.colors.errorBorder}`,
  textAlign: "center",
  display: "flex",
  flexDirection: "column",
  gap: "16px",
  alignItems: "center",
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: THEME.colors.errorText,
};

export const bodyStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  color: THEME.colors.muted,
};