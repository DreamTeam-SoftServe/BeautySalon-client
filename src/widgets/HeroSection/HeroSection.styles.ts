import { THEME } from "../../shared/config/theme";
import type { CSSProperties } from "react";

const basePattern: CSSProperties = {
  position: "absolute",
  width: "600px",
  height: "600px",
  backgroundImage:
    "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 100 100'%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 0 C60 30 100 40 100 50 C100 60 60 70 50 100 C40 70 0 60 0 50 C0 40 40 30 50 0 Z'/%3E%3Ccircle cx='50' cy='50' r='15' fill='none' stroke='%23C9A84C' stroke-width='0.5'/%3E%3Cpath fill='none' stroke='%23C9A84C' stroke-width='0.5' d='M50 20 C55 35 80 45 80 50 C80 55 55 65 50 80 C45 65 20 55 20 50 C20 45 45 35 50 20 Z'/%3E%3C/svg%3E\")",
  backgroundRepeat: "no-repeat",
  backgroundSize: "contain",
  opacity: 0.4,
  pointerEvents: "none",
  zIndex: 0,
};

export const heroDecor1: CSSProperties = {
  ...basePattern,
  top: "-10%",
  left: "-250px",
  transform: "rotate(25deg)",
};

export const heroDecor2: CSSProperties = {
  ...basePattern,
  bottom: "-15%",
  left: "35%",
  transform: "rotate(105deg)",
};

export const sectionStyle: CSSProperties = {
  height: "100vh",
  minHeight: "750px",
  boxSizing: "border-box",
  display: "flex",
  alignItems: "center",
  background: THEME.colors.cream,
  position: "relative",
  overflow: "hidden",
  padding: "0 5%",
};

// Анімації через <style> тег — додай у index.html або глобальний CSS
// Тут ми задаємо початковий стан + transition через inline styles

export const getImageWrapStyle = (visible: boolean): CSSProperties => ({
  position: "absolute",
  right: "4%",
  top: "50%",
  transform: visible ? "translateY(-50%)" : "translateY(-50%) translateX(60px)",
  width: "42%",
  height: "82vh",
  zIndex: 1,
  background: THEME.colors.charcoal,
  overflow: "hidden",
  borderRadius: "16px",
  boxShadow: "0 24px 60px rgba(0,0,0,0.15)",
  opacity: visible ? 1 : 0,
  transition: "opacity 0.9s ease, transform 0.9s ease",
  transitionDelay: "0.2s",
});

export const imageFrameStyle: CSSProperties = {
  position: "absolute",
  inset: "20px",
  border: `1px solid rgba(201,168,76,0.6)`,
  borderRadius: "8px",
  zIndex: 4,
  pointerEvents: "none",
};

export const baseImageStyle: CSSProperties = {
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "opacity 1.5s ease-in-out",
};

export const getDynamicImageStyle = (isActive: boolean): CSSProperties => ({
  ...baseImageStyle,
  opacity: isActive ? 1 : 0,
  zIndex: isActive ? 1 : 0,
});

// Eyebrow — з'являється першим
export const getEyebrowStyle = (visible: boolean): CSSProperties => ({
  fontFamily: THEME.fonts.sans,
  fontSize: "0.7rem",
  letterSpacing: "0.3em",
  textTransform: "uppercase" as const,
  color: THEME.colors.gold,
  marginBottom: "24px",
  display: "inline-block",
  padding: "4px 8px",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
  transitionDelay: "0s",
});

// Heading — з'являється зліва
export const getHeadingStyle = (visible: boolean): CSSProperties => ({
  fontFamily: THEME.fonts.display,
  fontSize: "clamp(3rem, 6vw, 5.5rem)",
  fontWeight: 400,
  color: THEME.colors.charcoal,
  lineHeight: 1.05,
  margin: "0 0 28px",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateX(0)" : "translateX(-40px)",
  transition: "opacity 0.8s ease, transform 0.8s ease",
  transitionDelay: "0.15s",
});

// Body text
export const getBodyStyle = (visible: boolean): CSSProperties => ({
  fontFamily: THEME.fonts.body,
  fontSize: "1.1rem",
  color: THEME.colors.muted,
  lineHeight: 1.8,
  marginBottom: "48px",
  maxWidth: "420px",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
  transitionDelay: "0.3s",
});

// CTA кнопки
export const getCtaRowStyle = (visible: boolean): CSSProperties => ({
  display: "flex",
  gap: "16px",
  flexWrap: "wrap" as const,
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(20px)",
  transition: "opacity 0.7s ease, transform 0.7s ease",
  transitionDelay: "0.45s",
});

// Статистика — знизу вгору з більшою затримкою
export const getStatsRowStyle = (visible: boolean): CSSProperties => ({
  display: "flex",
  gap: "40px",
  marginTop: "64px",
  paddingTop: "40px",
  borderTop: "1px solid rgba(201,168,76,0.25)",
  opacity: visible ? 1 : 0,
  transform: visible ? "translateY(0)" : "translateY(30px)",
  transition: "opacity 0.8s ease, transform 0.8s ease",
  transitionDelay: "0.6s",
});

export const contentStyle: CSSProperties = {
  position: "relative",
  maxWidth: "520px",
  zIndex: 2,
};

export const accentStyle: CSSProperties = {
  fontStyle: "italic",
  color: THEME.colors.gold,
};

export const statNumberStyle: CSSProperties = {
  fontFamily: THEME.fonts.display,
  fontSize: "2rem",
  color: THEME.colors.charcoal,
  margin: 0,
};

export const statLabelStyle: CSSProperties = {
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  textTransform: "uppercase",
  color: THEME.colors.muted,
  margin: 0,
};

export const dotsWrapStyle: CSSProperties = {
  position: "absolute",
  bottom: "32px",
  left: "50%",
  transform: "translateX(-50%)",
  display: "flex",
  gap: "8px",
  zIndex: 5,
};

export const getDotStyle = (active: boolean): CSSProperties => ({
  width: active ? "28px" : "8px",
  height: "8px",
  borderRadius: active ? "4px" : "50%",
  background: active ? THEME.colors.gold : "rgba(255,255,255,0.4)",
  border: `1px solid rgba(201,168,76,0.6)`,
  cursor: "pointer",
  transition: "all 0.3s ease",
  padding: 0,
});

export const arrowBtnStyle = (side: "left" | "right"): CSSProperties => ({
  position: "absolute",
  top: "50%",
  [side]: "16px",
  transform: "translateY(-50%)",
  zIndex: 5,
  background: "rgba(0,0,0,0.2)",
  border: `1px solid rgba(201,168,76,0.5)`,
  color: THEME.colors.cream,
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  cursor: "pointer",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  fontSize: "1.3rem",
  transition: "all 0.2s",
  backdropFilter: "blur(6px)",
});

export const imageCounterStyle: CSSProperties = {
  position: "absolute",
  top: "32px",
  right: "32px",
  zIndex: 5,
  fontFamily: THEME.fonts.sans,
  fontSize: "0.65rem",
  letterSpacing: "0.2em",
  color: THEME.colors.cream,
  background: "rgba(0,0,0,0.25)",
  padding: "6px 12px",
  borderRadius: "2px",
  backdropFilter: "blur(4px)",
};