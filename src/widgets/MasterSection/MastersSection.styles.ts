import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getMastersStyles = (isMobile: boolean) => {
  const basePattern: CSSProperties = {
    position: "absolute",
    width: isMobile ? "250px" : "500px",
    height: isMobile ? "250px" : "500px",
    backgroundImage: "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
    backgroundRepeat: "no-repeat",
    backgroundSize: "contain",
    opacity: 0.5,
    pointerEvents: "none",
    zIndex: 0,
  };

  return {
    sectionStyle: {
      padding: isMobile ? "60px 5%" : "120px 5%",
      background: THEME.colors.offwhite,
      position: "relative",
      overflow: "hidden",
    } as CSSProperties,

    containerStyle: {
      maxWidth: "1200px",
      margin: "0 auto",
      position: "relative",
      zIndex: 2,
    } as CSSProperties,

    decor1: { ...basePattern, top: "-5%", left: isMobile ? "-100px" : "-300px", transform: "rotate(15deg)" } as CSSProperties,
    decor2: { ...basePattern, top: "40%", right: isMobile ? "-150px" : "-350px", transform: "rotate(80deg)" } as CSSProperties,
    decor3: { ...basePattern, bottom: "0%", left: isMobile ? "-100px" : "-250px", transform: "rotate(145deg)" } as CSSProperties,

    gridStyle: {
      display: "grid",
      gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(260px, 1fr))",
      gap: isMobile ? "24px" : "48px 32px",
    } as CSSProperties,

    ctaWrapStyle: {
      textAlign: "center",
      marginTop: isMobile ? "40px" : "64px",
    } as CSSProperties,
  };
};