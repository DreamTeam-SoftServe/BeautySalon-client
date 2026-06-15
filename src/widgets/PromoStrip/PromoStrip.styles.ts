import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

export const getPromoStyles = (isMobile: boolean) => {
  return {
    sectionStyle: {
      padding: isMobile ? "40px 5%" : "80px 5%",
      background: THEME.colors.charcoal,
      textAlign: "center",
    } as CSSProperties,

    eyebrowStyle: {
      fontFamily: THEME.fonts.sans,
      fontSize: "0.7rem",
      letterSpacing: "0.3em",
      textTransform: "uppercase",
      color: THEME.colors.gold,
      marginBottom: "16px",
    } as CSSProperties,

    headingStyle: {
      fontFamily: THEME.fonts.display,
      fontSize: isMobile ? "clamp(1.5rem, 6vw, 2.5rem)" : "clamp(2rem, 4vw, 3rem)",
      fontWeight: 400,
      color: THEME.colors.cream,
      margin: "0 0 24px",
    } as CSSProperties,
  };
};