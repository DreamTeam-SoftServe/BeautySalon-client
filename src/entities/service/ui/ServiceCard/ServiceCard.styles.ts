import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const BASE_SHADOW = "0 4px 16px rgba(0,0,0,0.04)";
export const HOVER_SHADOW = "0 20px 40px rgba(0,0,0,0.14)";

export const cardStyle: CSSProperties = {
  padding: "20px",
  background: THEME.colors.white,
  border: "1px solid #E5DFD3",
  borderRadius: "16px",
  boxShadow: BASE_SHADOW,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  cursor: "pointer",
  height: "100%",
};

export const getImageStyle = (hasImage: boolean): CSSProperties => ({
  width: "100%",
  height: "200px",
  borderRadius: "12px",
  border: hasImage ? "none" : "1px solid #F0EBE3",
  overflow: "hidden", 
  position: "relative",
});

export const placeholderStyle: CSSProperties = {
  height: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#D4C5A0",
  fontSize: "0.8rem",
  letterSpacing: "0.1em",
  textTransform: "uppercase",
};

export const bodyStyle: CSSProperties = {
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  flexGrow: 1,
};

export const titleStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "1.5rem",
  margin: 0,
  color: THEME.colors.charcoal,
  fontWeight: 400,
};

export const descStyle: CSSProperties = {
  fontFamily: THEME.fonts.body,
  fontSize: "0.95rem",
  color: THEME.colors.muted,
  lineHeight: "1.7",
  margin: 0,
  wordBreak: "break-word",
  overflowWrap: "anywhere",
  display: "-webkit-box",
  WebkitLineClamp: 3,
  WebkitBoxOrient: "vertical",
  overflow: "hidden",
};

export const footerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "auto",
  paddingTop: "24px",
  borderTop: "1px solid #F0EBE3",
};

export const durationStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.75rem",
  color: THEME.colors.gold,
  textTransform: "uppercase",
  letterSpacing: "0.15em",
  fontWeight: 600,
};

export const dividerLineStyle: CSSProperties = {
  flexGrow: 1,
  height: "1px",
  background:
    "linear-gradient(90deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.1) 100%)",
  margin: "0 16px",
};

export const priceStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "1rem",
  fontWeight: 600,
  color: THEME.colors.charcoal,
};