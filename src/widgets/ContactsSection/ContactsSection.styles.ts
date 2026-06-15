import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getContactsStyles = (isMobile: boolean) => {
  const basePattern: CSSProperties = {
    position: "absolute",
    width: isMobile ? "300px" : "550px",
    height: isMobile ? "300px" : "550px",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: 0.1,
    pointerEvents: "none",
    zIndex: 0,
  };

  return {
    sectionStyle: {
      padding: isMobile ? "60px 5%" : "120px 5%",
      background: THEME.colors.white,
      position: "relative",
      overflow: "hidden",
    } as CSSProperties,

    containerStyle: {
      maxWidth: "1200px",
      margin: "0 auto",
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "1fr 1fr", // 1 колонка на мобільних
      gap: isMobile ? "48px" : "80px",
      alignItems: "start",
      position: "relative",
    } as CSSProperties,

    decor1: { ...basePattern, top: "-10%", left: isMobile ? "-150px" : "-350px", transform: "rotate(45deg)" } as CSSProperties,
    decor2: { ...basePattern, bottom: "-20%", right: isMobile ? "-200px" : "-400px", transform: "rotate(-20deg)" } as CSSProperties,

    contactListStyle: {
      display: "flex",
      flexDirection: "column",
      gap: isMobile ? "24px" : "32px",
    } as CSSProperties,

    contactItemStyle: {
      display: "flex",
      gap: isMobile ? "16px" : "20px",
      alignItems: "flex-start",
    } as CSSProperties,

    iconStyle: {
      width: isMobile ? "36px" : "44px",
      height: isMobile ? "36px" : "44px",
      background: "rgba(201,168,76,0.1)",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: isMobile ? "1rem" : "1.1rem",
      flexShrink: 0,
    } as CSSProperties,

    labelStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: THEME.colors.gold,
      margin: "0 0 4px",
    } as CSSProperties,

    valueStyle: {
      fontFamily: THEME.fonts.body,
      fontSize: isMobile ? "0.95rem" : "1rem",
      color: THEME.colors.charcoal,
      margin: 0,
      whiteSpace: "pre-line",
    } as CSSProperties,

    socialTitleStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: THEME.colors.gold,
      marginBottom: "16px",
    } as CSSProperties,

    socialLinkStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.7rem",
      letterSpacing: "0.1em",
      textDecoration: "none",
      color: THEME.colors.muted,
      padding: "8px 16px",
      border: "1px solid #D4C5A0",
      transition: "all 0.2s",
    } as CSSProperties,

    mapWrapperStyle: {
      aspectRatio: isMobile ? "4/3" : "1", // Робимо карту трохи меншою по висоті на телефоні
      border: "1px solid #E8E0D0",
      overflow: "hidden",
      position: "relative",
      width: "100%",
    } as CSSProperties,
  };
};