import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const BASE_SHADOW = "0 4px 16px rgba(0,0,0,0.04)";
export const HOVER_SHADOW = "0 20px 40px rgba(0,0,0,0.14)";

export const cardStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  cursor: "pointer",
  background: THEME.colors.white,
  borderRadius: "12px",
  border: "1px solid #E5DFD3",
  boxShadow: BASE_SHADOW,
  // overflow: "hidden" прибрали — він блокує transform на карточці
  // overflow тепер тільки на imageWrapStyle
};

export const imageWrapStyle: CSSProperties = {
  width: "100%",
  aspectRatio: "3/4",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden", // тільки тут
  borderRadius: "12px 12px 0 0",
};

export const imgStyle: CSSProperties = {
  width: "100%",
  height: "100%",
  objectFit: "cover",
};

export const placeholderTextStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "4rem",
  color: "rgba(0,0,0,0.1)",
  fontWeight: 700,
};

export const experienceBadgeStyle: CSSProperties = {
  position: "absolute",
  bottom: "20px",
  right: "20px",
  background: THEME.colors.charcoal,
  color: THEME.colors.cream,
  padding: "6px 12px",
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.1em",
  zIndex: 2,
  borderRadius: "4px",
};

export const cardBodyStyle: CSSProperties = {
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "12px",
};

export const nameStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.4rem",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  margin: 0,
};

export const levelStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  letterSpacing: "0.12em",
  textTransform: "uppercase",
  color: THEME.colors.gold,
  margin: 0,
};

export const bioStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.95rem",
  color: THEME.colors.muted,
  lineHeight: 1.7,
  margin: 0,
};

export const specialtiesWrapStyle: CSSProperties = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
  marginTop: "4px",
};