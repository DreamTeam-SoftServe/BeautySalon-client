import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const getImgStyle = (size: number): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: "50%",
  objectFit: "cover",
  border: `2px solid ${THEME.colors.gold}`,
});

export const getInitialsWrapStyle = (size: number): CSSProperties => ({
  width: size,
  height: size,
  borderRadius: "50%",
  background: `linear-gradient(135deg, ${THEME.colors.gold}, ${THEME.colors.goldLight})`,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  flexShrink: 0,
  border: `2px solid ${THEME.colors.gold}`,
});

export const getInitialsTextStyle = (size: number): CSSProperties => ({
  fontFamily: THEME.fonts.sans,
  fontSize: size * 0.35,
  fontWeight: 500,
  color: THEME.colors.charcoal,
  lineHeight: 1,
});