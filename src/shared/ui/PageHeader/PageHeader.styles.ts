import { THEME } from "../../config/theme";
import type { CSSProperties } from "react";

export const wrapStyle: CSSProperties = {
  padding: "80px 5% 60px",
  background: THEME.colors.cream,
  textAlign: "center",
};

export const bodyStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "1.1rem",
  color: THEME.colors.muted,
  maxWidth: "560px",
  margin: "0 auto",
};