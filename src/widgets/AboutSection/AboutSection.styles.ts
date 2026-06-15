import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getAboutStyles = (isMobile: boolean) => {
  const basePattern: CSSProperties = {
    position: "absolute",
    width: isMobile ? "300px" : "500px",
    height: isMobile ? "300px" : "500px",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: 0.3,
    pointerEvents: "none",
    zIndex: 0,
  };

  return {
    sectionStyle: {
      padding: isMobile ? "60px 5%" : "120px 5%",
      background: THEME.colors.offwhite,
      position: "relative",
    } as CSSProperties,

    aboutDecor1: { ...basePattern, top: "-60px", left: isMobile ? "-150px" : "-120px", transform: "rotate(45deg)" } as CSSProperties,
    aboutDecor2: { ...basePattern, bottom: "-80px", right: isMobile ? "-100px" : "100px", transform: "rotate(130deg)" } as CSSProperties,

    containerStyle: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // 1 колонка на мобільних
      gap: isMobile ? "40px" : "80px",
      alignItems: "center",
    } as CSSProperties,

    imageBlockStyle: { position: "relative", zIndex: 1 } as CSSProperties,

    mainImgStyle: {
      width: "100%",
      aspectRatio: "4/5",
      objectFit: "cover",
      borderRadius: "8px",
      border: `3px solid ${THEME.colors.gold}`,
      display: "block",
    } as CSSProperties,

    accentCardStyle: {
      position: "absolute",
      bottom: isMobile ? "-16px" : "-32px",
      right: isMobile ? "10px" : "-32px",
      background: THEME.colors.charcoal,
      color: THEME.colors.cream,
      padding: isMobile ? "20px" : "32px",
      borderRadius: "8px",
      border: `1px solid rgba(201,168,76,0.3)`,
      minWidth: isMobile ? "140px" : "180px",
    } as CSSProperties,

    accentNumberStyle: {
      fontFamily: THEME.fonts.display,
      fontSize: isMobile ? "2.2rem" : "3rem",
      color: THEME.colors.gold,
      margin: 0,
      lineHeight: 1,
    } as CSSProperties,

    accentLabelStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: THEME.colors.cream,
      margin: "8px 0 0",
      opacity: 0.7,
    } as CSSProperties,

    contentStyle: { paddingLeft: isMobile ? "0" : "16px", zIndex: 1, position: "relative" } as CSSProperties,

    bodyStyle: {
      fontFamily: THEME.fonts.body,
      fontSize: isMobile ? "0.95rem" : "1.05rem",
      color: THEME.colors.muted,
      lineHeight: 1.8,
      marginBottom: isMobile ? "32px" : "48px",
    } as CSSProperties,

    featuresGridStyle: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // 1 колонка на мобільних
      gap: "24px",
      marginBottom: isMobile ? "32px" : "48px",
    } as CSSProperties,

    featureItemStyle: { display: "flex", flexDirection: "column", gap: "8px" } as CSSProperties,
    featureIconStyle: { fontSize: "1.5rem", marginBottom: "4px" } as CSSProperties,

    featureTitleStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.8rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: THEME.colors.charcoal,
      fontWeight: 600,
    } as CSSProperties,

    featureDescStyle: {
      fontFamily: THEME.fonts.body,
      fontSize: "0.9rem",
      color: THEME.colors.muted,
      lineHeight: 1.6,
    } as CSSProperties,
  };
};