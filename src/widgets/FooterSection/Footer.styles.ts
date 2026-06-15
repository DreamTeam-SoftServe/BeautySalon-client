import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getFooterStyles = (isMobile: boolean) => {
  return {
    footerStyle: {
      background: THEME.colors.charcoal,
      padding: isMobile ? "40px 5% 24px" : "64px 5% 32px",
      color: THEME.colors.cream,
      textAlign: isMobile ? "center" : "left", // На мобільному красиво виглядає по центру
    } as CSSProperties,

    innerStyle: { maxWidth: "1200px", margin: "0 auto" } as CSSProperties,

    gridStyle: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "2fr 1fr 1fr", // 1 колонка на мобільних
      gap: isMobile ? "40px" : "64px",
      marginBottom: isMobile ? "32px" : "48px",
    } as CSSProperties,

    brandNameStyle: {
      fontFamily: THEME.fonts.display,
      fontSize: isMobile ? "1.6rem" : "1.8rem",
      margin: "0 0 8px",
    } as CSSProperties,

    brandSubStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.6rem",
      letterSpacing: "0.3em",
      color: THEME.colors.gold,
      margin: "0 0 20px",
    } as CSSProperties,

    taglineStyle: {
      fontFamily: THEME.fonts.body,
      fontSize: "0.95rem",
      color: "rgba(245,240,232,0.6)",
      lineHeight: 1.7,
      maxWidth: "280px",
      margin: isMobile ? "0 auto" : "0", // Вирівнювання по центру для мобільного
    } as CSSProperties,

    localeWrapStyle: {
      display: "flex",
      gap: "8px",
      marginTop: "32px",
      flexWrap: "wrap",
      justifyContent: isMobile ? "center" : "flex-start",
    } as CSSProperties,

    getLocaleButtonStyle: (active: boolean): CSSProperties => ({
      fontFamily: THEME.fonts.sans,
      fontSize: "0.7rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: "7px 14px",
      background: active ? THEME.colors.gold : "transparent",
      color: active ? THEME.colors.charcoal : "rgba(245,240,232,0.45)",
      border: `1px solid ${active ? THEME.colors.gold : "rgba(201,168,76,0.25)"}`,
      cursor: "pointer",
      transition: "all 0.25s",
    }),

    colTitleStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: THEME.colors.gold,
      marginBottom: "20px",
    } as CSSProperties,

    navButtonStyle: {
      background: "none",
      border: "none",
      padding: 0,
      fontFamily: THEME.fonts.body,
      fontSize: "0.95rem",
      color: "rgba(245,240,232,0.7)",
      cursor: "pointer",
      textTransform: "capitalize",
    } as CSSProperties,

    legalLinkStyle: {
      fontFamily: THEME.fonts.body,
      fontSize: "0.95rem",
      color: "rgba(245,240,232,0.7)",
      textDecoration: "none",
    } as CSSProperties,

    copyStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.7rem",
      color: "rgba(245,240,232,0.4)",
      textAlign: "center",
      marginTop: "24px",
      letterSpacing: "0.08em",
    } as CSSProperties,
  };
};