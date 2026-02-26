import { THEME } from "../../config/theme";
import type { CSSProperties } from "react";

export const wrapStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "6px",
};

export const labelStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: THEME.colors.muted,
};

export const getSelectStyle = (error?: string, hasValue?: boolean): CSSProperties => ({
  width: "100%",
  padding: "14px 16px",
  fontFamily: THEME.fonts.body,
  fontSize: "1rem",
  background: "transparent",
  border: `1px solid ${error ? "#C0392B" : "#D4C5A0"}`,
  color: hasValue ? THEME.colors.charcoal : THEME.colors.muted,
  outline: "none",
  appearance: "none",
  cursor: "pointer",
});

export const errorStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  color: "#C0392B",
};