import { THEME } from "../../../shared/config/theme";
import type { CSSProperties } from "react";

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "26px",
  width: "100%",
};

export const gridStyle: CSSProperties = {
  display: "grid",
  gridTemplateColumns: "repeat(auto-fit, minmax(180px, 1fr))",
  gap: "20px",
};

export const serverErrorStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.85rem",
  color: THEME.colors.errorText,
  margin: 0,
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

export const submitBtnStyle: CSSProperties = {};
export const submitBtnInnerStyle: CSSProperties = {};