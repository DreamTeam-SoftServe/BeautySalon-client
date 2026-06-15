import { THEME } from "../../../../shared/config/theme";
import type { CSSProperties } from "react";

export const BASE_SHADOW = "0 4px 16px rgba(0,0,0,0.04)";
export const HOVER_SHADOW = "0 20px 40px rgba(0,0,0,0.14)";

export const getServiceCardStyles = (isMobile: boolean) => ({
  cardStyle: {
    padding: isMobile ? "16px" : "20px",
    background: THEME.colors.white,
    border: "1px solid #E5DFD3",
    borderRadius: "16px",
    boxShadow: BASE_SHADOW,
    display: "flex",
    flexDirection: "column",
    gap: isMobile ? "16px" : "24px",
    cursor: "pointer",
    height: "100%",
  } as CSSProperties,

  getImageStyle: (hasImage: boolean): CSSProperties => ({
    width: "100%",
    height: isMobile ? "160px" : "200px",
    borderRadius: "12px",
    border: hasImage ? "none" : "1px solid #F0EBE3",
    overflow: "hidden", 
    position: "relative",
  }),

  placeholderStyle: {
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#D4C5A0",
    fontSize: isMobile ? "0.7rem" : "0.8rem",
    letterSpacing: "0.1em",
    textTransform: "uppercase",
  } as CSSProperties,

  bodyStyle: {
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flexGrow: 1,
  } as CSSProperties,

  titleStyle: {
    fontFamily: THEME.fonts.display,
    fontSize: isMobile ? "1.3rem" : "1.5rem",
    margin: 0,
    color: THEME.colors.charcoal,
    fontWeight: 400,
  } as CSSProperties,

  descStyle: {
    fontFamily: THEME.fonts.body,
    fontSize: isMobile ? "0.85rem" : "0.95rem",
    color: THEME.colors.muted,
    lineHeight: "1.7",
    margin: 0,
    wordBreak: "break-word",
    overflowWrap: "anywhere",
    display: "-webkit-box",
    WebkitLineClamp: 3,
    WebkitBoxOrient: "vertical",
    overflow: "hidden",
  } as CSSProperties,

  footerStyle: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: "auto",
    paddingTop: isMobile ? "16px" : "24px",
    borderTop: "1px solid #F0EBE3",
  } as CSSProperties,

  durationStyle: {
    fontFamily: THEME.fonts.sans,
    fontSize: isMobile ? "0.7rem" : "0.75rem",
    color: THEME.colors.gold,
    textTransform: "uppercase",
    letterSpacing: "0.15em",
    fontWeight: 600,
  } as CSSProperties,

  dividerLineStyle: {
    flexGrow: 1,
    height: "1px",
    background: "linear-gradient(90deg, rgba(201,168,76,0.1) 0%, rgba(201,168,76,0.5) 50%, rgba(201,168,76,0.1) 100%)",
    margin: "0 16px",
  } as CSSProperties,

  priceStyle: {
    fontFamily: THEME.fonts.sans,
    fontSize: isMobile ? "0.9rem" : "1rem",
    fontWeight: 600,
    color: THEME.colors.charcoal,
  } as CSSProperties,
});