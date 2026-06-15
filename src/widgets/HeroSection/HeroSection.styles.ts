import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getHeroStyles = (isMobile: boolean, visible: boolean) => {
  const basePattern: CSSProperties = {
    position: "absolute",
    width: isMobile ? "300px" : "600px",
    height: isMobile ? "300px" : "600px",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: 0.4,
    pointerEvents: "none",
    zIndex: 0,
  };

  return {
    sectionStyle: {
      height: isMobile ? "auto" : "100vh",
      minHeight: isMobile ? "100vh" : "750px",
      boxSizing: "border-box",
      display: "flex",
      flexDirection: isMobile ? "column" : "row",
      alignItems: "center",
      justifyContent: isMobile ? "center" : "flex-start",
      background: THEME.colors.cream,
      position: "relative",
      padding: isMobile ? "100px 5% 40px" : "5% 5%",
      gap: isMobile ? "40px" : "0",
    } as CSSProperties,

    heroDecor1: {
      ...basePattern,
      top: isMobile ? "0%" : "-10%",
      left: isMobile ? "-50px" : "200px",
      transform: "rotate(25deg)",
    } as CSSProperties,

    heroDecor2: {
      ...basePattern,
      bottom: "20px",
      left: isMobile ? "10%" : "40%",
      transform: "rotate(140deg)",
    } as CSSProperties,

    imageWrapStyle: {
      position: isMobile ? "relative" : "absolute",
      right: isMobile ? "auto" : "4%",
      top: isMobile ? "auto" : "50%",
      transform: visible ? (isMobile ? "none" : "translateY(-50%)") : (isMobile ? "translateY(40px)" : "translateY(-50%) translateX(60px)"),
      width: isMobile ? "100%" : "42%",
      height: isMobile ? "45vh" : "82vh",
      zIndex: 1,
      background: THEME.colors.charcoal,
      overflow: "hidden",
      borderRadius: "16px",
      boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
      opacity: visible ? 1 : 0,
      transition: "opacity 0.9s ease, transform 0.9s ease",
      transitionDelay: "0.2s",
    } as CSSProperties,

    imageFrameStyle: {
      position: "absolute",
      inset: isMobile ? "10px" : "20px",
      border: `1px solid rgba(201,168,76,0.6)`,
      borderRadius: "8px",
      zIndex: 4,
      pointerEvents: "none",
    } as CSSProperties,

    eyebrowStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.7rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: THEME.colors.gold,
      marginBottom: "24px",
      display: "inline-block",
      padding: "4px 8px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
    } as CSSProperties,

    headingStyle: {
      fontFamily: THEME.fonts.display,
      fontSize: isMobile ? "clamp(2.5rem, 10vw, 3.5rem)" : "clamp(3rem, 6vw, 5.5rem)",
      fontWeight: 400,
      color: THEME.colors.charcoal,
      lineHeight: 1.05,
      margin: "0 0 28px",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateX(0)" : "translateX(-40px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      transitionDelay: "0.15s",
    } as CSSProperties,

    contentStyle: {
      position: "relative",
      maxWidth: "520px",
      zIndex: 2,
      width: "100%",
      textAlign: isMobile ? "center" : "left",
    } as CSSProperties,

    ctaRowStyle: {
      display: "flex",
      gap: "16px",
      flexWrap: "wrap",
      justifyContent: isMobile ? "center" : "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(20px)",
      transition: "opacity 0.7s ease, transform 0.7s ease",
      transitionDelay: "0.45s",
    } as CSSProperties,

    statsRowStyle: {
      display: "flex",
      gap: isMobile ? "20px" : "40px",
      marginTop: isMobile ? "40px" : "64px",
      paddingTop: isMobile ? "30px" : "40px",
      borderTop: "1px solid rgba(201,168,76,0.25)",
      justifyContent: isMobile ? "center" : "flex-start",
      opacity: visible ? 1 : 0,
      transform: visible ? "translateY(0)" : "translateY(30px)",
      transition: "opacity 0.8s ease, transform 0.8s ease",
      transitionDelay: "0.6s",
    } as CSSProperties,

    statNumberStyle: {
      fontFamily: THEME.fonts.display,
      fontSize: isMobile ? "1.6rem" : "2rem",
      color: THEME.colors.charcoal,
      margin: 0,
    } as CSSProperties,

    statLabelStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      textTransform: "uppercase",
      color: THEME.colors.muted,
      margin: 0,
    } as CSSProperties,

    arrowBtnStyle: (side: "left" | "right") => ({
      position: "absolute",
      top: "50%",
      [side]: isMobile ? "8px" : "16px",
      transform: "translateY(-50%)",
      zIndex: 5,
      background: "rgba(0,0,0,0.2)",
      border: `1px solid rgba(201,168,76,0.5)`,
      color: THEME.colors.cream,
      width: isMobile ? "36px" : "44px",
      height: isMobile ? "36px" : "44px",
      borderRadius: "50%",
      cursor: "pointer",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      fontSize: "1.3rem",
      backdropFilter: "blur(6px)",
    } as CSSProperties),

    imageCounterStyle: {
      position: "absolute",
      top: isMobile ? "16px" : "32px",
      right: isMobile ? "16px" : "32px",
      zIndex: 5,
      fontFamily: THEME.fonts.sans,
      fontSize: "0.65rem",
      letterSpacing: "0.2em",
      color: THEME.colors.cream,
      background: "rgba(0,0,0,0.25)",
      padding: "6px 12px",
      borderRadius: "2px",
      backdropFilter: "blur(4px)",
    } as CSSProperties,

    dotsWrapStyle: {
      position: "absolute",
      bottom: isMobile ? "16px" : "32px",
      left: "50%",
      transform: "translateX(-50%)",
      display: "flex",
      gap: "8px",
      zIndex: 5,
    } as CSSProperties,

    getDotStyle: (active: boolean) => ({
      width: active ? "28px" : "8px",
      height: "8px",
      borderRadius: active ? "4px" : "50%",
      background: active ? THEME.colors.gold : "rgba(255,255,255,0.4)",
      border: `1px solid rgba(201,168,76,0.6)`,
      cursor: "pointer",
      transition: "all 0.3s ease",
      padding: 0,
    } as CSSProperties),
  };
};