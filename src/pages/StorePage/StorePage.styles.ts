import type { CSSProperties } from "react";
import { THEME } from "../../shared/config/theme";

export const getStoreStyles = (isMobile: boolean) => {
  const basePattern: CSSProperties = {
    position: "absolute",
    width: isMobile ? "300px" : "500px",
    height: isMobile ? "300px" : "500px",
    backgroundImage:
      "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: 0.5,
    pointerEvents: "none",
    zIndex: 0,
  };

  return {
    pageWrapStyle: {
      minHeight: "120vh",
      paddingTop: isMobile ? "60px" : "80px",
      background: THEME.colors.offwhite,
      position: "relative",
      overflow: "hidden",
    } as CSSProperties,

    containerStyle: {
      maxWidth: "1200px",
      margin: "0 auto",
      padding: isMobile ? "20px 5%" : "40px 20px",
      position: "relative",
      zIndex: 2,
    } as CSSProperties,

    decor1: { ...basePattern, top: "40%", left: isMobile ? "-150px" : "-350px", transform: "rotate(150deg)" } as CSSProperties,
    decor2: { ...basePattern, top: "60%", right: isMobile ? "-100px" : "-200px", transform: "rotate(30deg)" } as CSSProperties,

    topActionsStyle: {
      display: "flex",
      justifyContent: isMobile ? "center" : "flex-end",
      marginBottom: "20px",
      width: "100%",
    } as CSSProperties,

    tabsWrapStyle: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: "20px",
      justifyContent: isMobile ? "center" : "flex-start",
    } as CSSProperties,

    sortWrapStyle: {
      display: "flex",
      gap: "8px",
      flexWrap: "wrap",
      marginBottom: isMobile ? "32px" : "48px",
      paddingTop: "16px",
      borderTop: "1px solid rgba(201,168,76,0.15)",
      justifyContent: isMobile ? "center" : "flex-start",
      alignItems: "center",
      width: "100%",
    } as CSSProperties,

    sortLabelStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.75rem",
      letterSpacing: "0.1em",
      textTransform: "uppercase",
      color: THEME.colors.muted,
      fontWeight: 600,
      marginRight: "8px",
      width: isMobile ? "100%" : "auto",
      textAlign: isMobile ? "center" : "left",
    } as CSSProperties,

    getTabStyle: (isActive: boolean): CSSProperties => ({
      fontFamily: THEME.fonts.sans,
      fontSize: "0.7rem",
      letterSpacing: "0.12em",
      textTransform: "uppercase",
      padding: isMobile ? "6px 14px" : "8px 20px",
      border: `1px solid ${isActive ? THEME.colors.charcoal : "#D4C5A0"}`,
      background: isActive ? THEME.colors.charcoal : "transparent",
      color: isActive ? THEME.colors.cream : THEME.colors.muted,
      cursor: "pointer",
      transition: "all 0.2s ease",
      flex: isMobile ? "1 1 calc(33% - 10px)" : "auto",
      textAlign: "center",
    }),

    gridStyle: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(280px, 1fr))",
      gap: isMobile ? "20px" : "30px",
    } as CSSProperties,

    cardStyle: {
      backgroundColor: "#FFFFFF",
      borderRadius: "12px",
      overflow: "hidden",
      boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
      display: "flex",
      flexDirection: "column",
      border: "1px solid #F0F0F0", 
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s cubic-bezier(0.16, 1, 0.3, 1), border-color 0.4s ease",
    } as CSSProperties,

    imgWrapStyle: {
      width: "100%",
      height: isMobile ? "240px" : "280px",
      overflow: "hidden",
      cursor: "pointer",
    } as CSSProperties,

    imgStyle: { width: "100%", height: "100%", objectFit: "cover", transition: "transform 0.5s ease" } as CSSProperties,

    contentWrapStyle: { padding: isMobile ? "16px" : "24px", display: "flex", flexDirection: "column", flex: 1 } as CSSProperties,

    brandStyle: { fontSize: "12px", textTransform: "uppercase", letterSpacing: "0.05em", color: "#A0A0A0", marginBottom: "8px" } as CSSProperties,

    nameStyle: { fontSize: isMobile ? "18px" : "20px", fontWeight: 500, color: "#1A1A1A", marginBottom: "12px", cursor: "pointer" } as CSSProperties,

    priceRowStyle: { display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "24px", marginTop: "auto" } as CSSProperties,

    priceStyle: { fontSize: isMobile ? "16px" : "18px", fontWeight: 600, color: "#D4C5A0" } as CSSProperties,

    stockStyle: { fontSize: "14px", color: "#7A7A7A" } as CSSProperties,

    buttonsRowStyle: { display: "flex", gap: "12px" } as CSSProperties,
  };
};