import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getNavbarStyles = (isMobile: boolean, scrolled: boolean, isOpen: boolean) => {
  return {
    navStyle: {
      position: "fixed",
      top: 0,
      left: 0,
      right: 0,
      zIndex: 100,
      padding: isMobile ? "0 20px" : "0 5%",
      background: scrolled || (isMobile && isOpen) ? "rgba(253,251,247,0.98)" : "transparent",
      backdropFilter: scrolled || (isMobile && isOpen) ? "blur(8px)" : "none",
      borderBottom: scrolled ? `1px solid rgba(201,168,76,0.15)` : "none",
      transition: "all 0.4s ease",
      display: "flex",
      alignItems: "center",
      justifyContent: "space-between",
      height: scrolled ? "64px" : "80px",
    } as CSSProperties,

    logoWrapStyle: {
      cursor: "pointer",
      zIndex: 101,
    } as CSSProperties,

    logoNameStyle: {
      fontFamily: THEME.fonts.display,
      fontSize: isMobile ? "1.2rem" : "1.4rem",
      fontWeight: 700,
      color: THEME.colors.charcoal,
      margin: 0,
      letterSpacing: "0.04em",
    } as CSSProperties,

    logoSubStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.55rem",
      letterSpacing: "0.3em",
      color: THEME.colors.gold,
      margin: 0,
      textTransform: "uppercase",
    } as CSSProperties,

    burgerBtnStyle: {
      background: "none",
      border: "none",
      fontSize: "1.8rem",
      color: THEME.colors.charcoal,
      cursor: "pointer",
      zIndex: 101,
    } as CSSProperties,

    linksWrapStyle: {
      display: "flex",
      gap: isMobile ? "20px" : "36px",
      alignItems: "center",

      flexDirection: isMobile ? "column" : "row",
      position: isMobile ? "absolute" : "static",
      top: isMobile ? "100%" : "auto",
      left: 0,
      width: isMobile ? "100%" : "auto",
      background: isMobile ? THEME.colors.cream : "transparent",
      padding: isMobile ? "20px 0 40px 0" : "0",
      boxShadow: isMobile && isOpen ? "0 10px 20px rgba(0,0,0,0.05)" : "none",
      opacity: isMobile && !isOpen ? 0 : 1,
      visibility: isMobile && !isOpen ? "hidden" : "visible",
      transform: isMobile && !isOpen ? "translateY(-10px)" : "translateY(0)",
      transition: "all 0.3s ease",
    } as CSSProperties,

    getLinkStyle: (active: boolean): CSSProperties => ({
      background: "none",
      border: "none",
      fontFamily: THEME.fonts.sans,
      fontSize: isMobile ? "1rem" : "0.75rem",
      letterSpacing: "0.15em",
      textTransform: "uppercase",
      color: active ? THEME.colors.gold : THEME.colors.charcoal,
      cursor: "pointer",
      padding: "4px 0",
      borderBottom: active ? `1px solid ${THEME.colors.gold}` : "1px solid transparent",
      transition: "all 0.2s",
    }),
  };
};