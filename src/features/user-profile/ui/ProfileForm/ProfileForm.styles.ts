import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.5rem",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  marginBottom: "32px",
};

export const formStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  maxWidth: "560px",
};

export const memberStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  letterSpacing: "0.08em",
  color: THEME.colors.muted,
  margin: 0,
};

export const actionsStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  alignItems: "stretch",
  gap: "16px",
  width: "106%",
};

export const successStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  color: "#2D7A4F",
};

export const errorStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.8rem",
  color: "#C0392B",
};

export const submitBtnInnerStyle: CSSProperties = {
  display: "block",
  width: "100%",
  textAlign: "center",
};