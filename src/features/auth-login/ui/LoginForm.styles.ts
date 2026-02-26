import { THEME } from "../../../shared/config/theme";
import type { CSSProperties } from "react";

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "20px",
};

export const serverErrorStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.85rem",
  color: THEME.colors.errorText,
  margin: 0,
};

export const forgotRowStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "8px",
};

export const forgotBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  color: THEME.colors.muted,
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
};

export const switchRowStyle: CSSProperties = {
  textAlign: "center",
};

export const switchTextStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  color: THEME.colors.muted,
};

export const switchBtnStyle: CSSProperties = {
  background: "none",
  border: "none",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  color: THEME.colors.gold,
  cursor: "pointer",
  textDecoration: "underline",
  padding: 0,
};

export const dividerRowStyle: CSSProperties = {
  display: "flex",
  alignItems: "center",
  gap: "12px",
  margin: "4px 0",
};

export const dividerLineStyle: CSSProperties = {
  flex: 1,
  height: "1px",
  background: "#E8E0D0",
};

export const dividerTextStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  color: THEME.colors.muted,
  letterSpacing: "0.05em",
};